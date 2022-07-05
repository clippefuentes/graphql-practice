import {
  GraphQLServer
} from 'graphql-yoga'
import uuidv4 from 'uuid/v4'

// DEMO
const users = [{
  id: '1',
  name: 'a',
  email: 'adsdasd',
  age: 25
}, {
  id: '2',
  name: 'b',
  email: 'sadds',
  age: 22
}, {
  id: '3',
  name: 'c',
  email: 'ccc',
  age: 19
}]

const posts = [{
  id: '1',
  title: 'THE',
  body: 'TEST 1',
  published: true,
  author: '1'
}, {
  id: '2',
  title: 'THE2',
  body: 'TEST 2',
  published: true,
  author: '1'
}, {
  id: '3',
  title: 'THE3',
  body: 'TEST3',
  published: false,
  author: '2'
}]

const comments = [{
  author: '1',
  post: '1',
  id: '1',
  text: 'First Comment',
}, {
  author: '2',
  post: '1',
  id: '2',
  text: 'Second Comment',
}, {
  author: '3',
  post: '2',
  id: '3',
  text: 'First A Comment',
}, {
  author: '4',
  post: '3',
  id: '4',
  text: 'First B Comment',
}]

// Type Definition
const typeDefs = `
  type Query {
    me: User!
    posts(query: String): [Post!]!
    users(query: String): [User!]!
    comments: [Comment!]!
  }

  type Mutation {
    createUser(data: CreateUserInput): User!
    createPost(data: CreatePostInput): Post!
    createComment(data: CreateCommentInput): Comment!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age:Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age:Int
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
    post: Post!
    author: User!
  }
`

// Resolvers
const resolvers = {
  Query: {
    /** 
    (_parent, args, _ctx, _info) {
    },
    **/
    users(_parent, args, _ctx, _info) {
      const { query } = args
      if (query) {
        return users.filter(user => user.name.toLowerCase() === query.toLowerCase())
      }
      return users
    },
    posts(_parent, args, _ctx, _info) {
      const { query } = args
      if (query) {
        return posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
      }
      return posts
    },
    comments (_parent, _args, _ctx, _info) {
      return comments
    },
  },
  Mutation: {
    createUser (_parent, args, _ctx, _info) {
      const { name, email, age } = args.data
      console.log('args', args)
      console.log('{ name, email, age }', { name, email, age })
      const emailTaken = users.some((user) => {
        return user.email === email
      })

      if (emailTaken) throw new Error("Email Taken")

      const user = {
        id: uuidv4(),
        name, email, age
      }

      users.push(user)

      return user
    },
    createPost(_parent, args, _ctx, _info) {
      const { title, body, published, author } = args.data
      console.log('args', args)
      const userExist = users.some((user) => {
        return user.id === author
      })

      if (!userExist) throw new Error("User not found")

      const post = {
        id: uuidv4(),
        title, body, published, author,
        comments: [],
      }

      posts.push(post)
      return post
    },
    createComment(_parent, args, _ctx, _info) {
      const { text, author, post } = args.data
      console.log('Comment, arags', args)
      const userExist = users.some((user) => {
        return user.id === author
      })

      const postExist = posts.some((userPost) => {
        return userPost.id === post
      })

      if (!userExist) throw new Error("User not found")
      if (!postExist) throw new Error("Post not found")

      const comment = {
        id: uuidv4(),
        text,
        author,
        post
      }

      comments.push(comment)
      return comment
    },
  },
  Post: {
    author(parent, _args, _ctx, _info) {
      return users.find(user => {
        return user.id === parent.author
      })
    },
    comments(parent, _args, _ctx, _info) {
      return comments.filter(com => {
        return com.post === parent.id
      })
    },
  },
  User: {
    posts(parent, _args, _ctx, _info) {
      return posts.filter(post => {
        return post.author === parent.id
      })
    },
    comments(parent, _args, _ctx, _info) {
      return comments.filter(com => {
        return com.author === parent.id
      })
    },
  },
  Comment: {
    post(parent, _args, _ctx, _info) {
      return posts.find(post => {
        return post.id === parent.post
      })
    },
    author(parent, _args, _ctx, _info) {
      return users.find(user => {
        return user.id === parent.author
      })
    },
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('SERVER UP')
})