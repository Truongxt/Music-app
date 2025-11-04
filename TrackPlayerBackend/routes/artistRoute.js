import express from 'express'
import { add, del, findAll, findById, findByName, findPopularArtists, update } from '../controllers/artistController.js'

const artistRoute = express.Router()

artistRoute.post('/', add)
artistRoute.get('/popularArtist', findPopularArtists)
artistRoute.get('/findByName', findByName)
artistRoute.get('/:id', findById)
artistRoute.get('/', findAll)
artistRoute.put('/:id', update)
artistRoute.delete('/:id', del)

export default artistRoute;