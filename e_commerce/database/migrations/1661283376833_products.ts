import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('p_id').primary()
      table.string('product_name',30).notNullable()
      table.integer('product_quantity').unsigned().notNullable()
      table.string('details',500).notNullable()
      table.string('image_url').notNullable()
      table.integer('price').unsigned().notNullable()
      table.integer('seller_id').unsigned()
      table.foreign('seller_id').references('sellers.id').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}