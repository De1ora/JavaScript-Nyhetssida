import { newsArticles } from "../main.js";

// Nya (egna) sidan för en artikel
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

        const article = newsArticles.find((all) => all.id === articleId);

        if (!article) {
            throw new Error(`No article found with ID: ${articleId}`);
        }

        articleViewContainer.innerHTML = "";
        articleViewContainer.append(article.createViewElement());

    } catch (error) {
        displayError(error.message);
        console.error("An error occurred:", error);
    }
}

setupArticlePage();