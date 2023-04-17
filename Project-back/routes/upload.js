const router = require("express").Router();




router.post('/file-upload',(req, res )=> {
    if(req.files){
        // res.send('done')
        let file = req.files.file;
        let filename = file.name;
        // console.log(filename);
        file.mv('./uploads/'+filename,(err)=>{
        if(err) throw err;
        else
        res.send("File Upload")
        
        })

    }
    


    
})


module.exports = router