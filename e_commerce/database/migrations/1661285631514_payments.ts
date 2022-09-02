import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'payments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('customer_id').unsigned()
      table.foreign('customer_id').references('customers.id').onDelete('CASCADE')
      table.string('payment_type')
      table.string('card_number')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}