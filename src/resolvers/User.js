const User = {
  posts(parent, _args, ctx, _info) {
    const { posts } = ctx.db
    return posts.filter(post => {
      return post.author === parent.id
    })
  },
  comments(parent, _args, ctx, _info) {
    const { comments } = ctx.db
    return comments.filter(com => {
      return com.author === parent.id
    })
  },
}

export default User