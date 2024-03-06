const multer = require('multer');
const mStorage = require('../services/multerConfig');
const upload = multer({storage: mStorage});
const database = require('../services/databaseServices');
const token = require('../services/tokenServices');
const path = require('path');
const fs = require('fs');

class ImagesController {
    async new(req, res){
        try{
            const authHeader = req.headers['authorization'];
            const code = authHeader;
            if(!token) return res.status(401).json({msg: 'Faça login para acessar!'});
            if(!token.check(code)) return res.status(401).json({msg: 'Login Inválido!'});
            const id = token.decode(code);
            upload.array('file')(req, res, function(err){
                let imgPack = {
                    noteID: req.body.id,
                    img: []
                };
                if(err instanceof multer.MulterError){
                    console.log(err);
                    return res.status(500).json({msg: "Erro no upload de imagem!"});
                }else if (err){
                    console.log(err);
                    return res.status(500).json({msg: 'Erro interno do servidor!' });
                }
                
                req.files.forEach(file => {
                    imgPack.img.push(file.filename);
                });
                database.addImages(imgPack);
            });
        }catch(err){
            console.log(3)
            console.log(err);
            return res.status(500).json({msg: 'Erro interno do servidor!' });
        }
        return res.status(200).json({ msg: "Imagens enviadas com sucesso!" });
    }
    async edit(req, res){
        try{
            const images = req.body;
            const authHeader = req.headers['authorization'];
            const code = authHeader;
            if(!token) return res.status(401).json({msg: 'Faça login para acessar!'});
            if(!token.check(code)) return res.status(401).json({msg: 'Login Inválido!'});
            let userID = token.decode(code);
            userID = userID.foo;
    
            const result = await database.get('images', 'noteID', images.id);
            const check = await database.get('notes', 'id', images.id);
            if(check.userID != userID) return res.status(401).json({ msg: 'Nota indisponível!' });
            
            upload.array('file')(req, res, function(err){
                let imgPack = {
                    id: req.body.id,
                    img: []
                };
                noteID: req.body.id
                if(err instanceof multer.MulterError){
                    console.log(err);
                    return res.status(500).json({msg: "Erro no upload de imagem!"});
                }else if (err){
                    console.log(err);
                    return res.status(500).json({msg: 'Erro interno do servidor!' });
                }
                req.files.forEach(file => {
                    imgPack.img.push(`${file.filename}`);
                });       
                ///         
                database.edit('images', 'img1', imgPack.img[0], 'noteID', imgPack.id);
                database.edit('images', 'img2', imgPack.img[1], 'noteID', imgPack.id);
                database.edit('images', 'img3', imgPack.img[2], 'noteID', imgPack.id);
                database.edit('images', 'img4', imgPack.img[3], 'noteID', imgPack.id);
            });
        }catch(err){
            console.log(err);
            return res.status(500).json({msg: 'erro interno do servidor!'});
        }
        return res.status(200).json({ msg: "Imagens alteradas com sucesso!" });
    }
    async get(req, res) {
        try{
            const images = req.body;
            const authHeader = req.headers['authorization'];
            const code = authHeader;
            if(!token) return res.status(401).json({ msg: 'Faça login para acessar!' });
            if(!token.check(code)) return res.status(401).json({ msg: 'Login Inválido!' });
            let userID = token.decode(code);
            userID = userID.foo;
    
            const result = await database.get('images', 'noteID', images.id);
            const check = await database.get('notes', 'id', images.id);
            if(check.userID != userID) return res.status(401).json({ msg: 'Nota indisponível!' });
    

            if(result) return res.status(200).json({ msg: result });
            return res.status(404).json({ msg: "não encontrado!" });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: 'erro interno do servidor!' });
        }
    }
    async delete(req, res){
        try{
            const images = req.body;

            const authHeader = req.headers['authorization'];
            const code = authHeader;
            if(!token) return res.status(401).json({msg: 'Faça login para acessar!'});
            if(!token.check(code)) return res.status(401).json({msg: 'Login Inválido!'});
            let userID = token.decode(code);
            userID = userID.foo;
    
            const result = await database.get('images', 'noteID', images.id);
            const check = await database.get('notes', 'id', images.id);
            database.delete('images', result.id);
            return res.status(200).json({msg: "deletado com sucesso!"});
        }catch(err){
            console.log(err);
            return res.status(500).json({msg: 'erro interno do servidor!'});
        }
    }
}

module.exports = new ImagesController();
