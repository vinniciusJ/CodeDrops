import Photo from './Photo/index.js'

window.addEventListener('DOMContentLoaded', () => Photo.load())

// Selecionar imagem
document.querySelector('#select-img').addEventListener('click', () => Photo.photoFile.click())

// Cortar Imagem
Photo.cropButton.addEventListener('click', () => Photo.crop()) 

// Exportar imagem

Photo.downloadButton.addEventListener('click', () => Photo.download())