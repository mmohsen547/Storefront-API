import express, { Request, Response } from "express";
import { User, UserStore } from "../models/users";
import verifyAuthToken from '../middlewares/verify_authentication';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()
const {SALT_ROUNDS, PEPPER, SECRET_TOKEN} = process.env;

const userStore = new UserStore();

const index = async (req: Request, res: Response) => {
    try {
        const users = await userStore.index();
        res.json(users);
    } catch (error) {
        res.sendStatus(401).json(error);
    }
    
}

const show = async (req: Request, res: Response) => {
    try {
        const user = await userStore.show(req.params.id as string);
        res.json(user);
    } catch (error) {
        res.sendStatus(401)
    }
    
}

const create = async (req: Request, res: Response) => {
    const user: User = {
        firstName: req.body.firstName as string,
        lastName : req.body.lastName as string,
        username: req.body.username as string,
        password: req.body.password as string
    }
    
    try {
        const newUser = await userStore.create(user);
        const token = jwt.sign({user: newUser}, SECRET_TOKEN as string);
        res.json(token);    
    } catch (error) {
        res.sendStatus(401).json(error);
    }
    
}

const authenticate = async (req: Request, res: Response) => {
    try {
        const username = req.body.username as string;
        const password = req.body.password as string;
        const user = await userStore.authnticate(username, password);
        if (!user)
            return res.send('username or password is incorrect.')
            
        const token = jwt.sign({user: user}, SECRET_TOKEN as string);
        return res.json(token);
        
    } catch (error) {
        res.json(error);
    }
}

const userRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users/create', create);
    app.post('/users/authenticate', authenticate);
}
export default userRoutes;