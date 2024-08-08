import urlModel from "../model/urlModel.js";

const randomStringGenerator = function(len) {
    const allowedWords = 'abcdefghijklmnopqrstuvwxyz0123456789-';
    let rand='';
    console.log(allowedWords.length);
    const randomNum = (min,max) => Math.floor(Math.random() * (max - min)) + min;
    for (let i = 0; i < len; i++) {
        rand += allowedWords.at(randomNum(0,allowedWords.length-1));
    }
    return rand;
}


export const shortenUrl = async function(req, res) {
    console.log('Inside shortenUrl');
    const originalUrl = req.body.url;
    console.log(req);
    const string = randomStringGenerator(5);
    const shortenedUrl = `${process.env.DOMAIN}/s/${string}`;
    try{
        const doc = await urlModel.create({
            originalUrl,
            shortenedUrl,
            string,
        });
    }catch(err){
        console.error(err);
    }

    res.status(201).json({
        status:'success',
        originalUrl,
        shortenedUrl,
        string,
    });
}