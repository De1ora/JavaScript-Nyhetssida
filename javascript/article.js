// Innehåller Article klassens definition

let ARTICLE_ID_COUNTER = 0;

// En klass-modell för alla produkter som visas på sidan
// Den hjälper oss att förstå sturkturen på produkt-objekten
// Vi bakar även in några användbara funktioner, som 'createCardElement'
export class Article {
    constructor(title, date, description, imageUrl) {
        this.id = ARTICLE_ID_COUNTER++;
        this.title = title;
        this.date = date;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    // Vi skapar en <article> för produkten och retunerar elementet 
    // Detta ska visas på huvudsidan och även på produktsidan
    createCardElement() {
        // Skapa alla element som ska visas inom <article> produkten
        let card = document.createElement("div");
        let cardHeader = document.createElement("div");
        let cardContent = document.createElement("div");
        let image = document.createElement("img");
        let title = document.createElement("h3");
        let date = document.createElement("h6");
        let description = document.createElement("p");

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
        description.textContent = this.description;

        // PLacera elementen på rätt ställen inom <article>
        cardHeader.append(image);
        cardContent.append(title, date, description);
        card.append(cardHeader, cardContent);

        // Retunera huvud-elementet (<article>)
        return card;
    }
}