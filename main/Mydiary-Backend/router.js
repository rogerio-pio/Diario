const express = require('express');
const cors = require('cors');
const router = express.Router();
const userController = require('./controllers/userControllers');
const notesController = require('./controllers/notesControllers');
const imagesController = require('./controllers/imagesControllers');
const path = require('path');
const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
  };

router.use(cors(corsOptions));

///Rota dinâmica de imagem: localhost:8080/uploads/[titulo da imagem].[extensão - ex: pgn, jpg, jpeg]
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

///Rotas de Usuário
router.get('/getUser', userController.get);
router.post('/signin', userController.signin);
router.post('/signup', userController.signup);
router.post('/editUser', userController.edit);

///Rotas de Notas
router.get('/getNote', notesController.get);
router.post('/newNote', notesController.new);
router.post('/editNote', notesController.edit);
router.delete('/deleteNote', notesController.delete);

///Rotas de Imagens
router.post('/getImgs', imagesController.get); //recebe uma chave noteID no campo id como argumento
router.post('/newImgs', imagesController.new); //multipart
router.post('/editImgs', imagesController.edit); //multipart
router.delete('/deleteImgs', imagesController.delete); //recebe uma chave noteID no campo id como argumento

module.exports = router;