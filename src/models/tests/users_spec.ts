import { User, UserStore } from "../users";
import client from "../../database";

const userStore = new UserStore();

describe('User Model', () => {
    it('should have an index method.', () => {
        expect(userStore.index).toBeDefined();
    });

    it('should have a show method.', () => {
        expect(userStore.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(userStore.create).toBeDefined();
    });

    it('should have an authenticate method', () => {
        expect(userStore.authnticate).toBeDefined();
    });

    it('should Add new user when create is invoked.', async ()=> {
        const user : User = {
            firstName: "Ahmed",
            lastName: "Amr",
            password: "test",
            username: "AhmedAmr12"
        }
        const result = await userStore.create(user);
        expect(result.username).toEqual("AhmedAmr12");
    });

    it('should return a user when show is invoked.', async () => {
        const result = await userStore.show('1');
        expect(result.username).toEqual("AhmedAmr12");
    })

    it('should return all users when index is invoked', async () => {
        const result = await userStore.index();
        expect(result[0].username).toEqual("AhmedAmr12");
    })

    it('should return all users when index is invoked', async () => {
        const result = await userStore.index();
        expect(result[0].username).toEqual("AhmedAmr12");
    })

    it('should return user if the user is authenticated', async () => {
        const result = await userStore.authnticate('AhmedAmr12', 'test');
        expect(result?.username).toEqual('AhmedAmr12');
    })

    it('should not return user if the user is not authenticated', async () => {
        const result = await userStore.authnticate('Mohamed', 'test');
        expect(result).toBeNull();
    })

    afterAll(async () => {
        const conn = await client.connect();
        const sql = 'DELETE FROM products; \n ALTER SEQUENCE products_id_seq RESTART WITH 1;';
        await conn.query(sql);
        conn.release();
    })
})