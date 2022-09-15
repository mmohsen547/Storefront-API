import client from "../database";

export type Order = {
    user_id: string,
    id?: string,
    status: string 
}

export type OrderProduct = {
    order_id: string,
    product_id: string,
    quantity: Number
}
export class OrderStore {

    async getCurrentOrder(user_id: string) : Promise<OrderProduct[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT p.order_id, p.product_id, p.quantity FROM order_products AS p INNER JOIN orders AS o ON o.id = p.order_id WHERE o.user_id=($1) AND o.status=($2)';
            const status = 'current';
            const result = await conn.query(sql, [user_id, status]);
            conn.release();
            return result.rows;
        } catch (error) {
            console.log(5465);
            throw new Error(`Can not get active order for user with id ${user_id}. ${error}}`);
            
        }
    }

    async createOrder(user_id: string) : Promise<Order> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO orders(user_id, status) VALUES ($1, $2) RETURNING *';
            const status = 'current';
            const result = await conn.query(sql, [user_id, status]);
            conn.release();
            return result.rows[0];
                
        } catch (error) {
            throw new Error(`Can not Create order. ${error}`);
            
        }

    }

    async addProductToOrder(p: OrderProduct): Promise<OrderProduct> {
        try {
            
            const conn = await client.connect();
            const sql = 'INSERT INTO order_products(order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [p.order_id, p.product_id, p.quantity]);
            conn.release();
            return await result.rows[0];
        } catch (error) {
            throw new Error(`Can not add product. ${error}`);
        }
    }

    async getCompletedOrdres(user_id: string): Promise<Order[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT order_id, product_id, quantity FROM order_products p INNER JOIN orders o ON o.id = p.order_id WHERE user_id=($1) AND status=($2)';
            const status = 'completed';
            const result = await conn.query(sql, [user_id, status]);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Can not get completed orders order for user with id ${user_id}. ${error}}`);
            
        }
    }

    async getOrderDetails(order_id: string) : Promise<OrderProduct[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT order_id, product_id, quantity FROM order_products WHERE order_id=($1)';
            const result = await conn.query(sql, [order_id]);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Can not get  order details for order with id ${order_id}. ${error}}`);
        }
    }

    async updateOrderStatue(order_id: string) : Promise<Order> {
        try {
            const conn = await client.connect();
            const sql = 'UPDATE orders SET status=($1) WHERE id =($2) RETURNING *';
            const status = 'completed';
            const result = await conn.query(sql, [status, order_id]);
            conn.release();
            
            return result.rows[0];
        } catch (error) {
            throw new Error(`Can not get completed orders order for user with id ${order_id}. ${error}}`);
        }
    }
}
