require('dotenv').config()
const key = process.env.USER_TOKEN_KEY
const jwt = require('jsonwebtoken')

class tokenServices{
    create(content){
        try{
            const token = jwt.sign({foo: content}, key);
            return token;
        }catch(err){
            console.log(err);
            return false;
        }
    }
    check(token){
        try{
            jwt.verify(token, key);
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }
    decode(token){
        try{
            let content = jwt.decode(token, key);
            return content;
        }catch(err){
            console.log(err)
            return false;
        }
    }
}
module.exports = new tokenServices