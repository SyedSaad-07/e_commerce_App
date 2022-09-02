import {BaseModel, column, HasOne, hasOne, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import Shipment from "App/Models/Shipment";
import OrderItem from "App/Models/OrderItem";

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public total_bill: number

  @column()
  public payment_type: string

  @column()
  public customer_id:number

  @hasOne(()=>Shipment,{
    foreignKey:'order_id'
  })
  public shipment:HasOne<typeof Shipment>

  @hasMany(()=>OrderItem,{
    foreignKey:'order_id'
  })
  public orderitem: HasMany<typeof OrderItem>
}
