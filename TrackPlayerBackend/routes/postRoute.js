import express from 'express'
import { add, del, findAll, findById, findByName, update } from '../controllers/postController.js'

const postRoute = express.Router()

postRoute.post('/', add)
postRoute.get('/findByName', findByName)
postRoute.get('/:id', findById)
postRoute.get('/', findAll)
postRoute.put('/:id', update)
postRoute.delete('/:id', del)

export default postRoute;