import { UploadFile } from "../services/storage.service.js";


export async function upload(req,res){
const result = await UploadFile(req.file.buffer)

res.send(result)
}