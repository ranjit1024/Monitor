import { NextFunction,Request,Response } from "express";
import clinet from "prom-client";
export const histogram = new clinet.Histogram({
    name:'http_req_duration',
    help:"Duraton for an http to resolve",
    labelNames:["method", "route", "code"],
    buckets:[0.5,1,5,10,20,40,500,1000]
})

export function coutnLantancy(req:Request, res:Response, next:NextFunction){
    const startTime = Date.now();
    res.on('finish', ()=>{
        const endTime = Date.now();
        const duration = endTime - startTime;
        histogram.observe({
            method:req.method,
            route: req.path,
            code:res.statusCode
        },duration)
    })
    next()
}