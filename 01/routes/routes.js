const express = require('express')
const { cadastrarAutor, buscarAutor, adicionarLivro, buscarLivro, buscarLivros } = require('../controllers/controllers')

const routes = express()

routes.post('/autor', cadastrarAutor)
routes.get('/autor/:id', buscarAutor)
routes.post('/autor/:id/livro', adicionarLivro)
routes.get('/livro/:id', buscarLivro)
routes.get('/livro', buscarLivros)

module.exports = { routes }