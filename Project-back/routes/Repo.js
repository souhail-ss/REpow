const { verify } = require("jsonwebtoken");
const Repo = require("../models/Repo");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post ("/",async (req,res)=>{
    const newRepo = new Repo(req.body)

    try{
        const savedRepo= await newRepo.save();
        res.status(20).json(savedRepo)
    }catch(err){
        res.status(500).json(err)
    }
})





// //UPDATE 
router.put("/:id",verifyTokenAndAdmin,async(req,res) => {
   
    try{
        const updateRepo = await User.findByIdAndUpdate(req.params.id,{
         
            $set: req.body
        },
        {new:true}
        );
        res.status(200).json(updateRepo)
    }catch(err){
        res.status(500).json(err)
    }
});
// //DELETE 
router.delete("/:id",verifyTokenAndAdmin, async (req,res)=>{
    try{
        await Repo.findByIdAndDelete(req.params.id)
        res.status(200).json("Repo has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
} )
// //GET Repo
router.get("/find/:id", async (req,res)=>{
    try{
        const Repo = await Repo.findById(req.params.id)
        

        res.status(200).json(Repo);
        
    }catch(err){
        res.status(500).json(err)
    }
} )
//get all Repos
router.get("/", async (req,res)=>{
    
    const qCategory = req.querycategory;
    try{
        let Repos;
        Repos = await Repo.find()
       if(qCategory){
        Repos = await Repo.find({categories:{
            $in:[qCategory],

        }
    })
       }else{
        Repos = await Repo.find()
       }

        res.status(200).json(Repos);
        
    }catch(err){
        res.status(500).json(err)
    }
} )


module.exports = router 