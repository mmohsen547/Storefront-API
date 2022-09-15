import { ProductStore } from "../product";
import client from "../../database";

const productStore = new ProductStore();

describe('Product Model', () => {
    it('should have an index method.', () => {
        expect(productStore.index).toBeDefined();
    });

    it('should have a show method.', () => {
        expect(productStore.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(productStore.create).toBeDefined();
    });
    

    it('should Add new product when create is invoked.', async ()=> {
        const price : string = '100';
        const name : string = 'ProductA';
        const result = await productStore.create(price, name);
        expect(result).toEqual({
            id: 1,
            name: "ProductA",
            price: 100
        });
    });

    it('should return a product when show is invoked.', async () => {
        const result = await productStore.show('1');
        expect(result).toEqual({
            id: 1,
            name: "ProductA",
            price: 100
        });
    })

    it('should return all products when index is invoked', async () => {
        const result = await productStore.index();
        expect(result).toEqual([
            {
            id: 1,
            name: "ProductA",
            price: 100
            }
        ]);
    })

    afterAll(async () => {
        const conn = await client.connect();
        const sql = 'DELETE FROM products; \n ALTER SEQUENCE products_id_seq RESTART WITH 1;';
        await conn.query(sql);
        conn.release();
    })
})