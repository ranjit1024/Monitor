import express, { Request, Response } from 'express';
import clinet from "prom-client"
import { calculateTotalReq } from './reqCounter';
import { addCounter } from './addGauge';
const app = express();
const PORT = 3000
let users:{name:string}[] = []
// Middleware
app.use(express.json());
app.use(calculateTotalReq)
// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({users:users});
});

app.post("/user/add", addCounter, (req:Request,res:Response)=>{
    const name = req.body.name;
    users.push({name:name});
    return res.status(200).json({
        users:users
    })
});

app.post("/user/remove",(req:Request,res:Response)=>{
    const name = req.body.name;
    users = users.filter(user => user !== name);
    return res.status(200).json({
        users:users
    })
})
app.get('/metrics', async(req:Request,res:Response)=>{
    const metrics = await clinet.register.metrics();
    res.set('Content-type', clinet.register.contentType);
    res.end(metrics)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:`,PORT);
});