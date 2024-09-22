"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Функция для открытия модального окна
function openModal(content) {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    const modal = document.createElement('div');
    modal.className = 'modal';
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.textContent = '✕'; // Используем символ "закрыть"
    closeButton.onclick = () => backdrop.remove(); // Удаление всего фона с модальным окном
    modal.append(closeButton);
    modal.append(document.createTextNode(content));
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);
}
// Функция для загрузки данных и их отображения
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = yield response.json();
        const content = posts.slice(0, 5).map(post => post.title).join("\n");
        openModal(content);
    });
}
// Добавление обработчиков событий
document.addEventListener('DOMContentLoaded', () => {
    const loadDataBtn = document.getElementById('loadDataBtn');
    loadDataBtn === null || loadDataBtn === void 0 ? void 0 : loadDataBtn.addEventListener('click', () => fetchData());
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            document.body.style.backgroundColor = '#f0f0f0'; // Пример анимации: изменение фона при скролле
        }
        else {
            document.body.style.backgroundColor = 'white';
        }
    });
});
//# sourceMappingURL=script.js.map