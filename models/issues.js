import mongoose from 'mongoose'
import { urlApi } from '../db/config.js'
import issue from '../schemas/issue.js'
import user from '../schemas/user.js'
import { formatName } from '../utils/formatName.js'
import { getEmailTest } from './email.js'

export class IssuesModel {
  static async getIssues ({ id = 'null', task = 'null' }) {
    try {
      await mongoose.connect(urlApi)

      if (id !== 'null') {
        const issuesList = await issue.findById(id).sort({ created_At: -1 })

        return issuesList
      }

      if (id === 'null' && task !== 'null') {
        const issuesList = await issue
          .find({
            task: { $regex: task.toLowerCase() }
          })
          .sort({ created_At: -1, status: 1, task: 1 })

        return issuesList
      }

      const issuesList = await issue.find().sort({ created_At: -1 })

      return issuesList
    } catch (error) {
      console.log(error)
      return { error: 'Hubo un error' }
    }
  }

  static async createIssue ({
    task,
    nameClient,
    lastnameClient = 'null',
    motherLastnameClient = 'null',
    creditNumber,
    socialNumber,
    cardNumber,
    initialComment = '',
    assignTo,
    nameAssignated,
    status = 'pendient',
    category = 0,
    daysConfig,
    userId
  }) {
    try {
      await mongoose.connect(urlApi)

      const userNameResponse = await user.findById({ _id: userId }).select(['name', 'lastname'])

      const newIssue = issue({
        task,
        nameClient,
        lastnameClient,
        motherLastnameClient,
        creditNumber,
        socialNumber,
        cardNumber,
        initialComment,
        assignTo: assignTo !== undefined ? assignTo : userId,
        nameAssignated: assignTo !== userId ? nameAssignated : formatName({ name: userNameResponse.name, lastname: userNameResponse.lastname }),
        status,
        category,
        daysConfig,
        userId
      })

      const issueAdded = await newIssue.save()

      if (assignTo !== null || assignTo !== undefined) {
        const userAssignated = await user.findById({ _id: assignTo })
        getEmailTest({
          toEmail: userAssignated.email,
          subject: `Ticket Asignado - ${task}`,
          task,
          daysConfig
        })
      }

      return { msg: 'Incidencia creada correctamente', issueAdded }
    } catch (error) {
      return { error }
    }
  }

  static async updateIssue ({
    id,
    task,
    nameClient,
    lastnameClient = 'null',
    motherLastnameClient = 'null',
    creditNumber,
    socialNumber,
    cardNumber,
    assignTo,
    nameAssignated,
    status = 'pendient',
    category = 0,
    daysConfig,
    userId
  }) {
    try {
      await mongoose.connect(urlApi)

      let userName = {
        name: '',
        lastname: ''
      }

      if (assignTo === undefined) {
        const userNameResponse = await user.findById({ _id: userId }).select(['name', 'lastname'])
        userName = { name: userNameResponse.name, lastname: userNameResponse.lastname }
      }

      const issueExist = await issue.findById(id)
      if (!issueExist) {
        return {
          error: 'Error: No existe incidencia con este ID.',
          status: 401
        }
      }

      await issue.findByIdAndUpdate(id, {
        task,
        nameClient,
        lastnameClient,
        motherLastnameClient,
        creditNumber,
        socialNumber,
        cardNumber,
        assignTo: assignTo !== undefined ? assignTo : userId,
        nameAssignated: assignTo !== undefined ? nameAssignated : formatName({ name: userName.name, lastname: userName.lastname }),
        status,
        category: parseInt(category),
        daysConfig: parseInt(daysConfig)
      })

      if (assignTo !== null || assignTo !== undefined) {
        const userAssignated = await user.findById({ _id: assignTo })
        getEmailTest({
          toEmail: userAssignated.email,
          subject: `Ticket Asignado - ${task}`,
          task,
          daysConfig
        })
      }

      return { msg: 'Incidencia actualizada correctamente', status: 200 }
    } catch (error) {
      console.log(error)
      return { error }
    }
  }

  static async updateIssueStatus ({
    id,
    status
  }) {
    try {
      await mongoose.connect(urlApi)

      const issueExist = await issue.findById(id)
      if (!issueExist) {
        return {
          error: 'Error: No existe incidencia con este ID.',
          status: 401
        }
      }

      await issue.findByIdAndUpdate(id, {
        status
      })

      return { msg: 'Incidencia actualizada correctamente', status: 200 }
    } catch (error) {
      console.log(error)
      return { error }
    }
  }
}
