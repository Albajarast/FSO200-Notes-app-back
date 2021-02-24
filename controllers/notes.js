const express = require('express')
const router = express.Router()
const Note = require('../models/note')

router
  .route('/')
  .get(async (request, response) => {
    const notes = await Note.find({})
    response.json(notes)
  })
  .post(async (request, response, next) => {
    const body = request.body

    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date()
    })

    try {
      const savedNote = await note.save()
      response.json(savedNote)
    } catch (err) {
      next(err)
    }
  })

router
  .route('/:id')
  .get(async (request, response, next) => {
    try {
      const note = await Note.findById(request.params.id)
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    } catch (error) {
      next(error)
    }
  })
  .delete(async (request, response, next) => {
    try {
      await Note.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } catch (error) {
      next(error)
    }
  })
  .put((request, response, next) => {
    const body = request.body

    const note = {
      content: body.content,
      important: body.important
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
      .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => next(error))
  })

module.exports = router
