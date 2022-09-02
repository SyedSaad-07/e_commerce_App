import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Cartitem from "App/Models/Cartitem";
import ProductReview from "App/Models/ProductReview";
import ProductCategory from "App/Models/ProductCategory";
import OrderItem from "App/Models/OrderItem";

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public p_id: number
  
  @column()
  public product_name: string

  @column()
  public product_quantity: number

  @column()
  public details: string

  @column()
  public image_url: string

  @column()
  public price: number

  @column()
  public seller_id: number
  
  @hasMany(()=>Cartitem,{
    foreignKey: 'product_id'
  })
  public cartitem: HasMany<typeof Cartitem>

  @hasMany(()=>ProductReview,{
    foreignKey:'product_id'
  })
  public productreview: HasMany<typeof ProductReview>

  @hasMany(()=>ProductCategory,{
    foreignKey:'product_id'
  })
  public productcategory: HasMany<typeof ProductCategory>

  @hasMany(()=> OrderItem,{
    foreignKey:'product_id'
  })
  public orderitem: HasMany<typeof OrderItem>
}