const Query = {
  comments(parent, args, {
    db
  }, info) {
    return db.comments
  },
  users(parent, args, {
    db
  }, info) {
    if (!args.query) {
      return db.users;
    }

    return db.users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()))
  },
  posts(parent, args, {
    db
  }, info) {
    if (!args.query) {
      return db.posts;
    }

    return db.posts.filter(post => post.title.toLowerCase().includes(args.query.toLowerCase()) ||
      post.body.toLowerCase().includes(args.query.toLowerCase()))
  }
}

export { Query as default }