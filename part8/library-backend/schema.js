const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Mutation {
    editAuthor(name: String!, setBornTo: Int!): Author
  }

  type Subscription {
    bookAdded: Book!
  }
`

module.exports = typeDefs
