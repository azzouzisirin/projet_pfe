const request = require('supertest')

const { app } = require('./server')
const { Builder } = require('./builders/user-builder.js')
const { store } = require('./services/user-service')

jest.mock('./services/user-service.js')

beforeEach(() => {
  store.mockReset()
})

describe('POST /register', () => {
  test('should store a new user', async () => {
    // code...
  })

  test('should execute store function', async () => {
    const user = Builder.user()
  
    await request(app)
      .post('/register')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
  
    expect(store).toHaveBeenCalledWith(user)
  });
})