import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class ProductCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public product_id: number

  @column()
  public category_id:number
}