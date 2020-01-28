const { Router } = require('express')
const devController = require('./controllers/DevController')
const searchController = require('./controllers/SearchController')

const routes = Router()

// Devs
routes.get('/devs', devController.index)
routes.post('/devs', devController.store)
routes.delete('/devs/:id', devController.delete)

// Search
routes.get('/devs/search', searchController.index)

module.exports = routes