import { Electronics } from './models/electronics';
import { Clothing } from './models/clothing';
import { findProduct, filterByPrice } from './services/product';
import { addToCart, calculateTotal } from './services/cart';

const electronics: Electronics[] = [
  {
    id: 1,
    name: "Телефон",
    price: 10000,
    category: 'electronics',
    description: "Смартфон з великим екраном",
    warrantyPeriod: 24
  }
];

const phone = findProduct(electronics, 1);
if (phone) {
  const cart = addToCart([], phone, 1);
  const total = calculateTotal(cart);
  console.log(`Total price: ${total}`);
}

const affordableElectronics = filterByPrice(electronics, 8000);
console.log('Affordable electronics:', affordableElectronics);
