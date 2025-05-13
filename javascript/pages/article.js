import { newsArticles } from "../main.js";

// Nya (egna) sidan för en artikel
const urlParams = new URLSearchParams(window.location.search);
const articleId = Number.parseInt(urlParams.get("articleId")); // vill ha felhantering och validering här ... vad händer om ngt inte är ett nummer? implementera en enkel if-sats här

const articleViewContainer = document.getElementById("article-view");

const article = newsArticles.find((all) => all.id === articleId); // vad händer om den är null eller undefined?

function setupArticlePage() {
    articleViewContainer.append(article.createViewElement());
}

setupArticlePage();