/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
// import ProductsController from 'App/Controllers/Http/ProductsController'
// import Product from 'App/Models/Product'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})
// Route.get('/home/*', async ({params}) =>{
  // return params['*']
// })
// Route.get('/','ProductsController.getProducts')

// Route.group(()=>{
//   Route.post('/signup', 'CustomerAuthsController.SignUp')
//   Route.post('/login', 'CustomerAuthsController.Login')
// }).prefix('/customer').middleware('auth')

// Route.group(()=>{
  // Route.post('/signup', 'SellerAuthsController.SignUp')
  // Route.post('/login', 'SellerAuthsController.Login')
// }).prefix('/seller').middleware('auth')


// seller routes, it woeks when someone(user) switch him/herself as a seller
Route.group(() => {

  Route.post('/signup', async (ctx) => {
    const {default: SellerAuthsController} = await import('App/Controllers/Http/SellerAuthsController')
    return new SellerAuthsController().SignUp(ctx)
  })

  Route.post('/login', async (ctx) => {
    const {default: SellerAuthsController} = await import('App/Controllers/Http/SellerAuthsController')
    return new SellerAuthsController().Login(ctx)
  })

  Route.patch('/profile/update', async (ctx) => {
    const {default: SellerAuthsController} = await import('App/Controllers/Http/SellerAuthsController')
    return new SellerAuthsController().updateSeller(ctx)
  }).middleware('auth')

  Route.post('/profile/logout', async (ctx) => {
    const {default: SellerAuthsController} = await import('App/Controllers/Http/SellerAuthsController')
    return new SellerAuthsController().LogOut(ctx)
  })

}).prefix('/seller')




// customer routes, it woeks when someone(user) switch him/herself as a customer
Route.group(() => {

  Route.post('/signup', async (ctx) => {
    const {default: CustomerAuthsController} = await import('App/Controllers/Http/CustomerAuthsController')
    return new CustomerAuthsController().SignUp(ctx)
  })

  Route.post('/login', async (ctx) => {
    const {default: CustomerAuthsController} = await import('App/Controllers/Http/CustomerAuthsController')
    return new CustomerAuthsController().Login(ctx)
  })

  Route.patch('/profile/update', async (ctx) => {
    const {default: CustomerAuthsController} = await import('App/Controllers/Http/CustomerAuthsController')
    return new CustomerAuthsController().updateCustomer(ctx)
  }).middleware('auth')

  Route.post('/logout', async (ctx) => {
    const {default: CustomerAuthsController} = await import('App/Controllers/Http/CustomerAuthsController')
    return new CustomerAuthsController().LogOut(ctx)
  })

}).prefix('customer')

// Product routes
Route.group(() => {
  Route.post('/addProduct', async(ctx) => {
    const {default: ProductsController} = await import('App/Controllers/Http/ProductsController')
    return new ProductsController().addProduct(ctx)
  })

  Route.post('/getAllProducts', async(ctx) => {
    const {default: ProductsController} = await import('App/Controllers/Http/ProductsController')
    return new ProductsController().getProducts(ctx)
  })

  Route.get('/editProducts', async(ctx) => {
    const {default: ProductsController} = await import('App/Controllers/Http/ProductsController')
    return new ProductsController().editProduct(ctx)
  })

  Route.get('/deleteProducts', async(ctx) => {
    const {default: ProductsController} = await import('App/Controllers/Http/ProductsController')
    return new ProductsController().deleteProduct(ctx)
  })

}).prefix('/seller/product')