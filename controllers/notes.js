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

router.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

router.delete('/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

router.put('/:id', (request, response, next) => {
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
