const filter = document.getElementById("filter");
const containerFilter = document.querySelector(".filtreMenu");
const titleFiltre = document.querySelector(".title__menu");

filter.addEventListener("click", function(){
    filter.className = "fa-solid fa-chevron-up";
    containerFilter.style.backgroundColor = "#901C1C";
    containerFilter.style.height = "170px";
    titleFiltre.style.color = "#fff";

    const date = document.createElement( 'p' );
    date.textContent = "Date";

    const titre = document.createElement( 'p' );
    titre.textContent = "Titre";

    titleFiltre.appendChild(date);
    titleFiltre.appendChild(titre);
});