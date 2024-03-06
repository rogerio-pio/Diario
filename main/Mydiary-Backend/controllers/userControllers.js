const encrypt = require('../services/encryptServices');
const token = require('../services/tokenServices');
const database = require('../services/databaseServices');

class userControllers{
    async signup(req, res){
        try{
            let user = req.body;
            const userExists = await database.checkExists('users', 'email', user.email);
            if(userExists) return res.status(401).json({msg: 'Login já cadastrado!'});
            const hash = await encrypt.encrypt(user.password);
            user.password = hash;
            const userSaved = database.addUser(user);
            if(userSaved) return res.status(200).json({msg: 'usuário salvo com sucesso!'});
            return res.status(500).json({msg: 'erro interno do servidor'});     
        }catch(err){
            console.log(err);
            return res.status(500).json({msg: 'erro interno do servidor'});
        }
    }
    async signin(req, res){
        try{
            let user = req.body
            const userExists = await database.checkExists('users', 'email', user.email)
            if(!userExists) return res.status(401).json({msg: 'Login não foi encontrado!'})
            const dbUser = await database.get('users', 'email', user.email)
            const validPassword = await encrypt.validate(user.password, dbUser.password)
            if(validPassword){
                const userToken = await token.create(dbUser.id)
                return res.status(200).json({msg: "Logado com sucesso!", token: userToken})
            }
            else return res.status(401).json({msg: 'A senha informada esta incorreta!'})
        }catch(err){
            console.log(err)
            return res.status(500).json({msg: 'erro interno do servidor'})
        }
    }
    async edit(req, res){
        try{
            let user = req.body

            const dbUser = await database.get('users', 'email', user.email);
            if(dbUser && dbUser.username == user.username){
                const hash = await encrypt.encrypt(user.password);
                user.password = hash;
                database.edit('users', 'password', user.password, 'id', dbUser.id);
                return res.status(200).json({msg: "Senha alterada com sucesso"});
            }else{
                return res.status(500).json({msg: "Erro interno do servidor!"});
            }

            //const hash = await encrypt.encrypt(user.password);
            //user.password = hash;
            //database.edit('users', 'username', user.username, 'id', id.foo);
            //database.edit('users', 'email', user.email, 'id', id.foo);
            //database.edit('users', 'password', user.password, 'id', id.foo);
            //return res.status(200).json({msg: "atualizado com sucesso!"});
        }catch(err){
            console.log(err);
            return res.status(500).json({msg: "erro interno do servidor!"});
        }
    }
    async get(req, res){
        try{
            let user = req.body;
            const authHeader = req.headers['authorization'];
            const code = authHeader && authHeader.split(" ")[1];
            if(!code) return res.status(401).json({msg: 'Faça login para acessar!'});
            if(!token.check(code)) return res.status(401).json({msg: 'Login Inválido!'});
            const id = token.decode(code);
            const result = await database.get('users', 'id', id.foo);
            if(result) return res.status(200).json({res: result});
            return res.status(404).json({msg: "não foi encontrado!"});
        }catch(err){
            console.log(err);
            return res.status(500).json({err: "erro interno do servidor!"});
        }
    }
}
module.exports = new userControllers