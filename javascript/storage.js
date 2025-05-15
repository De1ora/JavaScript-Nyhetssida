// Ha ett eget script för sparning till egna listor!! Tips från Franklin
// Lättare att ha ett script som hämtar in och parsar, du jobbar aldrig med localStorage direkt i din kod
// Ett annat script som sparar till localStorage

// När jag sparar en artikel läggs den i en lista som går till localStorage
// Ska de tas bort måste du spara localStorage igen, men varje gång du gör en ändring som ska paras i localStorage måste du hämta, JSON parsa, hämta och skicka tillbaka med stingify 
// Istället för att göra det i koden har jag ett script som omvandlar hela listan med objekt. 
// Franklin

// Lättare att inte använda localStorage i kod. 
// Fick mycket fel pga av det, när han gjorde det löste sig uppgiften på egen hand. 

// HANTERAR LAGRINGEN

// getArticles()
// saveArticles()
// addArticle()
// removeArticle()


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
      articles.push(article);
      return saveArticles(articles);
    } catch (error) {
      console.error('Fel vid tillägg av ny artikel:', error);
      return false;
    }
  }

  // TAR BORT en artikel med ett specifikt index
  function removeArticle(index) {
    try {
      const articles = getArticles();
      if (index >= 0 && index < articles.length) {
        articles.splice(index, 1);
        return saveArticles(articles);
      }
      return false;
    } catch (error) {
      console.error('Fel vid borttagning av artikel:', error);
      return false;
    }
  }