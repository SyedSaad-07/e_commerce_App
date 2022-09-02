import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Product from "App/Models/Product";

export default class Seller extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public inventory_address: string

  @column()
  public phone_number: string

  @column()
  public avatar_url: string

  @hasOne(()=>Product,{
    foreignKey:'seller_id'
  })
  public product: HasOne<typeof Product>
}
