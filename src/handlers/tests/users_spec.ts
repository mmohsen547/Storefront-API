import supertest from 'supertest';
import { User, UserStore } from "../../models/users";
import client from "../../database";
import app from '../../server';

const userStore = new UserStore();
const request = supertest(app);
let token = '';
const user: User = {
    firstName: 'Ahmed',
    lastName: 'Amr',
    username: 'AhmedAmr12',
    password: 'test'
}
describe('user routes', () => {
    
    it('should create user when /users/create is called', async() => {
        const res = await request.post('/users/create').send(user);
        token += res.body;
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
        
    })

    it('should return user with specific id when token is applied.', async () => {
        const res = await request.get('/users/1').auth(token, {type: 'bearer'});
        expect(res.status).toBe(200);
    });

    it('should return users when token is applied', async () => {
        const res = await request.get('/users').auth(token, {type: 'bearer'});
        expect(res.status).toBe(200);
        expect(res.status).toBeTruthy();
    });

    it('it should verify user', async () => {
        const res = await request.post('/users/authenticate').send({
            username: user.username,
            password: user.password
        });
        expect(res.status).toBe(200);
    });

    afterAll(async () => {
        const conn = await client.connect();
        const sql = 'DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1;';
        await conn.query(sql);
        conn.release();
    })
})