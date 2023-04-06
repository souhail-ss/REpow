const router = require("express").Router();
const upload = require('express-fileupload')



router.get('/file-upload',(req, res )=> {
    res.sendFile(__dirname+'/index.html');
})


module.exports = router