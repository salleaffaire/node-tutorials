
console.log([...Array(100).keys()].map(e => {
  const fizz = (e % 3)
  const buzz = (e % 5)
  return ((fizz && buzz) ? parseInt(e) : '') + (!fizz ? 'fizz' : '') + (!buzz ? 'buzz' : '')
}))
