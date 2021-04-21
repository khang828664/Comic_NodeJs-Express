
import express = require ("express")
import *as mongo from 'mongodb'
import bodyParser = require("body-parser")
import *as comicController from './controller/ComicController'
import multer = require("multer");
const router = express.Router();
const jsonConfig = express.json()
const upload =multer()
// Get All User
router.get('/all', async (req: express.Request, res: express.Response) => {
        comicController.GetAllComic(req,res)
});
router.get('/by/desname', jsonConfig, async (req: express.Request, res: express.Response) => {
    comicController.GetComicByName(req, res)
})
// get comic by name des or tag
router.get('/by/condition', jsonConfig, async (req: express.Request, res: express.Response) => {
     comicController.GetComicByCondition(req,res)
     
})
router.post('/create', jsonConfig,upload.any(), async (req: express.Request, res: express.Response) => {
        comicController.CreateComic(req,res)
})
router.post('/update', jsonConfig, async (req: express.Request, res: express.Response) => {
    console.table(req.body)
    comicController.UpdateUser(req, res)
})
router.post('/delete', jsonConfig, async (req: express.Request, res: express.Response) => {
    console.log(req.body)
    comicController.DeleteComic(req, res)
})
export default router;  