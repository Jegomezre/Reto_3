/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }

})

Route.group(() => {
  Route.post('/register', 'AuthController.register')
  Route.post('/login', 'AuthController.login')

  Route.group(() => {
    Route.post('/books', 'BooksController.index')
    Route.post('/books/registrar', 'BooksController.registraLibro')
    Route.get('/books/listar', 'BooksController.getListarLibros')
    Route.get('/books/ListarPorTitulo', 'BooksController.getListarLibrosPorTitulo')
  }).middleware('auth')

  Route.group(() => {
    Route.put('/books/actualizar/:id', 'BooksController.actualizarLibro')
    Route.delete('/books/eliminar/:id', 'BooksController.eliminarLibro')
    Route.put('/perfil/actualizar/:id', 'PerfilController.actualizarPerfil')
    Route.delete('/perfil/eliminar/:id', 'PerfilController.eliminarPerfil')
    Route.put('/usuario/actualizar/:id', 'AuthController.actualizarUsuario')
    Route.delete('/usuario/eliminar/:id', 'AuthController.eliminarUsuario')
  }).middleware(['auth', 'Administrador'])

  Route.group(() => {
    Route.post('/perfil/registrar', 'PerfilController.registrarPerfil')
    Route.get('/perfil/listar', 'PerfilController.listarPerfiles')
    Route.get('/perfil/listarPerfilPorId/:id', 'PerfilController.getPerfilPorId')
    Route.get('/usuario/listarUsuarioPorId/:id', 'AuthController.getUsuarioPorId')
  }).middleware(['auth', 'Desarrollador'])
}).prefix('api')