document.addEventListener('DOMContentLoaded', function () {
    const confirmationDialog = document.getElementById('confirmation-dialog');
    const confirmYesButton = document.getElementById('confirm-yes');
    const confirmNoButton = document.getElementById('confirm-no');

    // If No => close dialog
    confirmNoButton.addEventListener('click', function () {
        confirmationDialog.classList.add('hidden');
    });

    // If Yes => Remove article from localStorage and navigate to index.html
    confirmYesButton.addEventListener('click', function () {
        const articleId = confirmationDialog.dataset.articleId;
        if (!articleId) return;

        // 1. Get all articles from storage
        const articles = JSON.parse(localStorage.getItem('new-articles')) || [];

        // 2. Filter out the article with the correct ID
        const updatedArticles = articles.filter(article => article.id != articleId);

        // 3. Save back to localStorage
        localStorage.setItem('new-articles', JSON.stringify(updatedArticles));

        // sessionStorage toast
        sessionStorage.setItem("showDeleteToast", "true");

        window.location.href = "/index.html";
    });
});
