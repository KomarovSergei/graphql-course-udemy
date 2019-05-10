import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'


let users = [{
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

let posts = [{
  id: '1',
  title: 'post1',
  body: 'post1 body',
  published: false,
  author: '1'
}, {
    id: '2',
    title: 'post2',
    body: 'post2 body',
    published: false,
    author: '2'
  }, {
    id: '3',
    title: 'post3',
    body: 'post3 body',
    published: true,
    author: '3'
}]

let comments = [{
    id: '1',
    text: 'text1',
    author: '1',
    post: '1'
}, {
    id: '2',
    text: 'text2',
    author: '2',
    post: '2'
}, {
    id: '3',
    text: 'text3',
    author: '1',
    post: '2'
}, {
    id: '4',
    text: 'text4',
    author: '3',
    post: '3'
}]

// type defenitions {schema}
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }

  type Mutation {
    createUser(data: CreateUserInput): User!
    deleteUser(id: ID!): User!
    createPost(data: CreatePostInput): Post!
    deletePost(id: ID!): Post!
    createComment(data: CreateCommentInput): Comment!
  }

  input CreateUserInput {
    name: String!,
    email: String!,
    age: Int
  }

  input CreatePostInput {
    title: String!,
    body: String!,
    published: Boolean!,
    author: ID!
  }

  input CreateCommentInput {
    text: String!,
    author: ID!,
    post: ID!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`

// resolvers
const resolvers = {
  Query: {
    comments() {
      return comments
    },
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
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some(user => user.email === args.data.email)

      if(emailTaken) {
        throw new Error('Email taken.')
      }
      u8pjkioy
      const user = {
        id: uuidv4(),
        ...args.data
      }

      users.push(user)

      return user
    },
    deleteUser(parent, args, ctx, info) {
      const userIndex = users.findIndex(user => user.id === args.id)

      if(userIndex === -1) {
        throw new Error('User not found.')
      }
      
      const deletedUsers = users.splice(userIndex, 1)

      posts = posts.filter((post) => {
        const match = post.author === args.id

        if(match) {
          comments = comments.filter(comment => comment.post !== post.id)
        }

        return !match
      })
      comments = comments.filter(comment => comment.author !== args.id)

      return deletedUsers[0]
    },
    deletePost(parent, args, ctx, info) {
      const postIndex = posts.findIndex(post => post.id === args.id)

      if(postIndex === -1) {
        throw new Error('Post not found.')
      }

      const deletedPosts = posts.splice(postIndex, 1)
      comments = comments.filter(comment => comment.post !== args.id)

      return deletedPosts[0]
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.data.author)

      if(!userExists) {
        throw new Error('User not found')
      }

      const post = {
        id: uuidv4(),
        ...args.data
      }

      posts.push(post)

      return post
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.data.author)
      const postExists = posts.some(post => post.id === args.data.post && post.published)

      if(!userExists) {
        throw new Error('User not found.')
      }

      if(!postExists) {
        throw new Error('Post not found.')
      }

      const comment = {
        id: uuidv4(),
        ...args.data
      }

      return comment
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author)
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.post === parent.id)
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => post.author === parent.id)
    },
    comments(parent, args, cts, info) {
      return comments.filter(comment => comment.author === parent.id)
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author)
    },
    post(parent, args, ctx, info) {
      return posts.find(post => post.id === parent.post)
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => console.log('The server is up!'));