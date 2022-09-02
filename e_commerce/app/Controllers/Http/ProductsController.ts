import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Seller from 'App/Models/Seller'
import Product from 'App/Models/Product'
import ProductCategory from 'App/Models/ProductCategory'
import Category from 'App/Models/Category'
// import CreateProductValidator from 'App/Validators/CreateProductValidator'
import UpdateProductValidator from 'App/Validators/UpdateProductValidator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ProductsController {
    async addProduct({ request, response, auth} :HttpContextContract) {

        try{
            // const authenticateseller = await auth.use('api').authenticate()
            // authenticateseller.serialize()
                
            // const flag = auth.use('api').isLoggedIn

            // if(flag){
                // await request.validate(CreateProductValidator)
            const data = request.body()

            const product_seller = await Seller.findByOrFail('email', data.email)
            product_seller.serialize()

            const product = await Product.create({
                product_name: data.name.toLowerCase(),
                product_quantity: data.quantity,
                details: data.details.toLowerCase(),
                price: data.price,
                image_url: data.image_url,
                seller_id: product_seller.id
            })

            const category = await Category.create({
                category_type: data.category_name,
                description: data.description.toLowerCase()
            })

            await ProductCategory.create({
                category_id: category.id,
                product_id: product.p_id
            })
            response.status(201).send({
                message: 'add product successfully',
                data: product
            })
            return product
            // }else{
                // response.send({message: "Not LoggedIn"})
            // }
            
        }catch(e){
            response.status(500).send(e)
        }
    }

    async getProducts({ response, auth}: HttpContextContract) {
        try{
            const seller = await auth.use('api').authenticate()
            seller.serialize()
            // const {email} = request.body()
            // console.log(email)
            const {id}=await Seller.findByOrFail('email',seller.email)
            const product=await Product.findByOrFail('seller_id',id)
            if(product){
                response.status(200).send(product)
            }else{
                response.status(404).send('no product is posted by this seller')
            }
            // const {id} = await Seller.findByOrFail('email',email)
            // const dd = await Seller.query().where('email', email)
            // console.log(dd.map(d=>d.toJSON()));
            // console.log(dd.map(d=> d.id))
            // const products = await Database.rawQuery
            // ("select * from 'products' as p inner join 'sellers' as s on :id: = :seller_id: where :id: = :seller_id:",
            // {
            //     id:"s.id",
            //     seller_id:"p.seller_id"
            // })
            // ('select * from products as p join sellers as s on s.id = p.seller_id where(`id` = ${id})')
            // s.id = p.seller_id`)
            // const data = await Product.all()
            // return{
            //     Status: 'Success',
            //     // data,
            //     products,
            //     // dataLength: data.length
            // }
        }catch(e){
            response.status(500).send(e)
        }
    }

    async editProduct({request, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            await request.validate(UpdateProductValidator)
            
            const {id} = request.params()
            const product = await Product.findByOrFail('p_id',id)
            const fields = {}
            const updatedFields = Object.keys(request.body())

            updatedFields.forEach((field) => fields[field] = request.body()[field] )
            product.merge(fields)
            await product.save()
            response.status(200).send('product updated successfully')
        }catch(e){
            response.status(500).send(e)
        }
    }

    async deleteProduct({ request, response, auth}:HttpContextContract){
        
        const {id} = request.params()

        try{
            await auth.use('api').authenticate()
            const product = await Product.findByOrFail('p_id',id)

            if(product){
                await product.delete()
                response.status(200).send('product deleted successfully')
            }else{
                response.send('product not found')
            }

        }catch(e){
            response.status(500).send(e)
        }
    }

    async productSummary({auth, response}: HttpContextContract){
        try{
            await auth.use('api').authenticate()
            const products = await Product.all()
            const pro_name = products.map(d => d.serialize().product_name)
            const pro_qun = products.map(d => d.serialize().product_quantity)
            const pro_des = products.map(d => d.serialize().details)

            return {'Products_name': pro_name,
                    'Products_quantity': pro_qun,
                    'Products_description': pro_des}
        }catch(e){
            response.status(500).send(e)
        } 
    }
}