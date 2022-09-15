import client from "../database";

export type Product = {
    
    id?: Number
    name: string,
    price: Number
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
        
            return result.rows;
        } catch (error) {
            throw new Error(`Can not get users. ${error}`);
        }
        
    }

    async show(id: string): Promise<Product> {
        try {
            
            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);

            conn.release();
            return result.rows[0];

        } catch (error) {
            console.log(111111111);
            throw new Error(`Can not get Product with id: ${id}`);
            
        }
    }

    async create(price: string, name: string): Promise<Product> {
        try {
            
            const conn = await client.connect();
            const sql = 'INSERT INTO products(name, price) VALUES ($1, $2) RETURNING *';
            const result = await conn.query(sql, [name, price]);
            conn.release();
            return result.rows[0];
            
        } catch (error) {
            throw new Error(`Can not create Product. ${error}`);
            
        }
    }
}
