import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cartitems'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('cart_id').unsigned()
      table.foreign('cart_id').references('carts.id').onDelete('CASCADE')
      table.integer('product_id').unsigned()
      table.foreign('product_id').references('products.p_id').onDelete('CASCADE')
      table.integer('quantity')
      table.integer('cost')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}