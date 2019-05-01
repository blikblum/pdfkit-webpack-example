import fs from 'fs'

function registerBinaryFiles(ctx) {
  ctx.keys().forEach(key => {
    // extracts "./" from beginning of the key
    fs.writeFileSync(key.substring(2), ctx(key))
  });  
}

function registerAFMFonts(ctx) {
  ctx.keys().forEach(key => {
    const match = key.match(/([^/]*\.afm$)/)    
    if (match) {
      // afm files must be stored on data path
      fs.writeFileSync(`data/${match[0]}`, ctx(key))
    }    
  });  
}

registerBinaryFiles(require.context('./assets', true))

// is good practice to register only required fonts to avoid the bundle size increase
registerAFMFonts(require.context('pdfkit/js/data', false, /Helvetica.*\.afm$/))
