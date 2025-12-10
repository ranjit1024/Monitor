import client from "prom-client";
import { Request, Response, NextFunction } from "express";
const structreuCounter = new client.Counter({
    name:"count_req",
    help:"total http request on port 3000",
    labelNames:["method", "route", "status_code"]
});

export const  calculateTotalReq = (req:Request, res:Response,next:NextFunction)=>{
    res.on("finish", ()=>{
        structreuCounter.inc({
            method:req.method,
            route:req.path,
            status_code:res.statusCode
        })
    })
    next()
}