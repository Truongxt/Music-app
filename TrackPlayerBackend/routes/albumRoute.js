import express from 'express'
import { add, del, findAll, findByArtist, findById, findByName, update } from '../controllers/albumController.js'

const albumRoute = express.Router()

albumRoute.post('/', add)
albumRoute.get('/findByArtist/:id', findByArtist)
albumRoute.get('/findByName', findByName)
albumRoute.get('/:id', findById)
albumRoute.get('/', findAll)
albumRoute.put('/:id', update)
albumRoute.delete('/:id', del)

export default albumRoute;