import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'shipments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('order_id').unsigned()
      table.foreign('order_id').references('orders.id').onDelete('CASCADE')
      table.string('shipment_type')
      table.integer('shipment_cost')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}