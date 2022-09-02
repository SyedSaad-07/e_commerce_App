import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class CustomerAddress extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public country: string

  @column()
  public city: string
  
  @column()
  public address: string

  @column()
  public postal_code: string
  
  @column()
  public phone_number:string

  @column()
  public customer_id: number
}
