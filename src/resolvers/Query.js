const Query = {
  /** 
  (_parent, args, _ctx, _info) {
  },
  **/
  users(_parent, args, ctx, _info) {
    const { query } = args
    const { users } = ctx.db
    if (query) {
      return users.filter(user => user.id.toLowerCase() === query.toLowerCase())
    }
    return users
  },
  posts(_parent, args, ctx, _info) {
    const { query } = args
    const { posts } = ctx.db
    if (query) {
      return posts.filter(post => post.id.toLowerCase().includes(query.toLowerCase()))
    }
    return posts
  },
  comments (_parent, _args, ctx, _info) {
    const { comments } = ctx.db
    return comments
  },
}

export default Query
