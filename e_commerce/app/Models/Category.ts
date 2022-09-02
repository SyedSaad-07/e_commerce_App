import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import ProductCategory from "App/Models/ProductCategory";

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public category_type: string

  @column()
  public description: string

  @hasOne(()=>ProductCategory,{
    foreignKey:'category_id'
  })
  public product_category_id: HasOne<typeof ProductCategory>
}
