import express from 'express'
import { findAll } from '../controllers/playlistController.js';

const playlistRoute = express.Router();

playlistRoute.get("/", findAll);

export default playlistRoute;