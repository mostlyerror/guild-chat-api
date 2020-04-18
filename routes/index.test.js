const request = require('supertest')
const app = require('../server')

describe('createMessage', () => {
    it('should create a Message', async () => {
        const res = await request(app)
            .post('/api/messages')
            .send({
                senderId: 100,
                recipientId: 100,
                content: 'hey there all you cool cats and kittens',
            })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('message')
    })
})