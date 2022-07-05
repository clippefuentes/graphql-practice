let users = [{
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

let posts = [{
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

let comments = [{
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
  author: '3',
  post: '3',
  id: '4',
  text: 'First B Comment',
}]

let db = {
  users,
  posts,
  comments,
}

export {
  db as default
}