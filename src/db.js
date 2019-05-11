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

const comments = [{
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

const db = {
  users,
  posts,
  comments
}

export { db as default }