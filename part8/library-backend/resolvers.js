const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const jwt = require('jsonwebtoken')
const config = require('./utils/config')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const { UserInputError, ForbiddenError } = require('apollo-server')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) return Book.find({}).populate('author')
      else {
        if (args.author) {
          const author = await Author.findOne({ name: args.author })
          if (!args.genre)
            return Book.find({ author: author }).populate('author')
          else
            return Book.find({
              author: author,
              genres: { $in: [args.genre] },
            }).populate('author')
        } else {
          return Book.find({ genres: { $in: [args.genre] } }).populate('author')
        }
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({}).populate('books')
      return authors.map(a => {
        return { name: a.name, born: a.born, bookCount: a.books.length }
      })
      /*const groupedBooks = _.values(
        _.groupBy(
          (await Book.find({}).populate('author')).map(b => {
            return { ...b, author: b.author.name }
          }),
          'author'
        )
      ).map(async x => {
        console.log('Author.find')
        const author = await Author.findOne({ name: x[0].author })
        return { name: x[0].author, born: author.born, bookCount: x.length }
      })
      return groupedBooks*/
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser)
        throw new ForbiddenError(
          'not allowed to add books for not logged users'
        )

      let authorId
      const author = await Author.findOne({ name: args.author })
      if (!author) {
        const newAuthor = new Author({
          name: args.author,
        })
        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        authorId = newAuthor._id
      } else {
        authorId = author._id
      }

      const book = new Book({ ...args, author: authorId })
      try {
        await (await book.save()).populate('author')
        const addedAuthor = await Author.findById(authorId)
        addedAuthor.books = addedAuthor.books.concat(book._id)
        await addedAuthor.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser)
        throw new ForbiddenError(
          'not allowed to edit authors birth year for not logged users'
        )

      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      author.born = args.setBornTo
      return author.save()
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      })

      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== '1234') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers
