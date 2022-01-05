
import express = require("express")
import *as cherrio from 'cheerio'
import  axios from 'axios'
// import *as mongo from 'mongodb'
// import bodyParser = require("body-parser")
import *as comicController from './controller/ComicController'
import multer = require("multer");
const router = express.Router();
const jsonConfig = express.json()
const upload = multer()
const getData = async () => {
    let res : any = ""
    await axios.get("https://blogtruyen.vn/page-1",{
    }).then((response)=>{
        res = response.data
        const  $ = cherrio.load(res)
        $('div [class="list-mainpage listview"]').each((index, el) => { 
            console.log(index)
            // lặp từng phần tử có class là job__list-item
            const name = $(el).find('div [class="col-sm-12"] div [class = fl-r] h3 a').text();
            const description = $(el).find("img")[index].attribs.alt;
            const magainfoUrl = $(el).find('.fl-l a')[index].attribs.href// lấy tên job
            // const company = $(el).find('.job__list-item-company span').text(); // lấy tên công ty
            // const address = $(el).find('.job__list-item-info').find('.address').text(); // lấy địa chỉ
            // const salary = $(el).find('.job__list-item-info').find('.salary').text(); // lấy lương
       // lấy tên job, được nằm trong thẻ a < .job__list-item-title
            console.log(name+"\n");
            console.log(description+"\n");
            console.log(magainfoUrl+"\n")
    })}).catch((err)=>console.log(err))

}
// Demo 
router.get('/demo', async (req: express.Request, res: express.Response) => {
    await getData() 
    res.status(200).send("200")
});

export default router;