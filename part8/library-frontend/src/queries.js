import { gql } from '@apollo/client'

export const BOOK_DETAILS = `
  fragment BookDetails on Book {
    title
    author {
      name
    }
    published
    genres
  }
`

export const ALL_AUTHORS_AND_BOOKS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const CREATE_BOOK = gql`
  mutation (
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
  mutation ($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`
export const LOGIN = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favouriteGenre
    }
  }
`

export const ALL_BOOKS_GENRE = gql`
  query ($genre: String!) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
