import { Request, Response } from "express"
import Employee from "../models/employee";

export const empcontroller=async(req:Request,res:Response)=>{
    const {name,employeeId,email,phoneNumber,department,dateOfJoining,role}=req.body;
    
    try {
        console.log(req.body);
        const exist=await Employee.findOne({where:{email:email}});
        console.log("exist",exist);
        if(exist) res.status(403).json({error:"User already exists"});
        else{
            const user = await Employee.create(req.body);
            res.status(200).json(user);
        }
    } catch (err) {
      res.status(500).json({ error: 'Failed to create user' });
    }
}