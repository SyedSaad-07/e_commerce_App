import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SellerValidator from 'App/Validators/SellerValidator';
import Seller from 'App/Models/Seller'
import User from 'App/Models/User'

export default class SellerAuthsController {
    async SignUp( {request, response, auth}:HttpContextContract){
        try{
            await request.validate(SellerValidator)
            const {fullname, email, password, address, contact} = request.body()

            const seller  = await Seller.create({
                name: fullname,
                email: email,
                password: password,
                inventory_address: address,
                phone_number: contact
            })

            const user = await User.create({
                email: email,
                password: password,
                user_type: 'seller'
            })

            const token = await auth.use('api').login(user,{
                expiresIn: '10 seconds'
            })
        
            response.status(201).json({
                message: 'Successfully created and SignedUp a new seller.',
                data: [seller, token]
            })

        }catch(e){
            response.status(500).send(e)
        }
    }

    async Login({request, response, auth}: HttpContextContract){
        try{
            const {email, password} = request.body()

            const token = await auth.use('api').attempt(email, password, {
                expiresIn: '10 seconds'
            })
            response.status(201).json({
                message: 'Successfully logedIn as a seller.',
                data: token
            })
        }catch(e){
            response.status(500).send(e)
        }
    }
    
    async updateSeller({request, response, auth}: HttpContextContract) {
        try{
            const authenticateseller = await auth.use('api').authenticate()
            authenticateseller.serialize()

            const flag = auth.use('api').isLoggedIn
            if(flag){
                const {id} = await Seller.findByOrFail('email', authenticateseller.email)

            // validator
            const fields = {}
            const updatedFields = Object.keys(request.body())
            const seller = await Seller.findByOrFail('id', id)

            updatedFields.forEach((field) => fields[field] = request.body()[field])
            seller.merge(fields)
            await seller.save()
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