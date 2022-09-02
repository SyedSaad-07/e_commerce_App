import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Payment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public customer_id:number

  @column()
  public payment_type:string

  @column()
  public card_number:number
}