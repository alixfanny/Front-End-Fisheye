const filter = document.getElementById("filter");
const containerFilter = document.querySelector(".filtre__menu");
const titleFiltre = document.querySelector(".title__menu");


filter.addEventListener("click", function(){
    filter.className = "fa-solid fa-chevron-up";
    containerFilter.style.backgroundColor = "#901C1C";
    containerFilter.style.height = "170px";
    titleFiltre.style.color = "#fff";
    titleFiltre.style.cursor = "pointer";
    filter.style.color = "#fff";

    const date = document.createElement( 'p' );
    date.textContent = "Date";
    date.className = "date";

    const titre = document.createElement( 'p' );
    titre.textContent = "Titre";
    titre.className = "titre";

    titleFiltre.appendChild(date);
    titleFiltre.appendChild(titre);
    }
)