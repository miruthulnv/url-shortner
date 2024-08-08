import urlModel from "../model/urlModel.js";
import UrlModel from "../model/urlModel.js";

const randomStringGenerator = function(len) {
    const allowedWords = 'abcdefghijklmnopqrstuvwxyz0123456789-';
    let rand='';
    const randomNum = (min,max) => Math.floor(Math.random() * (max - min)) + min;
    for (let i = 0; i < len; i++) {
        rand += allowedWords.at(randomNum(0,allowedWords.length-1));
    }
    return rand;
}


export const shortenUrl = async function(req, res) {
    const originalUrl = req.body.url;
    const string = randomStringGenerator(5);
    const shortenedUrl = `${process.env.DOMAIN}/s/${string}`;
    try{
        const doc = await urlModel.create({
            originalUrl,
            shortenedUrl,
            string,
        });
        res.status(201).json({
            status:'success',
            originalUrl,
            shortenedUrl,
            string,
        });
    }catch(err){
        console.error(err);
        res.status(200).json({
            status:'error'
        });
    }
}

export const getUrl = async function(req,res) {
    const shortUrl = req.params.id;
    const doc = await UrlModel.findOne({string: shortUrl});
    if (!doc){
        res.status(404).json({
            status:'error',
            message:'Not Found',
        });
    }else{
        // Go to the url doc.originalUrl
        res.status(200).redirect(`https://${doc.originalUrl}`);
    }
}

export const getAllUrl = async function(req,res){
    const docs = await UrlModel.find();
    let links = [];
    let link = {};
    for (let i = 0; i < docs.length; i++) {
        link.originalLink = docs[i].originalUrl;
        link.shortenedLink = docs[i].shortenedUrl;
        link.string = docs[i].string;
        links.push({...link});
    }
    res.status(200).render('history',{ links });
}