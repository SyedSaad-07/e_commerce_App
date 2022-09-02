import { BaseModel, column, beforeSave, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Order from "App/Models/Order";
import Cart from "App/Models/Cart";
import Payment from "App/Models/Payment";
import CustomerAddress from 'App/Models/CustomerAddress';
import Hash from '@ioc:Adonis/Core/Hash'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public customer_name: string

  @column()
  public customer_email:string

  @column()
  public customer_pass:string

  @column()
  public customer_confirm_pass:string

  @column()
  public avatar_url:string

  @column()
  public status:boolean

  @hasOne(()=>Cart,{
    foreignKey: 'customer_id'
  })
  public cart: HasOne<typeof Cart>
  
  @hasMany(()=>Order,{
    foreignKey: 'customer_id'
  })
  public order: HasMany<typeof Order>

  @hasOne(()=>Payment,{
    foreignKey:'customer_id'
  })
  public payment: HasOne<typeof Payment>

  @hasOne(()=> CustomerAddress, {
    foreignKey: 'customer_id'
  })
  public customer_address: HasOne<typeof CustomerAddress>

  @beforeSave()
  public static async hashPassword(customer: Customer){
    if(customer.$dirty.customer_pass){
      customer.customer_pass = await Hash.make(customer.customer_pass)
    }
  }
}