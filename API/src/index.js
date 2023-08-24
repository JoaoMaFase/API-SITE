import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import agendaController from './controller/agendaController.js';

let servidor = express();
servidor.use(cors());
servidor.use(express.json());
servidor.use();

servidor.use(agendaController);

servidor.listen(
    process.env.PORT,
    () => console.log(`API está na porta ${process.env.PORT}`)
);