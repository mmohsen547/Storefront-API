import supertest from 'supertest';
import { User, UserStore } from "../../models/users";
import client from "../../database";
import app from '../../server';
import { Product, ProductStore } from '../../models/product';

const request = supertest(app);
let token = '';
let productStore = new ProductStore();
let product : Product;
const user: User = {
    firstName: 'Ahmed',
    lastName: 'Amr',
    username: 'AhmedAmr12',
    password: 'test'
}
describe('order routes', () => {
    
    beforeAll(async() => {
        const res = await request.post('/users/create').send(user);
        token = res.body;
        product = await productStore.create("50", "ProductA");
        
    });

    it('should return current or completed orders.', async() => {
        const res = await request.get('/users/1/orders?status=current').auth(token, {type: 'bearer'});
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
    })


    it('should add product to Order.', async () => {
        const res = await request.post('/orders/1/addProduct')
        .auth(token, {type: 'bearer'})
        .send({
            product_id: '1',
            quantity: '5'
        });
        expect(res.status).toBe(200);
    });

    it('should update order status', async () => {
        const res = await request.post('/orders/1/submit').auth(token, {type: 'bearer'});
        expect(res.status).toBe(200);
    });

    it('should get orders details', async () => {
        const res = await request.get('/orders/1')
        .auth(token, {type: 'bearer'});
        expect(res.status).toBe(200);
    });

    afterAll(async () => {
        const conn = await client.connect();
        const sql = 'DELETE FROM order_products; \n DELETE FROM orders; \n \
                    ALTER SEQUENCE orders_id_seq RESTART WITH 1; \n \
                    DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1; \n \
                    DELETE FROM products; \n ALTER SEQUENCE products_id_seq RESTART WITH 1;';
        await conn.query(sql);
        conn.release();
    })
})