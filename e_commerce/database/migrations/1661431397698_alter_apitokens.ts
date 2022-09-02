import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterApitokens extends BaseSchema {
  protected tableName = 'alter_apitokens'

  public async up () {
    this.schema.alterTable('api_tokens', (table) => {
      table.timestamps()
      table.dropColumn('updated_at')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
