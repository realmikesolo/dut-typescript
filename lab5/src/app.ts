import { Article } from './models/article';
import { Product } from './models/product';
import { ContentOperations } from './services/content-operations';

// Імітація бази даних
let articles: Article[] = [];
let products: Product[] = [];

// Імплементація операцій над статтями
const articleOperations: ContentOperations<Article> = {
  create: (article: Article): Article => {
    articles.push(article);
    return article;
  },
  read: (id: string): Article | undefined => {
    return articles.find(article => article.id === id);
  },
  update: (id: string, article: Article): Article => {
    const index = articles.findIndex(a => a.id === id);
    if (index > -1) {
      articles[index] = { ...articles[index], ...article };
    }
    return articles[index];
  },
  delete: (id: string): boolean => {
    const index = articles.findIndex(a => a.id === id);
    if (index > -1) {
      articles.splice(index, 1);
      return true;
    }
    return false;
  }
};

// Створення статті
const newArticle: Article = {
  id: '1',
  title: 'Нова стаття',
  content: 'Зміст нової статті',
  authorId: 'author1',
  createdAt: new Date(),
  updatedAt: new Date(),
  status: 'draft'
};

// Додавання статті в систему
articleOperations.create(newArticle);

// Читання статті
const readArticle = articleOperations.read('1');
console.log('Read Article:', readArticle);

// Оновлення статті
if (readArticle) {
  readArticle.title = 'Оновлена стаття';
  articleOperations.update(readArticle.id, readArticle);
  console.log('Updated Article:', articleOperations.read('1'));
}

// Видалення статті
console.log('Delete Article:', articleOperations.delete('1'));

// Виведення стану "бази даних" статей
console.log('Articles:', articles);
