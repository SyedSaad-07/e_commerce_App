import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sellers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name',40).notNullable()
      table.string('email',30).unique().notNullable()
      table.string('password').notNullable()
      table.string('inventory_address',300).notNullable()
      table.string('phone_number').unique().notNullable()
      table.string('avatar_url')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}