import { Order, OrderStore, OrderProduct } from "../order";
import { UserStore, User } from "../users";
import { ProductStore } from "../product";
import client from "../../database";


const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();
describe('Order Model', () => {
    const user : User = {
        firstName: "Ahmed",
        lastName: "Amr",
        password: "test",
        username: "AhmedAmr12"
    }
    
    
    beforeAll(async () => {
        await userStore.create(user);
        await productStore.create('500', 'productA');
    }) 
    it('should have a getCurrent order method.', () => {
        expect(orderStore.getCurrentOrder).toBeDefined();
    });

    it('should have a getOrderDetails method.', () => {
        expect(orderStore.getOrderDetails).toBeDefined();
    });

    it('should have a create method', () => {
        expect(orderStore.createOrder).toBeDefined();
    });

    it('should have an addProductToOrder method', () => {
        expect(orderStore.addProductToOrder).toBeDefined();
    });

    it('should have an updateOrderStatue method', () => {
        expect(orderStore.updateOrderStatue).toBeDefined();
    });

    it('should Add new order when create is invoked.', async ()=> {
        
        const result : Order = await orderStore.createOrder('1');
        expect(result.user_id).toEqual('1');
    });

    it('should return current order for user when show is invoked.', async () => {
        const orderProduct: OrderProduct = {
            order_id: '1',
            product_id: '1',
            quantity: 2
        }
        const result = await orderStore.addProductToOrder(orderProduct);
        expect(result).toEqual(orderProduct);
    })

    it('should return current order when getCurrentOrder is invoked', async () => {
        const result = await orderStore.getCurrentOrder('1');
        expect(result).toEqual([{
            order_id: '1',
            product_id: '1',
            quantity: 2
        }]);
    })

    it('should return completed orders when getCompletedOrder is invoked', async () => {
        const result = await orderStore.getCompletedOrdres('1');
        expect(result).toEqual([]);
    });

    it('should return order Products if getOrderDetails is invoked', async () => {
        const result = await orderStore.getOrderDetails('1');
        expect(result).toEqual([
            {
                order_id: '1',
                product_id: '1',
                quantity: 2   
            }
        ]);
    });

    it('it should update the order status to completed', async () => {
        const result = await orderStore.updateOrderStatue('1');
        expect(result.status).toEqual('completed');
    })

    afterAll(async () => {
        const conn = await client.connect();
        const sql = 'DELETE FROM order_products; \n DELETE FROM orders; \n \
        ALTER SEQUENCE orders_id_seq RESTART WITH 1; \n \
        ALTER SEQUENCE users_id_seq RESTART WITH 1; \n DELETE FROM users; \n \
        DELETE FROM products; \n \
        ALTER SEQUENCE products_id_seq RESTART WITH 1;';
        await conn.query(sql);
        conn.release();
    })
})