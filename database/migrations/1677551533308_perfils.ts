import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Perfils extends BaseSchema {
  protected tableName = 'perfils'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('descripcionPerfil', 255).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
