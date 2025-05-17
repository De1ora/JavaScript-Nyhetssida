import { addArticle } from './storage.js';
import { showToast } from './toast.js';

// Väntar tills HTML-dokumentet är helt laddat innan JS körs
document.addEventListener('DOMContentLoaded', function () {
    // Hämta referens till formuläret med id="newsForm"
    const newsForm = document.getElementById('newsForm');

    // Kontrollera att formuläret finns på sidan
    if (!newsForm) {
        console.error("Could not find a form with the ID 'newsForm'");
        return; // Avslutar funktionen om formuläret inte finns
    }

    // Variabel för att lagra bilddata (varför placerad här?)
    let imageData = '';

    // Lägg till händelselyssnare för bilduppladdning
    const imageInput = document.getElementById('image');
    if (imageInput) {
        imageInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                // Kontrollera filstorleken - max 500KB (för att undvika localStorage-begränsningar)
                if (file.size > 500000) {
                    alert("Bilden är för stor! Vänligen välj en bild mindre än 500KB.");
                    imageInput.value = ''; // Återställ filväljaren
                    return;
                }

                // Kontrollera att det är en bildfil
                if (!file.type.startsWith('image/')) {
                    alert("Filen måste vara en bild!");
                    imageInput.value = '';
                    return;
                }

                // Läs filen som DataURL (Base64)
                const reader = new FileReader();
                reader.onload = function (event) {
                    imageData = event.target.result; // Spara base64-strängen
                    // Du kan också visa en förhandsgranskning om du vill
                    console.log("Bild har laddats");
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Lägg till händelselyssnare för när formuläret skickas (användaren trycker på submit) (vad är händelselyssnare? eventlistener? vad står (e) för?)
    // EventListener är en funktion som väntar på att en specifik händelse ska inträffa, t.ex. ett knapptryck, och utför en åtgärd när händelsen inträffar.
    newsForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Förhindra att sidan laddas om
        // När ett formulär skickas vill webbläsaren normalt skicka datan till en server och ladda om sidan. e.preventDefault() stoppar detta beteende, så att formulärdatan kan hanteras med JavaScript istället!

        // Hämta referens till alla nödvändiga input-fält:
        const titleInput = document.getElementById('title-input');
        const dateInput = document.getElementById('dateInput'); // Lite olika sätt
        const contentInput = document.getElementById('content-input');

        if (!titleInput || !dateInput || !contentInput || !imageInput) {
            alert("One or multiple ... is missing!");
            return;
        }

        const rawDate = new Date(dateInput.value);
        const formattedDate = rawDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Skapa ett artikelobjekt från formulärdata. Genom att samla våra fält (titel, datum, content, bild) i ett objekt skapar vi en logisk enhet (en artikel!)
        const newArticle = {
            title: titleInput.value,
            date: formattedDate,
            description: contentInput.value,
            imageUrl: imageData
        };

        if (addArticle(newArticle)) {
            newsForm.reset();
            imageData = '';

            showToast({
                title: "Success",
                message: "Your good-news article has been posted!",
                iconClass: "bx-check-circle",
                duration: 3000
            });

        } else {
            showToast({
                title: "Error",
                message: "Det uppstod ett fel när artikeln skulle sparas.",
                iconClass: "bx-error-circle",
                duration: 3000
            });
        }
    });
});