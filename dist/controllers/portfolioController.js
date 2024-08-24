"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.portfolioEmail = void 0;
const zod_1 = require("zod");
const zod_validation_error_1 = require("zod-validation-error");
const senderEmail_1 = require("../utils/senderEmail");
const portfolioSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email("O email e obrgatorio").toLowerCase(),
    message: zod_1.z.string(),
});
const portfolioEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = portfolioSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ message: (0, zod_validation_error_1.fromZodError)(validation.error).details });
    }
    const subject = `Contato do Portfólio [${validation.data.name}]`;
    const html = `
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
  `;
    try {
        yield (0, senderEmail_1.sendEmail)(subject, html);
        res.status(200).json({ message: "email sent" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.portfolioEmail = portfolioEmail;
