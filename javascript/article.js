// Shows an article or shows an error.
// Displays either the full article or an error message.

// Exporterar ARTICLE_ID_COUNTER så att main.js kan importera och använda den
export let ARTICLE_ID_COUNTER = 0;

export class Article {
    constructor(title, date, description, imageUrl, id = null) {
        // Om ett id skickats in används det, annars används ARTICLE_ID_COUNTER++ för att skapa ett nytt unikt ID. Kort if-sats
        this.id = id !== null ? id : ARTICLE_ID_COUNTER++;
        this.title = title;
        this.date = date;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + "...";
    }

    // Vi skapar en <article> för produkten och retunerar elementet 
    // Detta ska visas på huvudsidan och även på produktsidan
    createCardElement() {
        // Skapa alla element som ska visas inom <article> produkten
        let link = document.createElement("a");
        let card = document.createElement("div");
        let cardHeader = document.createElement("div");
        let cardContent = document.createElement("div");
        let image = document.createElement("img");
        let title = document.createElement("h3");
        let date = document.createElement("h6");
        let description = document.createElement("p");

        // När vi trycker på produkten ska vi skickas till en separat artikel-sida!
        // Vi skickar med information om vilken artikel det är genom id:t
        link.href = "/article.html?articleId=" + this.id;

        // Applicera på de element som behöver det
        card.classList.add("card");
        cardHeader.classList.add("card-header");
        cardContent.classList.add("card-content");
        date.classList.add("news-source");
        description.classList.add("news-description");

        // Sätt ID'n för att matcha min originella struktur
        title.id = "news-title";
        date.id = "news-source";
        description.id = "news-description";

        // Fixa med styling och innehåll på elementen 
        image.src = this.imageUrl;
        image.alt = "article_img";
        title.textContent = this.title;
        date.textContent = this.date;
        // Truncate text description to 80 characters for card view
        description.textContent = this.truncateText(this.description, 80);

        // PLacera elementen på rätt ställen inom <article>
        cardHeader.append(image);
        cardContent.append(title, date, description);
        card.append(cardHeader, cardContent);
        link.append(card);

        return link;
    }

    createViewElement() {
        const container = document.createElement("div");
        const articleHeader = document.createElement("div");
        const articleContent = document.createElement("div");

        container.classList.add("article-view-container");
        articleHeader.classList.add("article-header");
        articleContent.classList.add("article-content");

        const title = document.createElement("h1");
        const date = document.createElement("p");

        title.textContent = this.title;
        date.textContent = this.date;

        title.classList.add("article-title");
        date.classList.add("article-date");

        articleHeader.append(title, date);

        const imageContainer = document.createElement("div");
        const featureImage = document.createElement("img");

        imageContainer.classList.add("feature-image-container");
        featureImage.src = this.imageUrl;
        featureImage.alt = "Article image for " + this.title;
        featureImage.classList.add("feature-image");

        imageContainer.append(featureImage);

        // Create article body text
        const articleBody = document.createElement("div");
        const articleDescription = document.createElement("p");

        articleBody.classList.add("article-body");
        articleDescription.classList.add("article-description");
        articleDescription.textContent = this.description;

        articleBody.append(articleDescription);

        // Add image and body to the content section
        articleContent.append(imageContainer, articleBody);

        // Add "Back to news" button
        const backButtonContainer = document.createElement("div");
        const backButton = document.createElement("a");

        backButtonContainer.classList.add("back-button-container");
        backButton.href = "/index.html";
        backButton.classList.add("back-button");
        backButton.textContent = "Back to News";

        backButtonContainer.append(backButton);

        // Assemble all components
        container.append(articleHeader, articleContent, backButtonContainer);

        return container;
    }
}