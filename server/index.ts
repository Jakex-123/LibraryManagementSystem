//@ts-nocheck
import express, { urlencoded, type Request, type Response } from 'express'
import cors from 'cors'
import { ConnectDB } from './db/db'
import router from './routes/api'

const app=express()
app.use(cors({
    origin:Bun.env.FRONTEND_URL,
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true
}))
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use('/api/v1',router)
ConnectDB()

app.get('/',(req:Request,res:Response)=>{
    res.send('hello')
})
const PORT = Bun.env.PORT || 3001 
app.listen(PORT,()=>{
    console.log('hello')
})