const express = require('express')

const { store } = require('./services/user-service')

const router = express.Router()

router.post('/register', async (req, res) => {
  const {  username,
    CIN,
    email,
    desc,
    numero,
    password} = req.body

  const _id = 'abc'

  await store({ username,
    CIN,
    email,
    desc,
    numero,
    password })

  res.status(201).json({
    username,
      CIN,
      email,
      desc,
      numero,
      password,
    _id,
  })
})

module.exports.router = router
