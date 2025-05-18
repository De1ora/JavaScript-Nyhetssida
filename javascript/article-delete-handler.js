document.addEventListener('DOMContentLoaded', function () {
    const confirmationDialog = document.getElementById('confirmation-dialog');
    const confirmYesButton = document.getElementById('confirm-yes');
    const confirmNoButton = document.getElementById('confirm-no');

    // Klick på "No" => Stäng dialogrutan
    confirmNoButton.addEventListener('click', function () {
        confirmationDialog.classList.add('hidden');
    });

    // Klick på "Yes" => Ta bort artikel från localStorage och navigera bort
    confirmYesButton.addEventListener('click', function () {
        const articleId = confirmationDialog.dataset.articleId;
        if (!articleId) return;

        // 1. Hämta alla artiklar från storage
        const articles = JSON.parse(localStorage.getItem('new-articles')) || [];

        // 2. Filtrera bort artikeln med rätt ID
        const updatedArticles = articles.filter(article => article.id != articleId);

        // 3. Spara tillbaka till localStorage
        localStorage.setItem('new-articles', JSON.stringify(updatedArticles));

        // 4. Navigera tillbaka till nyhetssidan
        window.location.href = "/index.html";
    });
});
