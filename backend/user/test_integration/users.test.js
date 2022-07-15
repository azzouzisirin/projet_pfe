const request = require('supertest')

const { app } = require('./server')
const { connect, getUri, closeDb } = require('./db')
const { Builder } = require('./builders/user-builder.js')

beforeAll(async () => {
  const uri = await getUri()
  await connect({ uri })
})

afterAll(async () => {
  await closeDb()
})

describe('POST /register', () => {
  test('should store a new user', async () => {
    const user = Builder.user()
  
    const response = await request(app)
      .post('/register')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
  
    const { _id, ...userStored } = response.body
  
    expect(userStored).toEqual(user)
    expect(_id).toBeTruthy()
  })
})
