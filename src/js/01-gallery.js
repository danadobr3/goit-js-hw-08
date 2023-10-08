// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

console.log(galleryItems);
const elementsList = document.querySelector('.gallery');

elementsList.insertAdjacentHTML("beforeend", createMarkup(galleryItems));

elementsList.addEventListener('click', handlerClick);


function createMarkup(arr) {
     
    return arr.map(({preview, original, description}) => `
    <li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`).join('')
}

function handlerClick(evt) { 
    evt.preventDefault();
    if (evt.target.nodeName !== "IMG") {
        return;
    }
    const instance = new SimpleLightbox(`
    <img src="${evt.target.dataset.source}" width="800" height="600">`);
    instance.show();
    elementsList.addEventListener('keydown', (evt) => {
        if (evt.code === "Escape") {
            instance.close();
        }
    });
   
 }