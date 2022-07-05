const Comment = {
  post(parent, _args, ctx, _info) {
    const { posts } = ctx.db
    return posts.find(post => {
      return post.id === parent.post
    })
  },
  author(parent, _args, ctx, _info) {
    const { users } = ctx.db
    return users.find(user => {
      return user.id === parent.author
    })
  },
}

export default Comment