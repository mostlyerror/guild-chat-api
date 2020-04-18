const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => res.send('Hey there all you cool cats and kittens..'))

module.exports = router;
