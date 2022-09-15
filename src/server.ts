import express from "express"
import bodyParser from 'body-parser'
import orderRoutes from './handlers/order'
import userRoutes from './handlers/user'
import productRoutes from './handlers/product'
import dotenv from 'dotenv';

dotenv.config();

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json())
productRoutes(app);
userRoutes(app);
orderRoutes(app);


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;