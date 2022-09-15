import client from '../database';
import bcrypt from 'bcrypt';


const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.PEPPER;


export type User = {
    firstName: string,
    password: string,
    lastName: string,
    username: string,
    id?: Number
}

export class UserStore {

    async index(): Promise<User[]> {
        try {
            
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;

        } catch (error) {
            throw new Error(`Unable to get users. ${error}`);
        }
        

    }

    async show(id: string): Promise<User> {
        try {
            
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE  id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];

        } catch (error) {
            throw new Error(`Can not get user with id: ${id}`);
            
        }
    }

    async create(user: User): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users(firstname, lastname, username, password_hash) VALUES ($1, $2, $3, $4) RETURNING *';
            
            const password_hash = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds as string));
            const result = await conn.query(sql, [user.firstName, user.lastName, user.username, password_hash]);
            conn.release(); 
            return result.rows[0];
        } catch(err) {
            throw new Error(`Can not Create user ${user.firstName}. ${err}`)
        }
    }

    async authnticate(username: string, password: string): Promise<User | null> {
        
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE username=($1)';
            const result = await conn.query(sql, [username]);

            if (!result.rows.length)
                return null;
            
            const user = result.rows[0];
            const authnticated =  bcrypt.compareSync(password + pepper, user.password_hash);
    
            if (authnticated)
                return user;
            
            return null;
        } catch (error) {
            throw new Error(`Can not authnticate user ${username}. ${error}`);
            
        }
        

    }

    
}


