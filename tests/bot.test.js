const app = require('../app')
const request = require('supertest')
const db = require('../models/index')

afterAll(done => {
    db.mongoose.connection.close()
    done()
})

let _id = ''

describe('Get all users response', () => {
    test('It should fetch all slack user response', async () => {
        const { body } = await request(app)
          .get('/api/v1/all-response')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
   
          expect(body.responseCode).toBe(1)
          expect(body.responseText).toBe('ok')
          if(body.payload.length){
            expect(body.payload).toEqual(
                expect.arrayContaining([
                expect.objectContaining({
                    hobbies: expect.anything(),
                    _id: expect.anything(),
                    greeting: expect.anything(),
                    user_id: expect.anything(),
                    username: expect.anything(),
                    workspace: expect.anything(),
                    workspace_id: expect.anything(),
                    __v: expect.anything(),
                    created_at: expect.anything(),
                    updated_at: expect.anything(),
                    feeling: expect.anything()
                })
                ])
            )
         }
         else expect(body.payload).toEqual([]) 
     })
})

describe('Delete user response', () => {
    test('It should delete a user response', async () => {
        const { body: users } = await request(app)
          .get('/api/v1/all-response')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
        
          if(users.payload.length){
            _id = users.payload[0]._id

            const { body: deleted } = await request(app)
                .delete('/api/v1/'+_id)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)

                expect(deleted.payload).toEqual(
                    expect.objectContaining({
                        hobbies: expect.anything(),
                        _id: expect.anything(),
                        greeting: expect.anything(),
                        user_id: expect.anything(),
                        username: expect.anything(),
                        workspace: expect.anything(),
                        workspace_id: expect.anything(),
                        __v: expect.anything(),
                        created_at: expect.anything(),
                        updated_at: expect.anything(),
                        feeling: expect.anything()
                    })
                )   
        }
          
     })
})