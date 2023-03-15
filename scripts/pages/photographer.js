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
function findMedias (media, id) {
    const medias = media.filter(element => element.photographerId == id);
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
            addImageLightbox();
        })
        div.appendChild(img);
       }

       if(typeDeMediaVideo){
        const video = document.createElement( 'video' );
        video.setAttribute("src", videoPath);
        video.setAttribute("alt", title);
        video.classList.add('video');
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