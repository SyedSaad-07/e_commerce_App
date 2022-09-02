import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    product_name: schema.string({trim:true}, [rules.required()]),
    product_quantity: schema.number([rules.unsigned()]),
    details: schema.string({trim:true}, [rules.required(), rules.maxLength(500)]),
    price: schema.number([rules.unsigned()]),
    seller_id: schema.string({}, [rules.required()]),
    category_type: schema.enum(['Clothing', 'Home and Garden', 'Electronics', 'Health & Wellness',
    'Children & Infants', 'Footwear', 'Apparel & Accessories', 'Meal boxes and kitchen accessories']),
    description: schema.string({trim: true}, [rules.required(), rules.maxLength(200)])
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'maxLength': 'The {{field}} must be atmost {{options.maxLength}} long',
    'required': 'The {{field}} can not be null',
    'enum': 'The value must be one of {{ options.choices }}'
  }
}
