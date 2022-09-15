import { OrderProduct, OrderStore } from "../models/order";
import express, { Request, Response } from "express";
import verifyAuthToken from "../middlewares/verify_authentication";

const orderStore = new OrderStore();

const getOrder = async (req: Request, res: Response) => {
    try {
        let order;
        const status = req.query['status'];
        if (status == 'current') 
        {
            order = await orderStore.getCurrentOrder(req.params.id);
        } else if(status == 'completed'){
            order = await orderStore.getCompletedOrdres(req.params.id);
        }
        
        res.json(order);
    } catch (error) {
        res.json(error).sendStatus(401);
    }
}

const createOrder = async (req: Request, res: Response) => {
    try {
        const user_id = req.body.userID;
        const order = await orderStore.createOrder(user_id);
        res.json(order);
    } catch (error) {
        res.json(error).sendStatus(401);
    }
}

const addProductToOrder = async (req: Request, res: Response) => {
    try {
        const product: OrderProduct = {
            product_id: req.body.product_id as string,
            order_id: req.params.id as string,
            quantity: (req.body.quantity as unknown) as Number
        }

        const newProduct = await orderStore.addProductToOrder(product)
        res.json(newProduct);

    } catch (error) {
        res.json(error);
    }
}

const submitOrder = async (req: Request, res: Response) => {
    try {
        await orderStore.updateOrderStatue(req.params.id as string);
        res.send('order is submited successfuly.');
    } catch (error){
        res.json(error).sendStatus(401);
    }
}

const getOrderDetails = async (req: Request, res: Response) => {
    try {
        const orderProducts = await orderStore.getOrderDetails(req.params.id as string) ;
        res.json(orderProducts);
    } catch (error){
        res.json(error).sendStatus(401);
    }
}


const orderRoutes = (app: express.Application) => {
    app.get('/users/:id/orders', verifyAuthToken, getOrder);
    app.post('/orders/create', verifyAuthToken, createOrder);
    app.post('/orders/:id/addProduct', verifyAuthToken, addProductToOrder);
    app.post('/orders/:id/submit', verifyAuthToken, submitOrder);
    app.get('/orders/:id', verifyAuthToken, getOrderDetails);
}

export default orderRoutes;