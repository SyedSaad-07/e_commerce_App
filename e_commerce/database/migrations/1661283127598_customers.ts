import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'customers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('customer_name',40).notNullable()
      table.string('customer_email',30).unique().notNullable()
      table.string('customer_pass').notNullable()
      table.string('customer_confirm_pass').notNullable()
      table.string('avatar_url')
      table.boolean('status').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
