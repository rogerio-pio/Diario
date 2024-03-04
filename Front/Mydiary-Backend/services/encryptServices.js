require('dotenv').config()
const bcrypt = require('bcrypt')

class encryptServices{
    async encrypt(plainPassword){
        try{
            const saltRounds = 5
            const hash = await bcrypt.hash(plainPassword, saltRounds)
            return hash
        }catch(err){
            console.log(err)
            return false
        }
    }
    async validate(plainPassword, hash){
        try{
            const result = await bcrypt.compare(plainPassword, hash)
            return result
        }catch(err){
            console.log(err)
            return false
        }
    }
}

module.exports = new encryptServices