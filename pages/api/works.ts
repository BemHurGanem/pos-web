import { NextApiResponse } from 'next'
import multer from 'multer';
import Cors from 'cors'
import FileUploadService from '../../lib/upload.service';
import { StoragePaths } from '../../utils/storage-path';
import initMiddleware from '../../utils/init-middleware'
import { NextApiRequestWithFormData, BlobCorrected } from '../../utils/types-util';
import { APIResponse } from '../../models/api-response';
import WorksService from '../../lib/works.service';
import { Works } from '../../models/works';
import AuthService from '../../lib/auth.service';
import TreatError from '../../lib/treat-error.service';

global.XMLHttpRequest = require('xhr2');
const upload = multer();

const multerAny = initMiddleware(
  upload.any()
);

const cors = initMiddleware(
  Cors({
      methods: ['GET', 'POST', 'OPTIONS'],
  })
)

async function endpoint(req: NextApiRequestWithFormData, res: NextApiResponse) {

  const worksService = WorksService();
  const authService = AuthService();
  const treatError = TreatError();

  await cors(req, res);

  if(await authService.checkAuthentication(req)){
    return res.status(401).send(await treatError.general('Usuário não autorizado.'))
  }

  switch (req.method) {

    case "POST":
      try{
        await multerAny(req, res);
        const blob: BlobCorrected = req.files?.length ? req.files[0] : null;
        const { id, title, text, url, authors }: Works = req.body;
        const work: Works = { title, text, url, authors, date: (new Date()).toISOString() }
  
        if(!id){
          const newWork = await worksService.save(work);
          work.id = newWork.id;
        } else {          
          work.id = id;
        }

        if(blob){
          const uploadService = FileUploadService();
          const url = await uploadService.upload(StoragePaths.WORKS, blob, work.id);  
          work.url = url;
        }

        await worksService.update(work);
  
        let response: APIResponse = {
          msg: "Trabalho salvo com sucesso!",
          result: work
        }
  
        res.status(200).json(response);
      }catch(e){
        console.log(e);
        return res.status(400).json(await treatError.general("Erro ao salvar Trabalho"));
      }

      break;

    case "GET":

      let getResponse: APIResponse = {
        msg: "",
        result: null
      };

      if (req.query.id) {
        const works = await worksService.getById(req.query.id);
        getResponse.result = works;
      } else {
        const worksList =  await worksService.getAll();
        getResponse.result = worksList;
      }

      res.status(200).json(getResponse);
      break

    case "DELETE":
      let worksID = req.query.id.toString();
      const deletedWorks = await worksService.getById(worksID);
      let uploadService = FileUploadService();
      await uploadService.remove(deletedWorks.url);

      await worksService.remove(worksID);

      let deleteResponse: APIResponse = {
        msg: "Trabalho removida com sucesso!",
        result: {}
      }

      res.status(200).json(deleteResponse);

    default:
      console.log(req.method)
      res.status(405);
      break;
  }

}


export const config = {
  api: {
    bodyParser: false,
  },
}

export default endpoint;
