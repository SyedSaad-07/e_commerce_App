import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer';
import User from 'App/Models/User';
import CreateCustomerValidator from 'App/Validators/CreateCustomerValidator';
import UpdateCustomerValidator from 'App/Validators/UpdateCustomerValidator';
import Cart from 'App/Models/Cart';

export default class CustomerAuthsController {
    async SignUp( {request, response, auth}: HttpContextContract ) {

        try{
            await request.validate(CreateCustomerValidator)
            const {customer_name, customer_email, customer_pass, customer_confirm_pass} = request.body() 

            const customer = await Customer.create({
                customer_name: customer_name,
                customer_email: customer_email,
                customer_pass: customer_pass,
                customer_confirm_pass: customer_confirm_pass,
                status: true,
            })

            await Cart.create({
                customer_id: customer.id
            })

            const user = await User.create({
                email: customer_email,
                password: customer_pass,
                user_type: 'customer'
            })

            const token = await auth.use('api').login(user,{
                expiresIn: '10 seconds'
            })
        
            response.status(201).json({
                message: 'Successfully created and SignedUp a new customer.',
                data: [customer, token]
            })

        }catch(e){
            response.status(500).send(e)
        }
    }

    async Login( {request, response, auth}: HttpContextContract){
        try{
            const {email, password} = request.body()

            const token = await auth.use('api').attempt(email, password, {
                expiresIn: '10 seconds'
            })
            response.status(201).json({
                message: 'Successfully logedIn as a customer.',
                data: [token, email, password]
            })
        }catch(e){
            response.status(500).send(e)
        }
    }

    async updateCustomer({request, response, auth}: HttpContextContract){
        try{
            const authenticatecustomer = await auth.use('api').authenticate()
            authenticatecustomer.serialize()
            
            const flag = auth.use('api').isLoggedIn

            if(flag){

            const { id } = await Customer.findByOrFail('email', authenticatecustomer.email)

            await request.validate(UpdateCustomerValidator)
            const fields = {}
            const updatedfields = Object.keys(request.body())
            
            const customer = await Customer.findByOrFail('id',id)

            updatedfields.forEach((field) => fields[field] = request.body()[field])
            customer.merge(fields)
            await customer.save()
            response.status(200).send('updated successful')

            }else{
                response.send({message: 'not loggedIn'})
            }
            
        }catch(e){
            response.status(500).send(e)
        }
    }

    async LogOut({ response, auth}: HttpContextContract) {
        await auth.use('api').revoke()
        return response.redirect().toPath('/')
    }
}