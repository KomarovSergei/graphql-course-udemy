import { GraphQLServer } from 'graphql-yoga'

const users = [{
  id: '1',
  name: 'Sergei',
  email: 'komarov@MediaList.ru',
  age: 29
}, {
    id: '2',
    name: 'Aergei2',
    email: 'komarov2@MediaList.ru',
    age: 28
  }, {
    id: '3',
    name: 'Bergei3',
    email: 'komarov3@MediaList.ru',
    age: 27
}]

const posts = [{
  id: '1',
  title: 'post1',
  body: 'post1 body',
  published: false
}, {
    id: '2',
    title: 'post2',
    body: 'post2 body',
    published: false
}, {
    id: '3',
    title: 'post3',
    body: 'post3 body',
    published: true
}]

// type defenitions {schema}
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`

// resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if(!args.query){
        return users;
      }

      return users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()))
    },
    posts(parent, args, ctx, info) {
      if(!args.query) {
        return posts;
      }

      return posts.filter(post => post.title.toLowerCase().includes(args.query.toLowerCase()) 
        || post.body.toLowerCase().includes(args.query.toLowerCase()))
    },
    me() {
      return {
        id: '123sdf',
        name: 'Sergei2',
        email: 'komarov@mail.ru',
        age: 29
      }
    },
    post() {
      return {
          id: '123',
          title: 'post1',
          body: 'post1 body',
          published: true
      }
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => console.log('The server is up!'));