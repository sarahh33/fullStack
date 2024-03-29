const { ApolloServer, gql } = require('apollo-server')
const { v1:uuid} = require('uuid')

let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]

const typeDefs = gql`
  type Book {
      title: String!
      published:Int!
      author:String!
      id:ID!
      genres:[String]!
        } 
  type Author {
      name: String!
      id: ID!
      born: Int
      bookCount: Int!
  }
  type FindBook {
      title:String!
  }
  type FindBookbyGenre {
      title: String!
      author:String!
  }
  type Mutation {
    addBook(
        title:String!
        author: String!
        published:Int!
        genres:[String!]!
    ):Book
    editAuthor(
        name:String!
        setBornTo:Int!
    ):Author
}

  type Query {
      bookCount:Int!
      authorCount:Int!
      allBooks(author:String, genre:String): [Book!]!
      allAuthors: [Author!]!
      allBook(author:String):[FindBook!]!
      allBooksByGenre(genre:String):[FindBookbyGenre!]!
  }
`

const resolvers = {
    Query: {
        bookCount: () => books.length,
        authorCount: () => authors.length,
        //combine 8.3-8.5
        allBooks: (root, args) => {
            if (args.author) {
                return books.filter(b => b.author === args.author)
            }
            else if (args.genre) {
                return books.filter(b => b.genres.includes(args.genre))
            }
            return books


        },
        allAuthors: () => authors,
        allBook: (root, args) => {
            if (!args.author) { return books }
            else {
                return books.filter(b => b.author === args.author)
            }
        },
        allBooksByGenre: (root, args) => {
            if (!args.genre) { return books }
            else {
                return books.filter(b => b.genres.includes(args.genre))
            }
        }
        //   allAuthors: (root, args) => books.find(book=> book.name===args.name).length 
    },
    Author: {
        name: (root) => root.name,
        born: (root) => root.born,
        bookCount: (root) => {
            const auList = books.map(book => book.author)
    
            const number = auList.filter(au => au === root.name).length
            return number

        }
    },
    FindBook: {
        title: (root) => root.title
    },
    Mutation: {
        addBook:(root, args)=> {
            const book = {...args, id:uuid}
            books= books.concat(book)
            console.log(authors.find(a=> a.name ===args.author))
            if (!authors.find(a=> a.name === args.author)){
                const author = {name:args.author, id:uuid}
                authors= authors.concat(author)
            }
            return book
        },
        editAuthor:(root, args) => {
            const author = authors.find(a=> a.name ===args.name)
            if (!author) {
                return null
            }
            const updatedAuthor = {...author, born:args.setBornTo}
            authors= authors.map(a=> a.name===args.name? updatedAuthor : a)
            return updatedAuthor
        }
    }

}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})