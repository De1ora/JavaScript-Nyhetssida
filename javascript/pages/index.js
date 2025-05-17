// Innehåller sido-specifik kod

import { allNewsArticles } from "../main.js";

// Hämta ut div-listan som finns i index.html
const cardsContainerElement = document.getElementById("cardscontainer");

// Denna funktion kör när index.html laddas in för att dynamiskt rendera produkter
function setupIndexPage() {
    // Fyll listorna med produkter
    fillArticlesList(cardsContainerElement, allNewsArticles);
}

// Ritar ut produkter (products) inom ett visst element genom att loopa listan av produkter och skapa kort-element.
function fillArticlesList(element, articles) {
    element.textContent = "";

    for (const article of articles) {
        element.append(article.createCardElement());
    }
}

// Kör funktionen så fort index.html laddas in.
setupIndexPage();