export default function(Photo){
    Photo.cropButton = document.querySelector('#crop-image')

    Photo.crop = () => {
        const { width: imageWidth, height: imageHeight } = Photo.image
        const { width: previewWidth, height: previewHeight } = Photo.photoPreview
    
        const [ widthFactor, heightFactor ] = [
            +(imageWidth / previewWidth),
            +(imageHeight / previewHeight)
        ]
    
        const [ selectionWidth, selectionHeight ] = [
            +Photo.selector.style.width.replace('px', ''),
            +Photo.selector.style.height.replace('px', '')
        ]
    
        const [ croppedWidth, croppedHeight ] = [
            +(selectionWidth * widthFactor),
            +(selectionHeight * heightFactor)
        ]
    
        const [ actualX, actualY ] = [
            +(Photo.startPosition.relativeX * widthFactor),
            +(Photo.startPosition.relativeY * heightFactor)
        ]
    
        // pegar do contexto a imagem cortada
    
        const croppedImage = Photo.context.getImageData(actualX, actualY, croppedWidth, croppedHeight)
    
        Photo.context.clearRect(0, 0, Photo.context.width, Photo.context.height)
    
        // ajuste de proporcoes
    
        Photo.image.width = Photo.canvas.width = croppedWidth
        Photo.image.height = Photo.canvas.height = croppedHeight
    
        Photo.context.putImageData(croppedImage, 0, 0)
    
        Photo.selector.style.display = 'none'
    
        Photo.photoPreview.src = Photo.canvas.toDataURL()

        Photo.downloadButton.style.display = 'initial'
    }
}