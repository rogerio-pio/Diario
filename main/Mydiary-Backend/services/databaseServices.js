class databaseServices{
    init(con){
        this.con = con;
        const query = `
            CREATE TABLE IF NOT EXISTS users(
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50),
                email VARCHAR(100) UNIQUE,
                password VARCHAR(255),
                creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            `
        const query2 = `
            CREATE TABLE IF NOT EXISTS notes(
                id INT AUTO_INCREMENT PRIMARY KEY,
                userID INT,
                response1 TEXT,
                response2 TEXT,
                response3 TEXT,
                response4 TEXT,
                response5 TEXT,
                response6 TEXT,
                response7 TEXT,
                response8 TEXT,
                creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`
        const query3 = `
            CREATE TABLE IF NOT EXISTS images(
                id INT AUTO_INCREMENT PRIMARY KEY,
                noteID INT NOT NULL,
                img1 VARCHAR(255),
                img2 VARCHAR(255),
                img3 VARCHAR(255),
                img4 VARCHAR(255),
                creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `
        try{
            this.con.query(query);
            this.con.query(query2);
            this.con.query(query3);
            return true
        }catch(err){
            console.log(err);
            return false;
        }
    }
    async addUser(user){
        const query = `INSERT INTO users(username, email, password) VALUES (?, ?, ?);`
        try {
            await new Promise((resolve, reject) => {
                this.con.query(query, [user.username, user.email, user.password], (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
    async addNotes(notes){
        try{
            const query = 'INSERT INTO notes (userID, response1, response2, response3, response4, response5, response6, response7, response8) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const result = await new Promise((resolve, reject)=>{
                this.con.query(query, [notes.userID, notes.res1, notes.res2, notes.res3, notes.res4, notes.res5, notes.res6, notes.res7, notes.res8], (err, result) => {
                    if(err) reject(err);
                    else resolve(result);
                });
            });
            console.log(result);
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }
    async addImages(images){
        try{
            for(let i=0; images.img.length+i<4; i++){
                images.img.push(null);
            }
            const query = 'INSERT INTO images (noteID, img1, img2, img3, img4) VALUES (?, ?, ?, ?, ?)';
            const result = await new Promise((resolve, reject)=>{
                this.con.query(query, [images.noteID, images.img[0], images.img[1], images.img[2], images.img[3]], (err, result) => {
                    if(err) reject(err);
                    else resolve(result);
                });
            });
            console.log(result);
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }
    async checkExists(table, field, key) {
        const query = `SELECT * FROM ?? WHERE ?? = ?`;
        try {
            const result = await new Promise((resolve, reject) => {
                this.con.query(query, [table, field, key], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
            return result.length > 0;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
    async get(table, field, key){
        const query = 'SELECT * FROM ?? WHERE ?? = ?';
        try{
            const result = await new Promise((resolve, reject)=>{
                this.con.query(query, [table, field, key], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            })
            return result[0];
        }catch(err){
            console.log(err);
            return false;
        }
    }
    async getMulti(table, field, key){
        const query = 'SELECT * FROM ?? WHERE ?? = ?';
        try{
            const result = await new Promise((resolve, reject)=>{
                this.con.query(query, [table, field, key], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            })
            return result;
        }catch(err){
            console.log(err);
            return false;
        }
    }
    async edit(table, tuple, value, field, key) {
        const query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
        try {
            const result = await new Promise((resolve, reject) => {
                this.con.query(query, [table, tuple, value, field, key], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
    async delete(table, key){
        const query = 'DELETE FROM ?? WHERE id = ?';
        try {
            const result = await new Promise((resolve, reject) => {
                this.con.query(query, [table, key], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}    
module.exports = new databaseServices
