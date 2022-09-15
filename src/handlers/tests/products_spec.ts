import supertest from 'supertest';
import { User } from "../../models/users";
import client from "../../database";
import app from '../../server';

const request = supertest(app);
let token = '';
const user: User = {
    firstName: 'Ahmed',
    lastName: 'Amr',
    username: 'AhmedAmr12',
    password: 'test'
}
describe('product routes', () => {
    beforeAll(async() => {
        const res = await request.post('/users/create').send(user);
        token += res.body;
    })
    it('should list all products', async() => {
        const res = await request.get('/products');

        expect(res.status).toBe(200);
        
    })

    it('should return a specific product.', async () => {
        const res = await request.get('/products/1');
        expect(res.status).toBe(200);
    });

    it('should create new product', async () => {
        const res = await request.post('/products/create')
            .auth(token, {type: 'bearer'}).
            send({
                name: 'ProductA',
                price: '500'
            });
        expect(res.status).toBe(200);
        expect(res.status).toBeTruthy();
    });

   

    afterAll(async () => {
        const conn = await client.connect();
        const sql = 'DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1;';
        await conn.query(sql);
        conn.release();
    })
})