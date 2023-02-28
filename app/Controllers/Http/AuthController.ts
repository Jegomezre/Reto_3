import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Perfil from 'App/Models/Perfil'

export default class AuthController {
    public async register({ request, auth }: HttpContextContract) {
        const nombres = request.input('nombres')
        const apellidos = request.input('apellidos')
        const rol = request.input('rol')
        const tipoIdentificacion = request.input('tipoIdentificacion')
        const numeroIdentificacion = request.input('numeroIdentificacion')
        const direccion = request.input('direccion')
        const barrio = request.input('barrio')
        const municipio = request.input('municipio')
        const departamento = request.input('departamento')
        const email = request.input('email')
        const password = request.input('password')

        if (rol != 'Administrador' && rol != 'Desarrollador' && rol != 'usuarioComun') {
            return { "message": "El perfil del usuario no es valido" }        
        }

        try{
            const usuarioExistente: number = await this.getValidarUsuarioExistente(numeroIdentificacion);
            if(usuarioExistente == 0){
                const perfil = new Perfil()
                perfil.descripcionPerfil = rol
                await perfil.save()
                const user = new User()
                user.nombres = nombres
                user.apellidos = apellidos
                user.tipoIdentificacion = tipoIdentificacion
                user.numeroIdentificacion = numeroIdentificacion
                user.direccion = direccion
                user.barrio = barrio
                user.municipio = municipio
                user.departamento = departamento
                user.email = email
                user.password = password
                user.perfil = perfil.id
                await user.save()
                const token = await auth.use('api').login(user, {
                    expiresIn: '2 minutes'
                })
                return{ token, "message": "Usuario creado con exito" }}
            
            else{

                return { "message": "El usuario ya existe" }
            }
        } catch (error) {
            return { "message": "Error al crear el usuario" }
        }    
    }

    public async login({ auth, request, response }: HttpContextContract) {
        const numeroIdentificacion = request.input('identificacion')
        const password = request.input('contrasena')

        try {
            const token = await auth.use('api').attempt(numeroIdentificacion, password, {
                expiresIn: '2 minutes'
            })
            return{
                token, "message": "User logeado con exito"
            }
        } catch (error) {
            return response.unauthorized({ error: { message: 'Identificacion o contrasena invalidos' } })
        }
    }
    
    private async getValidarUsuarioExistente(numeroIdentificacion: string): Promise<number> {
        const usuarioExistente = await User.query().where('numeroIdentificacion', numeroIdentificacion).count('* as total')
        return usuarioExistente[0].total
    }

    public async getListarUsuarios(): Promise<User[]> {
        const usuarios = await User.all()
        return usuarios
    }

    public async actualizarUsuario({ request }: HttpContextContract) {
        const numeroIdentificacion = request.param('identificacion')
        const usuario = await User.findOrFail(numeroIdentificacion)
        const datos = request.all()
        usuario.nombres = datos.nombres
        usuario.apellidos = datos.apellidos
        usuario.tipoIdentificacion = datos.tipoIdentificacion
        usuario.direccion = datos.direccion
        usuario.barrio = datos.barrio
        usuario.municipio = datos.municipio
        usuario.departamento = datos.departamento
        usuario.email = datos.email
        usuario.password = datos.password
        await usuario.save()
        return { "mensaje": "Usuario actualizado correctamente" }
    }

    public async eliminarUsuario({ request }: HttpContextContract) {
        const identificacion = request.param('identificacion')
        await User.query().where('numeroIdentificacion', identificacion).delete()
        return { "msg": `Ha eliminado al usuario con cedula ${identificacion} correctamente` }
    }

    public async buscarPorIdentificacion({ request }: HttpContextContract) {
        const identificacion = request.param('identificacion')
        const usuario = await User.findOrFail(identificacion)
        return usuario
    }
}

