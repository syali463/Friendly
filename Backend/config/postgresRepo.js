class postgresRepo{

    constructor(databaseAccesor){
    this.db = databaseAccesor;
    }

    async findUsername(username) {
       const result = await this.db.query('SELECT * FROM users WHERE username = $1', [username])
       return result.rows[0];
    }

    async signUp(username,hashedPassword) {
        const result = await this.db.query('INSERT INTO users (username,password) VALUES ($1,$2) RETURNING id, username',
        [username,hashedPassword]);

        return result.rows[0];
    }
}

module.exports = postgresRepo;