export default function(Photo){
    Photo.photoPreview = document.querySelector('#photo-preview')

    Photo.preview = () => {
        Photo.photoPreview.src = Photo.canvas.toDataURL()
        Photo.photoPreview.style.display = 'initial'
    }
}