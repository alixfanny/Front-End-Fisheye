//Récupere les données dans le fichiers Json.
async function getPhotographers() {
    let response = await fetch('./data/photographers.json')
    let photographers = await response.json();

    return photographers;
}

// Crée les liens dans le html pour la partie presentation d'une page d'un photographe.
function displayDataPhotographer(photographer) {
    
    const photographerModel = photographerFactory(photographer);
    const photographersTexte = document.getElementById("photograph-text");
    const UserCardDOMTexte = photographerModel.getUserCardDOMTexte();
    const photographersImage = document.getElementById("photograph-image");
    const UserCardDOMImage = photographerModel.getUserCardDOMImage();
    const pricePopUp = document.querySelector(".price-bas-de-page");
    pricePopUp.textContent = `${photographer.price}€/jour`;

    photographersImage.appendChild(UserCardDOMImage);
    photographersTexte.appendChild(UserCardDOMTexte);

}

// Permet de trouver les id de chaque photographe.
function findPhotographer (photographers, id){

    const photographer = photographers.find(element => element.id == id);
    return photographer;
}

// Récupère les datas des photographes.
async function init(photographerId) {

    const { photographers } = await getPhotographers();
    const photographer = findPhotographer(photographers, photographerId);

    displayDataPhotographer(photographer);
    
}

// Récupère l'ID du photographe à partir de l'URL
const photographerId = new URLSearchParams(window.location.search).get('id');

init(photographerId);
initMedias(photographerId);

// Crée les elements de la page html avec leurs contenue pour la partie presentation de chaque photographe.
function photographerFactory(data) {
    const {portrait, name, id, city, country, tagline} = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOMTexte() {

        const namePhotographeForm = document.getElementById("name-photographe");
        namePhotographeForm.textContent= name;

        const div1 = document.createElement('div');
        div1.classList.add('contentText');

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.classList.add('name-photographer');

        const pLocalisation = document.createElement( 'p' );
        pLocalisation.textContent = city + ", " + country;
        pLocalisation.classList.add('location');
        pLocalisation.classList.add('locationBis');

        const pTagline = document.createElement( 'p' );
        pTagline.textContent = tagline;
        pTagline.classList.add('tagline');
        pTagline.classList.add('taglineBis');

        div1.appendChild(h2);
        div1.appendChild(pLocalisation);
        div1.appendChild(pTagline);
        return (div1);
    }

    function getUserCardDOMImage() {

        const div2 = document.createElement('div');
        div2.classList.add('contentImg');

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        img.setAttribute("id", id);
        img.classList.add("img-photographer");

        div2.appendChild(img);
        return (div2);

    }

    return { name, picture, img:name, img:id, pLocalisation:city, pTagline:tagline, getUserCardDOMTexte, getUserCardDOMImage }
}

// Crée les liens dans le html pour afficher les photos de chaque photographe.
function displayDataMedia(media) {
    
    const mediaModel = mediaFactory(media);
    const photographersMedia = document.querySelector(".media-section");
    const UserCardDOMMedia = mediaModel.getUserCardDOMMedia();
    
    photographersMedia.appendChild(UserCardDOMMedia);
}

//Permet de trouver les id de chaque photographe
function findMedias (media, id, sortBy = "likes") {
    let medias = media.filter(element => element.photographerId == id);

    medias = medias.sort((a, b) => (a[sortBy] > b[sortBy] ? -1 : 1));
    return medias;
}

//Récupére les medias des photographes
async function initMedias(photographerId) {
    const { media } = await getPhotographers();
    const medias = findMedias(media, photographerId)

    let totalLikes = 0;
    for (let i=0; i < medias.length; i++){
        totalLikes += medias[i].likes;

        const afficheTotalLike = document.querySelector(".likes-total");
        afficheTotalLike.textContent = totalLikes;
    }

    for (let i=0; i < medias.length; i++){
        displayDataMedia(medias[i]);

    }
}

let currentImageIndex = null;

// Affiche la lightbox.
function showLightbox(){

    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "block";
}

// affiche les photos dans lightbox.
async function addMediaLightbox() {

    const { media } = await getPhotographers();
    const medias = findMedias(media, photographerId);
    const data = medias[currentImageIndex];
    const typeDeMediaImage = data.image;
    const typeDeMediaVideo = data.video;
    
    if (typeDeMediaImage ){
        const picturePath = `assets/images/${data.image}`;
        const img = document.createElement( 'img' );
        const container = document.querySelector(".lightbox__container-image");
        img.setAttribute("src", picturePath);
        img.setAttribute("alt", dataImage.title);
        img.classList.add('image-lightbox');
        container.innerHTML =" ";
        container.appendChild(img);
    }

    if(typeDeMediaVideo){
        const picturePath = `assets/videos/${data.video}`;
        const video = document.createElement( 'video' );
        const container = document.querySelector(".lightbox__container-image");
        video.setAttribute("src", picturePath);
        video.setAttribute("alt", data.title);
        video.classList.add('image-lightbox');
        container.innerHTML =" ";
        container.appendChild(video);
    }
}

// Crée les elements de la page html avec leurs contenue pour leurs miniature de photo.
function mediaFactory(data) {
    const { image, title, id, likes, date, video } = data;
    const picturePath = `assets/images/${image}`;
    const videoPath = `assets/videos/${video}`;
    const typeDeMediaImage = data.image;
    const typeDeMediaVideo = data.video;
    const icons =`assets/icons/heart-solid.svg`;
    

    function getUserCardDOMMedia() {

        const div = document.createElement( 'div' );
        div.classList.add( 'media' );

       if (typeDeMediaImage){
        const img = document.createElement( 'img' );
        img.setAttribute("src", picturePath);
        img.setAttribute("alt", title);
        img.classList.add('image');
        img.addEventListener("click", async function(){
            const { media } = await getPhotographers();
            const medias = findMedias(media, photographerId);
            currentImageIndex = medias.findIndex(media => media.id === id);
            showLightbox();
            addMediaLightbox();
        })
        div.appendChild(img);
       }

       if(typeDeMediaVideo){
        const video = document.createElement( 'video' );
        video.setAttribute("src", videoPath);
        video.setAttribute("alt", title);
        video.classList.add('video');
        video.addEventListener("click", async function(){
            const { media } = await getPhotographers();
            const medias = findMedias(media, photographerId);
            currentImageIndex = medias.findIndex(media => media.id === id);
            showLightbox();
            addMediaLightbox();
        })
        video.controls = true;
        div.appendChild(video);
       }

       const divInfo = document.createElement ('div');
       divInfo.classList.add('divInfo');


       const titre = document.createElement('p');
       titre.classList.add("titre-image");
       titre.setAttribute("title", title);
       titre.textContent = title;

       const divLike = document.createElement ('div');
       divLike.classList.add('divlike');

       const nbLike = document.createElement('p');
       nbLike.classList.add('nombres-de-likes');
       nbLike.setAttribute("nbLike", likes);
       nbLike.textContent = likes;

       divLike.addEventListener("click", function(){
          let newLike = likes
           newLike++;
           nbLike.textContent = newLike;
       })

       const icone = document.createElement( 'i' );
       icone.className = "fa-solid fa-heart"

       div.appendChild(divInfo);
       divInfo.appendChild(titre);
       divInfo.appendChild(divLike);
       divLike.appendChild(nbLike);
       divLike.appendChild(icone);

       return (div);
   }

   return { img:title, video:title, div:id, div:photographerId, div:date, div:likes, titre:title, nbLike:likes, getUserCardDOMMedia }
}

// Ferme le lightbox
function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
}

// Permet d'afficher l'image suivante dans la lightbox
async function next() {
    currentImageIndex++;
    const { media } = await getPhotographers();
    const medias = findMedias(media, photographerId);

    if(currentImageIndex == medias.length){
        currentImageIndex = 0;
    }
    addImageLightbox();
}

// Permet d'afficher l'image precedante dans la lightbox
async function prev() {
    currentImageIndex--;

    if(currentImageIndex < 0){
        const { media } = await getPhotographers();
        const medias = findMedias(media, photographerId);
        currentImageIndex = medias.length-1;
    }

    addImageLightbox();
}

const filter = document.getElementById("filter");
const containerFilter = document.querySelector(".filtre__menu");
const titleFiltre = document.querySelector(".other-title");
const containerTitle = document.querySelector(".container-title");
const titleMenu = document.querySelector(".title__menu");


filter.addEventListener("click", function(){
    filter.className = "fa-solid fa-chevron-up";
    containerFilter.style.backgroundColor = "#901C1C";
    containerFilter.style.height = "170px";
    containerFilter.style.color = "#fff";
    titleFiltre.style.cursor = "pointer";
    filter.style.color = "#fff";
    titleMenu.style.color = "#fff";

    if(document.querySelector(".date")){
        titleFiltre.remove();
        containerFilter.style.backgroundColor = "#fff";
        titleMenu.style.color = "#000";
        filter.style.color = "#000";
        filter.className = "fa-solid fa-chevron-down";
        containerFilter.style.height = " 0px";
    }
    else {
        const date = document.createElement( 'p' );
        date.textContent = "Date";
        date.className = "date";
        date.addEventListener("click", async function(){

            const { media } = await getPhotographers();
            let medias = findMedias(media, photographerId, "date");

            const container = document.querySelector(".media-section");
            container.innerHTML = " ";
            
            for (let i=0; i < medias.length; i++){
                displayDataMedia(medias[i]);

            }
        });
        titleFiltre.appendChild(date);
    }

    if(document.querySelector(".titre")){
        titleFiltre.remove();
        containerFilter.style.backgroundColor = "#fff";
        titleMenu.style.color = "#000";
        filter.style.color = "#000";
        filter.className = "fa-solid fa-chevron-down";
        containerFilter.style.height = " 0px";

    }
    else{
        const titre = document.createElement( 'p' );
        titre.textContent = "Titre";
        titre.className = "titre";
        titre.addEventListener("click", async function(){

            const { media } = await getPhotographers();
            let medias = findMedias(media, photographerId,"title");
        
            const container = document.querySelector(".media-section");
            container.innerHTML = " ";
            
            for (let i=0; i < medias.length; i++){
                displayDataMedia(medias[i]);
        
            }
        });
        titleFiltre.appendChild(titre);
    }
})