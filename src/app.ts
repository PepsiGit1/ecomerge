import bodyParser from "body-parser";
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoute from "./routes/apiRoute";
import path from "path";
import { testConnection } from "./db/database";

dotenv.config()
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '../public/images')));

app.use('/api', apiRoute);
testConnection();

const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});

