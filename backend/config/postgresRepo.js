import db from './db.js';

class postgresRepo{
    constructor(databaseAccesor){
    this.db = databaseAccesor;
    }

    async findUsername(username) {
       const result = await this.db.query('SELECT * FROM users WHERE username = $1 OR email = $1', [username])
       return result.rows[0];
    }

    async signUp(username, email, hashedPassword) {
        const result = await this.db.query('INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING id, username',
        [username,email,hashedPassword]);

        return result.rows[0];
    }

    async addSub(id, service_name, price,category, currency, billing_cycle){
        const result = await this.db.query(
            'INSERT INTO subscriptions (user_id,service_name,price,billing_cycle,currency, category) VALUES($1,$2,$3,$4,$5,$6)',
        [id, service_name, price,billing_cycle, currency, category]);
        return result.rows[0];
    }

}
const repoSingleton = new postgresRepo(db);

export default repoSingleton;