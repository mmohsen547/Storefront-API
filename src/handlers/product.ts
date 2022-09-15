import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";
import verifyAuthToken from "../middlewares/verify_authentication";

const productStore = new ProductStore();

const index = async (req: Request, res: Response) => {
    try {
        const products = await productStore.index();
        res.json(products);

    } catch (error) {
        res.json(error).sendStatus(401);
    }
    
}

const show = async (req: Request, res: Response) => {
    try {
        const product = await productStore.show(req.params.id as string);
        res.json(product);
    } catch (error) {
        res.json(error).sendStatus(401);
    }
    
}

const create = async (req: Request, res: Response) => {
    try {
        const price = req.body.price as string;
        const name = req.body.name as string;
        const product = await productStore.create(price, name);
        
        res.json(product);
    } catch (error) {
        res.json(error);
    }
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products/create', verifyAuthToken ,create);
}

export default productRoutes;