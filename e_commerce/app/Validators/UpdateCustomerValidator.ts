import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateCustomerValidator {
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
    customer_name: schema.string.optional({}, [rules.minLength(4), rules.maxLength(40), rules.required()]),
    customer_email: schema.string.optional({trim:true}, [rules.required(), rules.email(), rules.maxLength(30)]),
    customer_pass: schema.string.optional({},[rules.minLength(8), rules.required()]),
    customer_confirm_pass: schema.string.optional({},[rules.required(), rules.confirmed('customer_pass')])
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
    'minLength':'the {{field}} must be atleast {{options.minLength}} long',
    'maxLength':'the {{field}} must be atmost {{options.maxLength}} long',
    'required':'the {{field}} can not be null',
    'email':'the is not a valid email'
  }
}
