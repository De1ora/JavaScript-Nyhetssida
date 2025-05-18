// Innehåller sido-specifik kod

import { allNewsArticles } from "../main.js";
import { showToast } from "../toast.js";

// Hämta ut div-listan som finns i index.html
const cardsContainerElement = document.getElementById("cardscontainer");

// Denna funktion kör när index.html laddas in för att dynamiskt rendera produkter
function setupIndexPage() {
    // Fyll listorna med produkter
    fillArticlesList(cardsContainerElement, allNewsArticles);

    // Kollar om vi ska visa toast efter artikel-borttagning
    if (sessionStorage.getItem("showDeleteToast") === "true") {
        showToast({
            title: "Success",
            message: "Your good-news article has been deleted!",
            iconClass: "bx-check-circle",
            duration: 3000
        });
        sessionStorage.removeItem("showDeleteToast");
    }
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