import express from 'express'
import { add, del, findAll, findByArtist, findById, findByName, update } from '../controllers/trackControntroller.js'

const trackRoute = express.Router()

trackRoute.get('/findByArtist/:id', findByArtist);
trackRoute.get('/findByName', findByName)
trackRoute.get('/:id', findById)
trackRoute.get('/', findAll)
trackRoute.put('/:id', update)
trackRoute.delete('/:id', del)

export default trackRoute;