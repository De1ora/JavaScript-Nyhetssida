// Namnger localStorage nyckeln för att undvika konflikter
const STORAGE_KEY = 'new-articles';

// HÄMTAR alla artiklar från localStorage, eller tom array om ingen data finns!
function getArticles() {
    try {
      const articlesJson = localStorage.getItem(STORAGE_KEY);
      return articlesJson ? JSON.parse(articlesJson) : [];
    } catch (error) {
      console.error('Fel vid hämtning av artiklar från localStorage:', error);
      return [];
    }
  }

  // SPARAR en array med alla artiklar till localStorage
  function saveArticles(articles) {
    try {
      const articlesJson = JSON.stringify(articles);
      localStorage.setItem(STORAGE_KEY, articlesJson);
      return true;
    } catch (error) {
      console.error('Fel vid sparande av artiklar till localStorage:', error);
      return false;
    }
  }

  // LÄGGER TILL en ny artikel till localStorage
  function addArticle(article) {
    try {
      const articles = getArticles();

      if (article.content && !article.description) {
        article.description = article.content;
      }

      articles.push(article);
      return saveArticles(articles);
    } catch (error) {
      console.error('Fel vid tillägg av ny artikel:', error);
      return false;
    }
  }

  function removeArticle(id) {
    try {
        const articles = getArticles();
        const updatedArticles = articles.filter(article => article.id !== id);
        return saveArticles(updatedArticles);
    } catch (error) {
        console.error('Fel vid borttagning av artikel:', error);
        return false;
    }
}

  export { getArticles, saveArticles, addArticle, removeArticle };