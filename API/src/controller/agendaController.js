import {
    listarTodos,
    listarPorNome,
    listarFavoritos,
    listarPorIntervalo,
    inserir,
    alterar,
    deletar
  } from '../repository/agendaRepository.js';
  
  import { Router } from 'express';
  const endpoints = Router();
  
  
  
  endpoints.post('/contato', async (req, resp) => {
    try {
      let agenda = req.body;
      let r = await inserir(agenda);
      resp.send(r);
    }
    catch (err) {
      resp.status(500).send({ erro: 'Ocorreu um erro!' });
    }
  })
  
  
  endpoints.get('/contato', async (req, resp) => {
    try {
      let r = await listarTodos();
      resp.send(r);
    }
    catch (err) {
      resp.status(500).send({ erro: 'Ocorreu um erro!' });
    }
  })
  
  
  
  endpoints.get('/contato/busca', async (req, resp) => {
    try {
      let nome = req.query.nome;
      let r = await listarPorNome(nome);
      resp.send(r);
    }
    catch (err) {
      resp.status(500).send({ erro: 'Ocorreu um erro!' });
    }
  })
  
  
  endpoints.get('/contato/favoritos', async (req, resp) => {
    try {
      let r = await listarFavoritos();
      resp.send(r);
    }
    catch (err) {
      resp.status(500).send({ erro: 'Ocorreu um erro!' });
    }
  })
  
  
  endpoints.get('/contato/cadastro', async (req, resp) => {
    try {
      let { inicio, fim } = req.query;
      let r = await listarPorIntervalo(inicio, fim);
      resp.send(r);
    }
    catch (err) {
      resp.status(500).send({ erro: 'Ocorreu um erro!' });
    }
  })
  
  
  endpoints.put('/contato/:id', async (req, resp) => {
    try {
      let id = req.params.id;
      let agenda = req.body;
      let r = await alterar(id, agenda);
  
      resp.send();
    }
    catch (err) {
      resp.status(500).send({ erro: 'Ocorreu um erro!' });
    }
  })
  
  
  endpoints.delete('/contato/:id', async (req, resp) => {
    try {
      let id = req.params.id;
      let r = await deletar(id);
      resp.send();
    }
    catch (err) {
      resp.status(500).send({ erro: 'Ocorreu um erro!' });
    }
  })
  
  
  
  export default endpoints;