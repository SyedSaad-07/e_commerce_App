import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'customer_addresses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('country').notNullable()
      table.string('city').notNullable()
      table.string('address',500).notNullable()
      table.string('postal_code',8).notNullable()
      table.string('phone_number').unique().notNullable()
      table.integer('customer_id').unsigned()
      table.foreign('customer_id').references('customers.id').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
