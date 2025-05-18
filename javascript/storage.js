// Naming the localStorage key to avoid conflicts
const STORAGE_KEY = 'new-articles';

function getArticles() {
    try {
        const articlesJson = localStorage.getItem(STORAGE_KEY);
        return articlesJson ? JSON.parse(articlesJson) : [];
    } catch (error) {
        console.error('Error retrieving items from localStorage:', error);
        return [];
    }
}

function saveArticles(articles) {
    try {
        const articlesJson = JSON.stringify(articles);
        localStorage.setItem(STORAGE_KEY, articlesJson);
        return true;
    } catch (error) {
        console.error('Error saving articles to localStorage:', error);
        return false;
    }
}

function addArticle(article) {
    try {
        const articles = getArticles();

        if (article.content && !article.description) {
            article.description = article.content;
        }

        articles.push(article);
        return saveArticles(articles);
    } catch (error) {
        console.error('Error adding new article:', error);
        return false;
    }
}

function removeArticle(id) {
    try {
        const articles = getArticles();
        const updatedArticles = articles.filter(article => article.id !== id);
        return saveArticles(updatedArticles);
    } catch (error) {
        console.error('Error deleting article:', error);
        return false;
    }
}

export { getArticles, saveArticles, addArticle, removeArticle };