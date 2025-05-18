// Defines what an article looks like.
// Creates the article view with title, date, image & text.

import { allNewsArticles } from "../main.js";

const urlParams = new URLSearchParams(window.location.search);
const articleIdParam = urlParams.get("articleId");
const articleViewContainer = document.getElementById("article-view");

function displayError(message) {
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = message;

    if (articleViewContainer) {
        articleViewContainer.innerHTML = "";
        articleViewContainer.appendChild(errorElement);
        articleViewContainer.appendChild(createBackButton());
    } else {
        console.error("Could not find the article-view container");
        console.error(message);
    }
}

function setupArticlePage() {
    try {
        if (!articleIdParam) {
            throw new Error("Article ID is missing from the URL parameters.");
        }
        const articleId = Number.parseInt(articleIdParam);

        if (isNaN(articleId)) {
            throw new Error(`Invalid article ID. "${articleIdParam}" is not a number.`);
        }

        const article = allNewsArticles.find((all) => all.id === articleId);

        if (!article) {
            throw new Error(`No article could be found with the ID ${articleId}`);
        }

        articleViewContainer.innerHTML = "";
        articleViewContainer.append(article.createViewElement());

    } catch (error) {
        displayError(error.message);
        console.error("An error occurred:", error);
    }
}

setupArticlePage();