import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class CartItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cart_id:number

  @column()
  public quantity:number

  @column()
  public cost:number
  
}
