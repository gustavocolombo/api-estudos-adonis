/* eslint-disable @typescript-eslint/naming-convention */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from '../../Models/Post'
import User from '../../Models/User'

export default class PostsController {
  public async store({ request, response }: HttpContextContract) {
    const { title, content, user_id } = request.body()

    await User.findByOrFail('id', user_id)

    const post = await Post.create({ title, content, userId: user_id })

    return response.status(201).json(post)
  }

  public async show({ response }: HttpContextContract) {
    const posts = await Post.query().join('users', 'users.id', '=', 'posts.user_id').select('*')

    return response.status(200).json(posts)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { title, content } = request.body()

    const post = await Post.findByOrFail('id', params.id)

    const updatedPost = await post.merge({ title, content }).save()

    return response.status(200).json(updatedPost)
  }
}
