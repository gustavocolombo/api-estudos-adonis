import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const { name, email, password, remember_me_token } = request.only([
      'name',
      'email',
      'password',
      'remember_me_token',
    ])

    const user = await (await User.create({ name, email, password, remember_me_token })).save()

    return response.status(201).json(user)
  }

  public async update({ request, response }: HttpContextContract) {
    const { email, newName, newEmail } = request.body()

    const user = await User.findByOrFail('email', email)

    const updatedUser = await user.merge({ email: newEmail, name: newName }).save()

    return response.status(200).json(updatedUser)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const user = await User.findOrFail(id)

    const destroyedUser = await user.delete()

    return response.status(200).json(destroyedUser)
  }
}
