import createCanvas from './createCanvas.js'
import createSelectionTool from './createSelectionTool.js'

import setPreview from './setPreview.js'
import setLoad from './setLoad.js'

import canCrop from './canCrop.js'
import canDownload from './canDownload.js'

const Photo = {}

createCanvas(Photo)
setPreview(Photo)
setLoad(Photo)
createSelectionTool(Photo)
canCrop(Photo)
canDownload(Photo)

export default Photo