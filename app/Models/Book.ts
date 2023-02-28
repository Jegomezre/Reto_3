import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column() public title: string
  @column() public author: number
  @column() public editorial: string
  @column() public formato: string
  @column() public numeroPaginas: number
  @column() public idUsuario: number
  @hasOne(() => User) public users: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
