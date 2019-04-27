'use strict'

console.log('Promise Related Exercices')

function getPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const n = Math.random()
      if (n > 0.5) {
        resolve(n)
      }
      else {
        reject(new Error("It didn't work"))
      }
    }, 2000)
  }) 
}

let p = getPromise()
  // .then((n) => {
  //   console.log('Got a number = ', n)
  // })
  // .catch((err) => {
  //   console.log(err)
  // })
  
setTimeout(() => {
  p
    .then((n) => {
      console.log('Got a number = ', n)
    })
    .catch((err) => {
      console.log(err)
    })   
}, 4000)