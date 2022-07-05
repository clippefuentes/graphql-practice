const Post = {
  author(parent, _args, ctx, _info) {
    const { users } = ctx.db
    return users.find(user => {
      return user.id === parent.author
    })
  },
  comments(parent, _args, ctx, _info) {
    const { comments } = ctx.db
    return comments.filter(com => {
      return com.post === parent.id
    })
  },
}

export default Post
