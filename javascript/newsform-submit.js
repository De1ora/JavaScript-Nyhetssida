import { addArticle } from './storage.js';
import { showToast } from './toast.js';

function getNextArticleId() {
    const id = localStorage.getItem("article-id-counter");
    const nextId = id ? parseInt(id, 10) + 1 : 6;
    localStorage.setItem("article-id-counter", nextId);
    return nextId;
}

document.addEventListener('DOMContentLoaded', function () {
    const newsForm = document.getElementById('newsForm');

    let imageData = '';

    const imageInput = document.getElementById('image');
    if (imageInput) {
        imageInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                // Check file size - max 500KB (to avoid localStorage limitations)
                if (file.size > 500000) {
                    alert("The image is too large. Please select an image smaller than 500KB.");
                    imageInput.value = '';
                    return;
                }

                if (!file.type.startsWith('image/')) {
                    alert("The file has to be an image.");
                    imageInput.value = '';
                    return;
                }

                // Read the file as DataURL (Base64)
                const reader = new FileReader();
                reader.onload = function (event) {
                    imageData = event.target.result;
                    console.log("Image has been loaded.");
                };
                reader.readAsDataURL(file);
            }
        });
    }

    newsForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get reference to all required input fields:
        const titleInput = document.getElementById('title-input');
        const dateInput = document.getElementById('dateInput');
        const contentInput = document.getElementById('content-input');

        if (!titleInput || !dateInput || !contentInput || !imageInput) {
            alert("One or multiple sections are missing!");
            return;
        }

        const rawDate = new Date(dateInput.value);
        const formattedDate = rawDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Create an article object from the form data. By collecting our fields (title, date, content, image) into one object, we create a logical entity (an article!)
        const newArticle = {
            id: getNextArticleId(),
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
                message: "An error occurred while saving the article.",
                iconClass: "bx-error-circle",
                duration: 3000
            });
        }
    });
});