document.getElementById('newsForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Förhindra att sidan laddas om

    const title = document.getElementById('title-input').value;
    const date = document.getElementById('dateInput').value;
    const content = document.getElementById('content-input').value;
    const imageInput = document.getElementById('image');
    let imageData = '';

    // Hämta bild som base64 (om någon valts)
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageData = e.target.result;

            // Skapa artikelobjektet
            const article = {
                title,
                date,
                content,
                image: imageData
            };

            // Hämta tidigare artiklar, eller skapa en tom array
            const existing = JSON.parse(localStorage.getItem('articles')) || [];

            // Lägg till nya artikeln
            existing.push(article);

            // Spara till localStorage
            localStorage.setItem('articles', JSON.stringify(existing));

            alert('Artikel sparad i localStorage!');
            e.target.reset(); // Rensa formuläret
            document.getElementById('charCount').textContent = '0';
            document.querySelector('.file-name').textContent = 'No file chosen';
            document.getElementById('imagePreview').innerHTML = '';
        };
        reader.readAsDataURL(imageInput.files[0]); // Läser bilden som Base64
    } else {
        // Om ingen bild är vald, spara ändå
        const article = {
            title,
            date,
            content,
            image: null
        };

        const existing = JSON.parse(localStorage.getItem('articles')) || [];
        existing.push(article);
        localStorage.setItem('articles', JSON.stringify(existing));

        alert('Artikel sparad i localStorage!');
        e.target.reset();
        document.getElementById('charCount').textContent = '0';
        document.querySelector('.file-name').textContent = 'No file chosen';
        document.getElementById('imagePreview').innerHTML = '';
    }
});