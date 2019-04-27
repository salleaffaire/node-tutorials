'use strict'

const boolMW = function (mwa, mwb, bf) {
  return function (res, req, next) {
    let nextAWasCalled = false
    let nextBWasCalled = false
    // Explicitely call the first middleware
    mwa(res, req, function () {
      console.log('A next was called')
      nextAWasCalled = true
    })
    mwb(res, req, function () {
      console.log('B next was called')
      nextBWasCalled = true
    })
    if (bf(nextAWasCalled, nextBWasCalled)) {
      next()
    }
  }
}

let mwa = function (res, req, next) {
  console.log('Middleware A')
  // next()
}

let mwb = function (res, req, next) {
  console.log('Middleware B')
  next()
}

let aOrB = boolMW(mwa, mwb, (a, b) => {
  return a || b
})

aOrB(0, 0, function () {
  console.log('A or B next was called')
})
