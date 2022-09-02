import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Cartitem from "App/Models/Cartitem";

export default class Cart extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public customer_id: number

  @column()
  public total_cost: number

  @hasMany(()=>Cartitem,{
    foreignKey: 'cart_id'
  })
  public cartitem: HasMany<typeof Cartitem>
}