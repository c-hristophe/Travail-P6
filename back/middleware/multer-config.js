// Utilisation de multer pour enregistrer les fichiers images
const multer = require('multer');

const fs = require('fs')

// directory to check if exists
const dir = './images'

// check if directory exists
if (fs.existsSync(dir)) {
  console.log('Directory exists!')
} else {
// create new directory    
  fs.mkdir(dir, err => {
  if (err) {
    throw err
  }
  console.log('Directory is created.')
})
}






// Modification de l'extension des fichiers
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    // Enregistrement dans le dossier "images"
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    // Génération du nom du fichier : nom d'origine + numero unique + . + extension
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).single('image');