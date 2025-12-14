import { NextFunction,Request,Response } from "express";
import client from "prom-client";

const gaugeStructure = new client.Gauge({
    name:"count_add",
    help:'find how many are active on add',
    labelNames:["mehtod", "route", "status_code"]
})

export function addCounter(req:Request, res:Response, next:NextFunction){
    gaugeStructure.inc({
        mehtod:req.method,
        route:req.path,
    });
    res.on("finish", ()=>{
        gaugeStructure.dec({
        mehtod:req.method,
        route:req.path,
        status_code:res.statusCode
    })
    })
   
     next()
}