import Perfil from "App/Models/Perfil";
import { AuthenticationException } from "@adonisjs/auth/build/standalone";

class Desarrollador{
    async handle({auth}, next){
        const user = await auth.user.perfil
        const perfil = await Perfil.findOrFail(user)
        if (perfil.descripcionPerfil != ("Desarrollador" || 'Administrador')) {
            throw new AuthenticationException('No tiene permisos para esta accion', 'E_UNAUTHORIZED_ACCESS', 'unauthorized')
        }
        else{
            await next()
        }
    }
}
module.exports = Desarrollador
