export default function(Photo){
    Photo.canvas = document.createElement('canvas')
    Photo.context = Photo.canvas.getContext('2d')
}