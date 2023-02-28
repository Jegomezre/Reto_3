import { DateTime } from 'luxon'
import Book from './Book'
import Perfil from './Perfil'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasOne,
  HasOne,
  hasMany,
  HasMany
} from '@ioc:Adonis/Lucid/Orm'


export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombres: string

  @column()
  public apellidos: string

  @column()
  public perfil: number
  @hasOne(() => Perfil)
  public perfilUser: HasOne<typeof Perfil>

  @column()
  public tipoIdentificacion: string

  @column()
  public numeroIdentificacion: string

  @column()
  public direccion: string

  @column()
  public barrio: string

  @column()
  public municipio: string

  @column()
  public departamento: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => Book)
  public books: HasMany<typeof Book>
  
}
