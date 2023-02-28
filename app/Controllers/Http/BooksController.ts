import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'

export default class BooksController {
    public async registraLibro({ request}: HttpContextContract) {
        const title = request.input('title')
        const author = request.input('author')
        const editorial = request.input('editorial')
        const formato = request.input('formato')
        const numeroPaginas = request.input('numeroPaginas')
        const idUsuario = request.input('idUsuario')

        try{
            const libroExistente: number = await this.getValidarLibroExistente(title);
            if(libroExistente == 0){
                const book = new Book()
                book.title = title
                book.author = author
                book.editorial = editorial
                book.formato = formato
                book.numeroPaginas = numeroPaginas
                book.idUsuario = idUsuario
                await book.save()
                return{ "message": "Libro creado con exito" }
            }
            else{
                return { "message": "El libro ya existe" }
            }
        } catch (error) {
            return { "message": "Error al crear el libro" }
        }
    }

    private async getValidarLibroExistente(title: string): Promise<number> {
        const book = await Book.findBy('title', title)
        if (book) {
            return 1
        }
        else {
            return 0
        }
    }

    public async getListarLibros(): Promise<Book[]>  {
        const books = await Book.all()
        return books
    }

    public async actualizarLibro({ request}: HttpContextContract) {
        const titulo = request.input('title') 
        const libro = await Book.findOrFail(titulo)
        const datos = request.all()
        libro.title = datos.title
        libro.author = datos.author
        libro.editorial = datos.editorial
        libro.formato = datos.formato
        libro.numeroPaginas = datos.numeroPaginas
        libro.idUsuario = datos.idUsuario
        await libro.save()
        return { "message": "Libro actualizado con exito" }
    }


    public async eliminarLibro({ request}: HttpContextContract) {
        const titulo = request.input('title') 
        const libro = await Book.findOrFail(titulo)
        await libro.delete()
        return { "message": "Libro eliminado con exito" }
    }

    public async getLibroPorTitulo({ request}: HttpContextContract) {
        const titulo = request.input('title') 
        const libro = await Book.findOrFail(titulo)
        return libro
    }
}
