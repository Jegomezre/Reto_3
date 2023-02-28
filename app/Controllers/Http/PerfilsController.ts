import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perfil from 'App/Models/Perfil'

export default class PerfilsController {
    public async registrarPerfil({ request}: HttpContextContract) {
        const perfil = new Perfil()
        perfil.descripcionPerfil = request.input('descripcionPerfil')
        if (perfil.descripcionPerfil != 'Administrador' && perfil.descripcionPerfil != 'Desarrollador' && perfil.descripcionPerfil != 'usuarioComun') {
            return { "message": "El perfil del usuario no es valido" }        
        }
        else{
            await perfil.save()
            return { "message": "Perfil creado con exito" }
        }

    }

    public async listarPerfiles(): Promise<Perfil[]>  {
        const perfiles = await Perfil.all()
        return perfiles
    }

    public async actualizarPerfil({ request}: HttpContextContract) {
        const perfil = await Perfil.findOrFail(request.input('id'))
        perfil.descripcionPerfil = request.input('descripcionPerfil')
        if (perfil.descripcionPerfil != 'Administrador' && perfil.descripcionPerfil != 'Desarrollador' && perfil.descripcionPerfil != 'usuarioComun') {
            return { "message": "El perfil del usuario no es valido" }        
        }
        else{
            await perfil.save()
            return { "message": "Perfil actualizado con exito" }
        }
    }

    public async eliminarPerfil({ request}: HttpContextContract) {
        const perfil = await Perfil.findOrFail(request.input('id'))
        await perfil.delete()
        return { "message": "Perfil eliminado con exito" }
    }

    public async getPerfilPorId({ request}: HttpContextContract) {
        const perfil = await Perfil.findOrFail(request.input('id'))
        return perfil
    }
}

