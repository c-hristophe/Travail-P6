// Utilisation de multer pour enregistrer les fichiers images
const multer = require('multer');

const fs = require('fs')

// vérification existence dossier image sinon création
const dir = './images'

try {
    // test de l'existence du répertoire puis création
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
      console.log('Dossier images créé !')
    } else {
      console.log('Dossier images existant.')
    }
  } 
catch (err) {
    console.log(err)
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
    // Génération du nom du fichier : nom d'origine + numero unique + extension
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).single('image');