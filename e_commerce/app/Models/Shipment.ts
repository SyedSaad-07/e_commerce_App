import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Shipment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public order_id:number

  @column()
  public shipment_type: string

  @column()
  public shipment_cost: number

}