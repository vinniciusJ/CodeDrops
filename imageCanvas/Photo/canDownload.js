export default function(Photo){
    Photo.downloadButton = document.querySelector('#download')
    
    Photo.download = () => {
        let link = document.createElement('a')

        link.download = `${Photo.photoName}--cropped.png`
        link.href = Photo.canvas.toDataURL()

        link.click()
    }
}