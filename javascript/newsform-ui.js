function initializeNewsForm() {

    // Set current date automatically
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    document.getElementById('articleDate').textContent = formattedDate;
    document.getElementById('dateInput').value = now.toISOString();

    // Character counter 
    const contentTextarea = document.getElementById('content-input');
    const charCount = document.getElementById('charCount');

    if (contentTextarea && charCount) {
        contentTextarea.addEventListener('input', function () {
            const count = this.value.length;
            charCount.textContent = count;
        });
    }

    // Image preview!
    const imageInput = document.getElementById('image');
    const imagePreview = document.getElementById('imagePreview');

    if (imageInput && imagePreview) {
        imageInput.addEventListener('change', function () {
            imagePreview.innerHTML = '';
            if (this.files && this.files[0]) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.maxWidth = '200px';
                    img.style.maxHeight = '200px';
                    img.style.marginTop = '10px';
                    imagePreview.appendChild(img);
                }

                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    // Custom file input (since I am overwriting the default)
    const fileInput = document.getElementById('image');
    const fileNameDisplay = document.querySelector('.file-name');

    if (fileInput && fileNameDisplay) {
        fileInput.addEventListener('change', function () {
            if (this.files && this.files[0]) {
                fileNameDisplay.textContent = this.files[0].name;
            } else {
                fileNameDisplay.textContent = 'No file chosen';
            }
        });
    }
}

// Event listener to initialize the form when the page loads
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('newsForm')) {
        initializeNewsForm();
    }
});