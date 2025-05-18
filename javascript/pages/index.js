// Contains page-specific code

import { allNewsArticles } from "../main.js";
import { showToast } from "../toast.js";

// Retrieves the div-list found in index.html
const cardsContainerElement = document.getElementById("cardscontainer");

function setupIndexPage() {
    fillArticlesList(cardsContainerElement, allNewsArticles);

    // Checks if toast should be displayed
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

function fillArticlesList(element, articles) {
    element.textContent = "";

    for (const article of articles) {
        element.append(article.createCardElement());
    }
}

setupIndexPage();