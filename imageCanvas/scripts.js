/********************** Variables *************************/
const photoFile = document.querySelector('#photo-file')
const photoPreview = document.querySelector('#photo-preview')
const selector = document.querySelector('#selection-tool')
const cropButton = document.querySelector('#crop-image')
const downloadButton = document.querySelector('#download')

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')

let startPosition = { x: 0, y: 0, relativeX: 0, relativeY: 0 }
let endPosition = { x: 0, y: 0, relativeX: 0, relativeY: 0 }

let startSelection = false
let image, photoName

/******************** Functions ************************/

const mouseEvents = {
    mouseover(){
        this.style.cursor = 'crosshair'
    },
    mousedown(){
        const { clientX, clientY, offsetX, offsetY } = event

        startPosition.x = clientX
        startPosition.y = clientY
        startPosition.relativeX = offsetX
        startPosition.relativeY = offsetY
        
        startSelection = true
    },
    mousemove(){
        endPosition.x = event.clientX,
        endPosition.y = event.clientY

        const { x: startX, y: startY } = startPosition
        const { x: endX, y: endY } = endPosition
        
        if(startSelection) {
            selector.style.display = 'initial'
            selector.style.top = `${startY}px`
            selector.style.left = `${startX}px`

            selector.style.width = `${(endX - startX)}px`
            selector.style.height = `${(endY - startY)}px`
        }  
    },
    mouseup(){
        startSelection = false

        endPosition.relativeX = event.layerX
        endPosition.relativeY = event.layerY

        cropButton.style.display = 'initial'
    }
}

const loadImage = () => {
    console.log('Netei')

    const { width: imageWidth, height: imageHeight } = image

    canvas.width = imageWidth
    canvas.height = imageHeight

    context.clearRect(0, 0, imageWidth, imageHeight)

    context.drawImage(image, 0, 0)

    photoPreview.src = canvas.toDataURL()
    photoPreview.style.display = 'initial' 
}

/********************** Events *************************/

// Select & Preview Image

document.querySelector('#select-img').addEventListener('click', () => {
    photoFile.click()
 })
 
 window.addEventListener('DOMContentLoaded', () => {
    photoFile.addEventListener('change', () => {
        
        let reader = new FileReader()
        let [ file ]= photoFile.files

        photoName = file.name

        reader.readAsDataURL(file)

        reader.addEventListener('load', event => {
            image = new Image()
            image.src = event.target.result

            image.addEventListener('load', loadImage)
        })
    })
 })

 // Selection tool

 Object.keys(mouseEvents).forEach(eventName => {
    photoPreview.addEventListener(eventName, mouseEvents[eventName])
 })

// Cortar Imagem

cropButton.addEventListener('click', () => {
    const { width: imageWidth, height: imageHeight } = image
    const { width: previewWidth, height: previewHeight } = photoPreview

    const [ widthFactor, heightFactor ] = [
        +(imageWidth / previewWidth),
        +(imageHeight / previewHeight)
    ]

    const [ selectionWidth, selectionHeight ] = [
        +selector.style.width.replace('px', ''),
        +selector.style.height.replace('px', '')
    ]

    const [ croppedWidth, croppedHeight ] = [
        +(selectionWidth * widthFactor),
        +(selectionHeight * heightFactor)
    ]

    const [ actualX, actualY ] = [
        +(startPosition.relativeX * widthFactor),
        +(startPosition.relativeY * heightFactor)
    ]

    // pegar do contexto a imagem cortada

    const croppedImage = context.getImageData(actualX, actualY, croppedWidth, croppedHeight)

    context.clearRect(0, 0, context.width, context.height)

    // ajuste de proporcoes

    image.width = canvas.width = croppedWidth
    image.height = canvas.height = croppedHeight

    context.putImageData(croppedImage, 0, 0)

    selector.style.display = 'none'

    photoPreview.src = canvas.toDataURL()

    downloadButton.style.display = 'initial'
})

// Download imagem

downloadButton.addEventListener('click', () => {
    let link = document.createElement('a')

    link.download = `${photoName}--cropped.png`
    link.href = canvas.toDataURL()

    link.click()
})