import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().notNullable()
      table.string('category_type').notNullable()
      table.string('description',200)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}