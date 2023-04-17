const express = require("express")
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require("mongoose");
const cors = require("cors")
const dotenv = require("dotenv")
const uploadRoute = require("./routes/upload")
const userRoute =require("./routes/user")
const AuthRoute =require("./routes/auth")
const RepoRoute =require("./routes/Repo")
const cartRoute = require("./routes/cart")
// const orderRoute = require("./routes/order")


const fileupload = require("express-fileupload");
dotenv.config();


mongoose.connect(process.env.MONGO_URL)
.then(()=>      
    console.log("Successful"))
.catch((err)=> {
    console.log(err)
});



// app.set('view engine', 'HTML');


// app.set('view engine', 'html')
// app.set('views', __dirname); 
// app.use(expressLayouts);


app.use(express.json())
app.use(cors());
app.use(fileupload());


app.use("/api/users", userRoute)
app.use("/api/upload", uploadRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/repo", RepoRoute);
app.use("/api/cart", cartRoute);
// app.use("/api/order",orderRoute)

app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status);
    res.send('error');
  });







app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running,oh yes finally !")

});