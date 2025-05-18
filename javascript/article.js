// Shows an article or shows an error.
// Displays either the full article or an error message.

export let ARTICLE_ID_COUNTER = 0;

export class Article {
    constructor(title, date, description, imageUrl, id = null) {
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

    createCardElement() {
        // Create all elements to be displayed within the article
        let link = document.createElement("a");
        let card = document.createElement("div");
        let cardHeader = document.createElement("div");
        let cardContent = document.createElement("div");
        let image = document.createElement("img");
        let title = document.createElement("h3");
        let date = document.createElement("h6");
        let description = document.createElement("p");

        link.href = "/article.html?articleId=" + this.id;

        card.classList.add("card");
        cardHeader.classList.add("card-header");
        cardContent.classList.add("card-content");
        date.classList.add("news-source");
        description.classList.add("news-description");

        // Set the ID to match my original structure
        title.id = "news-title";
        date.id = "news-source";
        description.id = "news-description";

        image.src = this.imageUrl;
        image.alt = "article_img";
        title.textContent = this.title;
        date.textContent = this.date;
        // Truncate text description to 80 characters for card view
        description.textContent = this.truncateText(this.description, 80);

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

        const articleBody = document.createElement("div");
        const articleDescription = document.createElement("p");

        articleBody.classList.add("article-body");
        articleDescription.classList.add("article-description");
        articleDescription.textContent = this.description;

        articleBody.append(articleDescription);

        // Add image and body to the content section
        articleContent.append(imageContainer, articleBody);

        // Create a container for both buttons
        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("buttons-container");

        // Add "Back to news" button
        const backButton = document.createElement("a");
        backButton.href = "/index.html";
        backButton.classList.add("back-button");
        backButton.textContent = "Back to News";

        // Create delete-button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.setAttribute("data-article-id", this.id);

        const trashIcon = document.createElement("i");
        trashIcon.className = "bx bx-trash-alt";
        deleteButton.appendChild(trashIcon);

        deleteButton.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            const confirmationDialog = document.getElementById('confirmation-dialog');
            confirmationDialog.dataset.articleId = this.id;
            confirmationDialog.classList.remove('hidden'); // Show dialog

            console.log("Delete button clicked for article ID:", this.id);
        }.bind(this));

        // Add the buttons to their container
        buttonsContainer.appendChild(backButton);
        buttonsContainer.appendChild(deleteButton);

        // Assemble all components
        container.append(articleHeader, articleContent, buttonsContainer);

        return container;
    }
}