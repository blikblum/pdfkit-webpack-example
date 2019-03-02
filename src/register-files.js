import fs from 'fs'
import helveticaData from 'pdfkit/js/data/Helvetica.afm'
import robotoRegular from './assets/fonts/Roboto-Regular.ttf'
import robotoBold from './assets/fonts/Roboto-Medium.ttf'
import bee from './assets/images/bee.png'

//default Helvetica font
fs.writeFileSync('data/Helvetica.afm', helveticaData)

//custom fonts
fs.writeFileSync('fonts/Roboto-Regular.ttf', robotoRegular)
fs.writeFileSync('fonts/Roboto-Medium.ttf', robotoBold)

// images
fs.writeFileSync('images/bee.png', bee)