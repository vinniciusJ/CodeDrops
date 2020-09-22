export default function(Photo){
    Photo.selector = document.querySelector('#selection-tool')

    Photo.startPosition = { x: 0, y: 0, relativeX: 0, relativeY: 0 }
    Photo.endPosition = { x: 0, y: 0, relativeX: 0, relativeY: 0 }

    Photo.startSelection = false

    const mouseEvents = {
        mouseover(){
            this.style.cursor = 'crosshair'
        },
        mousedown(){
            const { clientX, clientY, offsetX, offsetY } = event

            Photo.startPosition.x = clientX
            Photo.startPosition.y = clientY
            Photo.startPosition.relativeX = offsetX
            Photo.startPosition.relativeY = offsetY
            
            Photo.startSelection = true
        },
        mousemove(){
            Photo.endPosition.x = event.clientX,
            Photo.endPosition.y = event.clientY
            

            const { x: startX, y: startY } = Photo.startPosition
            const { x: endX, y: endY } = Photo.endPosition
            
            if(Photo.startSelection) {
                Photo.selector.style.display = 'initial'

                Photo.selector.style.top = `${startY}px`
                Photo.selector.style.left = `${startX}px`
                Photo.selector.style.height = `${(endY - startY)}px`
                Photo.selector.style.width = `${(endX - startX)}px`
                
            }  
        },
        mouseup(){
            Photo.startSelection = false

            Photo.endPosition.relativeX = event.layerX
            Photo.endPosition.relativeY = event.layerY

            Photo.cropButton.style.display = 'initial'
        }
    }

    Object.keys(mouseEvents).forEach(eventName => {
        Photo.photoPreview.addEventListener(eventName, mouseEvents[eventName])
     })
}