
import { Request,Response } from "express";
import { date, z } from "zod";
import { fromZodError } from "zod-validation-error"

import { sendEmail } from "../utils/senderEmail"
const portfolioSchema = z.object({


    name:z.string(),
    email:z.string().email("O email e obrgatorio").toLowerCase(),
    message:z.string(),
   
})



export const portfolioEmail = async(req: Request, res: Response)=>{
   

    
    const validation = portfolioSchema.safeParse(req.body);
    if(!validation.success){
        return  res.status(400).json({message:fromZodError(validation.error).details})
    }


    const subject = `Contato do Portfólio [${validation.data.name}]`
    const html =   `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="text-align: center; color: #017ff5;">Nova Mensagem de Contato</h2>
      <p style="font-size: 16px; color: #333;">
        <strong>Nome:</strong> ${validation.data.name}
      </p>
      <p style="font-size: 16px; color: #333;">
        <strong>Email:</strong> ${validation.data.email}
      </p>
      <p style="font-size: 16px; color: #333;">
        <strong>Mensagem:</strong><br/>
        ${validation.data.message}
      </p>
      <p style="font-size: 16px; color: #333;">
        Atenciosamente,<br/>
        Sistema de Contato do Portfólio
      </p>
    </div>
  `
  try{
        await sendEmail(subject,html)

        res.status(200).json({message:"email sent"})

    }catch(error){

        return res.status(500).json({ message: "Internal Server Error" });
    }



}