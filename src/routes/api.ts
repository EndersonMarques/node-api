import Router, {Request, Response} from 'express'
import multer from 'multer'
import * as ApiController from '../controllers/apiController'

const stogareConfig = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, './tmp');
    },
    filename: (req, file, cb)=> {
        let randomName = Math.floor(Math.random() * 999999);
        cb(null, `${randomName+Date.now()}.jpg`);
    }
});

const upload = multer({
    // storage: stogareConfig,
    // storage: multer.memoryStorage()
    dest: './tmp',
    fileFilter: (req, file, cb)=> {
        const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
        
        if(allowed.includes(file.mimetype)){
            cb(null, true);
        } else {
            cb(null, false);
        } 
    },
    limits : { fieldSize: 2000000}
});

const router = Router();

router.get('/ping', ApiController.ping);
router.get('/random', ApiController.random);
router.get('/nome/:nome', ApiController.nome);

router.post('/frases', ApiController.createPhrase);
router.get('/frases', ApiController.getAll);
router.get('/frase/aleatoria', ApiController.randomPhrase);
router.get('/frase/:id', ApiController.getPhrase);
router.put('/frase/:id', ApiController.updatePhrase);
router.delete('/frase/:id', ApiController.deletePhrase);

router.post('/upload', upload.single('avatar'), ApiController.uploadFile);

export default router;