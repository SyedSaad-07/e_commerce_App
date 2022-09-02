import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProductReview extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public reviews:string

  @column()
  public product_id:number
}