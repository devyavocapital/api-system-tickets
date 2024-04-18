import mongoose from 'mongoose'
import { urlApi } from '../db/config.js'
import comments from '../schemas/comment.js'
import issues from '../schemas/issue.js'
import user from '../schemas/user.js'
import { formatName } from '../utils/formatName.js'

export class CommentModel {
  static async getComments ({ idIssue = null }) {
    try {
      await mongoose.connect(urlApi)

      if (idIssue !== null) {
        const commentsList = await comments.aggregate([
          {
            $match: {
              idIssue: new mongoose.Types.ObjectId(idIssue)
            }
          },
          {
            $lookup: {
              from: 'modelusers',
              localField: 'userId',
              foreignField: '_id',
              as: 'user'
            }
          },
          {
            $unset: ['userId', 'idIssue']
          },
          {
            $project: {
              _id: 1,
              description: 1,
              status: 1,
              created_At: 1,
              fileName: 1,
              'user.email': 1,
              'user.name': 1,
              'user.lastname': 1
            }
          },
          {
            $sort: {
              created_At: -1
            }
          }
        ])
        return commentsList
      }
    } catch (error) {
      console.log(error)
      return { error: 'Hubo un error' }
    }
  }

  static async createComment ({
    description,
    idIssue,
    assignTo,
    nameAssignated,
    status,
    fileName = null,
    userId
  }) {
    try {
      await mongoose.connect(urlApi)

      let currentStatus
      const userNameResponse = await user.findById({ _id: userId }).select(['name', 'lastname', 'email'])

      if (assignTo === undefined || assignTo === '') {
        const statusActual = await issues.findById({ _id: idIssue }).select(['status'])
        currentStatus = statusActual
      }

      const newComment = comments({
        description,
        userId,
        idIssue,
        assignTo: (assignTo !== '') ? assignTo : userId,
        nameAssignated: (assignTo !== '') ? nameAssignated : formatName({ name: userNameResponse.name, lastname: userNameResponse.lastname }),
        status: (assignTo === undefined || assignTo === '') ? currentStatus : status,
        fileName
      })

      if (assignTo) {
        await issues.findByIdAndUpdate(
          { _id: idIssue },
          { status, assignTo, nameAssignated }
        )
      }

      if (!assignTo) {
        await issues.findByIdAndUpdate(
          { _id: idIssue },
          { status }
        )
      }

      const comment = await newComment.save()
      const newCommentSaved = { _id: comment._id, created_At: comment.created_At, description: comment.description, fileName: null, user: [{ email: userNameResponse.email, lastname: userNameResponse.lastname, name: userNameResponse.name }] }

      return { msg: 'Comentario creado correctamente', status: 201, newCommentSaved }
    } catch (error) {
      console.log({ errorMongo: error })
      return { error }
    }
  }

  static async updateComment ({
    id,
    description,
    idIssue,
    assignTo,
    status,
    fileName,
    userId
  }) {
    try {
      await mongoose.connect(urlApi)

      const commentExist = await comments.findById(id)

      if (!commentExist) {
        return {
          error: 'Error: No existe comentario con este ID.',
          status: 401
        }
      }

      await comments.findByIdAndUpdate(id, {
        description,
        userId,
        idIssue,
        assignTo,
        status,
        fileName
      })

      return { msg: 'Comentario actualizado correctamente', status: 200 }
    } catch (error) {
      console.log({ errorMongo: error })
      return { error }
    }
  }
}
