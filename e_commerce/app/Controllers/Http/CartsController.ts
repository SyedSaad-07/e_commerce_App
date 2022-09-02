import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'
import Product from 'App/Models/Product'
import Cart from  'App/Models/Cart'
import Database from '@ioc:Adonis/Lucid/Database'
import Order from 'App/Models/Order'
import CustomerAddress from 'App/Models/CustomerAddress'

export default class CartsController {
    async addItem({request, response, auth}: HttpContextContract){
        try{
            const customer = await auth.use('api').authenticate()
            customer.serialize()

            const loggedcustomer = await Customer.findByOrFail('customer_email',customer.email)

            const {pid} = request.params()
            const product = await Product.findByOrFail('p_id',pid)
            const cart = await Cart.findByOrFail('customer_id',loggedcustomer.id)

            if(product){

                if(product.product_quantity > 0){
                    await product.merge({product_quantity: product.product_quantity - 1}).save()
                    const cart_item = await Product.query().whereHas('cartitem', (item) => {
                        item.where('cart_id', cart.id)
                    } )

                    if(cart_item.length === 0){
                        await cart.related('cartitem').updateOrCreate({},{
                            [product.p_id] :{
                                product_quantity: 1
                            }
                        })
                        response.status(200).send('product added to the cart')
                    
                    }else{
                        const p_quantity = await Database.from('cartitems').where({product_id: product.p_id})
                        
                        await Database.from('cartitems').where({cart_id: cart.id,
                            product_id: product.p_id}).update({product_quantity: p_quantity[0].product_quantity + 1 }, ['product_qunatity'])
                            response.status(200).send('product added to cart')
                    }
                }else{
                    response.send({message: 'item is out of stock'})
                }
            
            }else{
                response.send({message: 'No product found'})
            }
        }catch(e){
            response.status(500).send(e)
        }
    }

    async removeItem({request, response, auth}:HttpContextContract) {
        try{
            const customer = await auth.use('api').authenticate()
            customer.serialize()

            const {id} = await Customer.findByOrFail('customer_email',customer.email)

            const {pid} = request.params()
            const product = await Product.findByOrFail('p_id',pid)
            const cart = await Cart.findByOrFail('customer_id',id)

            if(product){
                await product.merge({product_quantity: product.product_quantity - 1}).save()
                    const cart_item = await Product.query().whereHas('cartitem', (item) => {
                        item.where('cart_id', cart.id)
                })

                if(cart_item.length  > 1){
                    const p_quantity = await Database.from('cartitems').where({product_id: product.p_id}).select('product_quantity')

                    await Database.from('cartitems').where({cart_id: cart.id,
                        product_id: product.p_id}).update({product_quantity: p_quantity[0].product_quantity + 1 }, ['product_qunatity'])
                        response.status(200).send('product removed from  the cart')
                
                }else{
                    await Database.from('cartitems').where({cart_id:cart.id,
                        product_id:product.p_id}).del()
                      response.status(200).send('product remove from the cart')
                }
            }
        
        }catch(e){
            response.status(500).send(e)
        }
    }

    async placeOrder({request, response, auth}: HttpContextContract) {

        try{
            
            const customer = await auth.use('api').authenticate()
            customer.serialize()

            const {country, city, address, postal_code, contact} = request.body()


            const {id} = await Customer.findByOrFail('customer_email',customer.email)
            const cart = await Cart.findByOrFail('customer_id', id)

            const CustomerAdd = await CustomerAddress.create({
                country: country,
                city: city,
                address: address,
                postal_code: postal_code,
                phone_number: contact,
                customer_id: id
            })
            await CustomerAdd.save()
            const order = await Order.create({customer_id: id})
            const cartItems=await Database.from('cartitems').where({cart_id:cart.id})
            cartItems.forEach( async (cartItem) => {
                await order.related('orderitem').updateOrCreate({}, {
                    [cartItem.product_id] : {
                        quantity: cartItem.quantity
                    }
                })
            })

            cartItems.forEach( async (cartItem) => {
                await Database.from('cartitems').where({product_id: cartItem.product_id, cart_id: cartItem.cart_id }).del()
            })

            const bill = await Database.rawQuery(
                `select o.products_quantity*o.price as totalBill from products as p inner join order_items as o on p.p_id = o.product_id where o.order_id=?`, [order.id])
            
            const {total_bill} = bill[0][0]
            await order.merge({total_bill: total_bill}).save()
            response.send(
                {message: 'order placed successfully',
                data: [order]})

        }catch(e){
            response.status(500).send(e)
        }    
    }
}