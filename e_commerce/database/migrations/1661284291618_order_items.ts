import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'order_items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('order_id').unsigned()
      table.foreign('order_id').references('orders.id').onDelete('CASCADE')
      table.integer('product_id').unsigned()
      table.foreign('product_id').references('products.p_id').onDelete('CASCADE')
      table.integer('products_quantity').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}