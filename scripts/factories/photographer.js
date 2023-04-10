function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.classList.add('portrait');

        const lien = document.createElement( 'a' );
        lien.setAttribute("href", `photographer.html?id=${id}`);
        lien.setAttribute("tabindex", "0");
        lien.setAttribute("aria-label", "photo de" + name + "appuyez sur entrée pour afficher la page du photographe")

        const div = document.createElement('div');
        div.classList.add('contentImg');

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        img.setAttribute("id", id);
        img.classList.add("img-photographer");

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.setAttribute("tabindex", "0");

        const pLocalisation = document.createElement( 'p' );
        pLocalisation.textContent = city + ", " + country;
        pLocalisation.classList.add('location');
        pLocalisation.setAttribute("tabindex", "0");

        const pTagline = document.createElement( 'p' );
        pTagline.textContent = tagline;
        pTagline.classList.add('tagline');
        pTagline.setAttribute("tabindex", "0");

        const pPrice = document.createElement( 'p' );
        pPrice.textContent = price + "€/jour";
        pPrice.classList.add('price');
        pPrice.setAttribute("tabindex", "0");

        article.appendChild(lien);
        lien.appendChild(div);
        div.appendChild(img);
        article.appendChild(h2);
        article.appendChild(pLocalisation);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
        return (article);
    }
    
    return { name, picture, img:name, img:id, pLocalisation:city, pTagline:tagline, pPrice:price, getUserCardDOM}
}