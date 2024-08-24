import express, { urlencoded } from "express"
import * as dotenv  from "dotenv"
import cors from "cors"
import { portfolioRoute } from "./routes/portfolioRoute"
import { Request,Response } from "express";



dotenv.config()
const app  =   express()

const port =  process.env.PORT

app.use(express.json())
app.use(cors())
app.use(urlencoded({extended:true}))

app.use("/api/portfolio",portfolioRoute)
app.get("/",async(req: Request, res: Response)=>{

    res.status(200).send("deploy succefuly")
    
})










app.listen(port , ()=>{

console.log(` servidor rodando em http://localhost:${port}`)


})



 