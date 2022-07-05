import uuidv4 from 'uuid/v4'

const Mutation = {
  createUser(_parent, args, ctx, _info) {
    const { name, email, age } = args.data
    const { users } = ctx.db
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
  deleteUser(_parent, args, ctx, _info) {
    const { id } = args
    const { users, posts, comments } = ctx.db
    const userIndex = users.findIndex((user) => id === user.id)
    if (userIndex === -1) {
      throw new Error("User not found")
    }

    const deletedUsers = users.splice(userIndex, 1)

    ctx.posts = posts.filter(post => {
      const match = post.author === id
      if (match) {
        ctx.comments = comments.filter((comment) => comment.post !== post.id)
      }

      return !match
    })
    ctx.comments = comments.filter((comment) => comment.author !== id)
    return deletedUsers[0]
  },
  updateUser(_parent, args, ctx, _info) {
    const { id, data } = args
    const { users } = ctx.db
    const user = users.find((user) => id === user.id)
    if (!user) {
      throw new Error("User not found")
    }

    if (typeof data.email === 'string') {
      const emailTaken = users.some((user) => user.email === email)
  
      if (emailTaken) throw new Error("Email Taken")

      user.email = data.email
    }

    if (typeof data.name === 'string') {
      user.name = data.name
    }

    if (typeof data.age !== undefined) {
      user.age = data.age
    }
   
    return user
  },
  createPost(_parent, args, ctx, _info) {
    const { title, body, published, author } = args.data
    const { users, posts } = ctx.db
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
  deletePost(_parent, args, ctx, _info) {
    const { id } = args
    const { posts, comments } = ctx.db
    const postIndex = posts.findIndex((post) => id === post.id)
    if (postIndex === -1) {
      throw new Error("Post not found")
    }

    const deletedPosts = posts.splice(postIndex, 1)
    ctx.comments = comments.filter((comment) => comment.post !== id)
    return deletedPosts[0]
  },
  updatePost(_parent, args, ctx, _info) {
    const { id, data } = args
    const { posts } = ctx.db
    const post = posts.find((post) => id === post.id)
    if (!post) {
      throw new Error("Post not found")
    }

    if (typeof data.title === 'string') {
      post.title = data.title
    }

    if (typeof data.body === 'string') {
      post.body = data.body
    }

    if (typeof data.published === 'boolean') {
      post.published = data.published
    }
 
    return post
  },
  createComment(_parent, args, ctx, _info) {
    const { text, author, post } = args.data
    const { users, posts, comments } = ctx.db
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
  deleteComment(_parent, args, ctx, _info) {
    const { id } = args
    const { comments } = ctx.db
    const commentIndex = comments.findIndex((post) => id === post.id)
    if (commentIndex === -1) {
      throw new Error("Post not found")
    }

    const deletedComment = comments.splice(commentIndex, 1)
    return deletedComment[0]
  },
  updateComment(_parent, args, ctx, _info) {
    const { id, data } = args
    const { comments } = ctx.db
    const comment = comments.find((com) => id === com.id)
    if (!comment) {
      throw new Error("Comment not found")
    }
    if (typeof data.text === 'string') {
      comment.text = data.text
    }
    return comment
  },
}

export default Mutation
