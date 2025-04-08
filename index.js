import express from 'express';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet'
import morgan from 'morgan';
import bodyParser from 'body-parser'; 


//Data imports
import User from "./models/User.js";
import { dataUser, dataProduct, dataProductStat } from "./data/index.js";
import Product from "./models/Product.js";
import ProductStat from './models/ProductStat.js';


/* Importing routes */

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

/* Configurations */

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* Routes */

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* Mongoose setups*/
const PORT = process.env.PORT || 3000;
mongoose
    .connect(process.env.MONGO_URL, {
    }).then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
        //run this once, once the tables are created, comment it out, nizreko uri kubyumva
        Product.insertMany(dataProduct);
        ProductStat.insertMany(dataProductStat);
        User.insertMany(dataUser);
    })
    .catch((error ) => console.log(`${error} did not connect`));
