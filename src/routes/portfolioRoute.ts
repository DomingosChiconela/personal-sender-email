import  express from "express"
import { portfolioEmail } from "../controllers/portfolioController"

export const  portfolioRoute =  express.Router()



portfolioRoute.post('/',portfolioEmail)