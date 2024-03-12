const encrypt = require('../services/encryptServices');
const token = require('../services/tokenServices');
const database = require('../services/databaseServices');

class notesControllers{
    async new(req, res){
        try{
            const notes = req.body;
            const authHeader = req.headers['authorization'];
            const code = authHeader;
            if(!token) return res.status(401).json({msg: 'Faça login para acessar!'});
            if(!token.check(code)) return res.status(401).json({msg: 'Login Inválido!'});
            console.log("Code Check: "+token.check(code))
            const id = token.decode(code);
            notes.userID = id.foo;
            console.log("notes" + notes);
            console.log("body" + req.body)
            const notesUploaded = database.addNotes(notes);
            if(notesUploaded) return res.status(200).json({msg: 'nota cadastrada com sucesso!'});
            return res.status(500).json({msg: 'erro interno do servidor'});
        }catch(err){
            console.log(err);
            return res.status(500).json({msg: "erro interno do servidor"});
        }
    }
    async edit(req, res){
        try{
            const notes = req.body;
            const authHeader = req.headers['authorization'];
            const code = authHeader && authHeader.split(" ")[1];
            if(!token) return res.status(401).json({msg: 'Faça login para acessar!'});
            if(!token.check(code)) return res.status(401).json({msg: 'Login Inválido!'});
            const id = token.decode(code);
            notes.userID = id.foo;

            const check = database.get('notes', 'id', notes.id);
            if(!check.userID == notes.userID) res.status(401).json({msg: 'Nota indisponível!'});

            database.edit('notes', 'response1', notes.res1, 'id', notes.id);
            database.edit('notes', 'response2', notes.res2, 'id', notes.id);
            database.edit('notes', 'response3', notes.res3, 'id', notes.id);
            database.edit('notes', 'response4', notes.res4, 'id', notes.id);
            database.edit('notes', 'response5', notes.res5, 'id', notes.id);
            return res.status(200).json({msg: 'editado com sucesso!'});
        }catch(err){
            console.log(err);
            return res.status(500).json({msg: 'erro interno do servidor!'});
        }
    }
    async get(req, res){
        try{
            const notes = req.body;
            const authHeader = req.headers['authorization'];
            const code = authHeader;
            if(!token) return res.status(401).json({msg: 'Faça login para acessar!'});
            if(!token.check(code)) return res.status(401).json({msg: 'Login Inválido!'});
            const id = token.decode(code);
            notes.userID = id.foo;
            const result = await database.getMulti('notes', 'userID', notes.userID);

            if(result) return res.status(200).json({res: result});
            return res.status(404).json({msg: "não encontrado!"});

        }catch(err){
            console.log(err);
            return res.status(500).json({msg: 'erro interno do servidor!'});
        }
    }
    async delete(req, res){
        try{
            const notes = req.body;
            const authHeader = req.headers['authorization'];
            const code = authHeader;
            if(!token) return res.status(401).json({msg: 'Faça login para deletar!'});
            if(!token.check(code)) return res.status(401).json({msg: 'Login Inválido!'});
            const id = token.decode(code);
            notes.userID = id.foo;

            const check = database.get('notes', 'id', notes.id);
            if(!check.userID == notes.userID) res.status(401).json({msg: 'Nota indisponível!'})

            const result = await database.delete('notes', notes.id);
            if(result) return res.status(200).json({msg: 'apagado com sucesso!'});
            return res.status(404).json({msg: "não encontrado!"});

        }catch(err){
            console.log(err);
            return res.status(500).json({msg: 'erro interno do servidor!'});
        }
    }
}

module.exports = new notesControllers;