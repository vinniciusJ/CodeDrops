export default function(Photo){
    Photo.load = () => {
        Photo.photoFile = document.querySelector('#photo-file')

        const onLoadReader = () => {
            Photo.image = new Image()
            Photo.image.src = event.target.result

            Photo.image.addEventListener('load', onLoadImage)
        }

        const onLoadImage = () => {
        
            const { width: imageWidth, height: imageHeight } = Photo.image
        
            Photo.canvas.width = imageWidth
            Photo.canvas.height = imageHeight
        
            Photo.context.clearRect(0, 0, imageWidth, imageHeight)
        
            Photo.context.drawImage(Photo.image, 0, 0)

            Photo.preview()
        }

        Photo.photoFile.addEventListener('change', () => {   
            let reader = new FileReader()
            let [ file ]= Photo.photoFile.files

            Photo.photoName = file.name

            reader.readAsDataURL(file)

            reader.addEventListener('load', onLoadReader)
        }) 
    }
}