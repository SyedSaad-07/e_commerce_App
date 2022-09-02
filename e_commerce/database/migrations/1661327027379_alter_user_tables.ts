import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterUserTables extends BaseSchema {
  protected tableName = 'alter_user_tables'

  public async up () {
    this.schema.alterTable('users', (table) => {
      table.string('user_type',10).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
