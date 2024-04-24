import {Request,Response} from 'express'

const notFoundMiddleware = (req:Request,res:Response)=>res.status(404).json({msg:'Route does not exists'})

export default notFoundMiddleware