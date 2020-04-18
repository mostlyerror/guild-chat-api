const { Router } = require('express')
const controllers = require('../controllers')

const router = Router()

router.get('/', (req, res) => res.send('Hey there all you cool cats and kittens..'))

router.post('/messages', controllers.createMessage)

module.exports = router;
