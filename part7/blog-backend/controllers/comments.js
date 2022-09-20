const commentsRouter = require('express').Router()
const Comment = require('../models/comment')

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({}).populate('blogs')

  response.json(comments)
})

commentsRouter.get('/:id', async (request, response) => {
  const comment = await Comment.findById(request.params.id).populate('blogs')
  if (comment) {
    response.json(comment)
  } else {
    response.status(404).end()
  }
})

commentsRouter.post('/', async (request, response) => {
  const { text } = request.body

  const comment = new Comment({
    text,
  })

  const savedComment = await comment.save()

  response.status(201).json(savedComment)
})

module.exports = commentsRouter
