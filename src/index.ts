// src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import initDatabase from './db/index';
import routes from './routes';
import logger from './middlewares/logger';
import cors from './middlewares/cors';

// fonction passe-plat pour s'assurer de l'ordre d'execution de nos appels asynchrone
const startServer = async (): Promise<void> => {
    // permet d'utiliser les variables d'environnement du .env
    dotenv.config();

    // création de l'application express
    const app = express();

    // permet d'utiliser les variables du req.body
    app.use(bodyParser.json());

    app.use(logger);
    app.use(cors);
    // initialisation de la connection à la BDD
    await initDatabase();

    // montage des endpoints
    routes(app);

    // écoute sur le port définie en environnement
    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`);
    });
};

startServer();
