import express from 'express'
import { searchAll} from '../controllers/searchController.js'

const searchRoute = express.Router();

searchRoute.get("/all", searchAll);

export default searchRoute;