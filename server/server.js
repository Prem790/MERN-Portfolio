 //starting the node server


 const express=require("express");
const cors = require("cors");
 const app=express();
 require("dotenv").config();
 const dbConfig=require("./config/dbConfig");

 const portfolioRoute=require("./routes/portfolioRoute");
 app.use(express.json());
app.use(cors({ origin: "https://mern-portfolio-client-yaps.onrender.com" }));
 app.use("/api/portfolio",portfolioRoute);


 const port= process.env.PORT || 5000;

/* const path=require("path");
 if(process.env.NODE_ENV==="production")
   {
      app.use(express.static(path.join(__dirname, "client/build")));
      app.get("*" , (req,res)=>{
         res.sendFile(path.join(__dirname, "client/build", "index.html"));
      });
   }
      */

app.listen(port , ()=>{
   console.log(`Server running on port ${port}`);
});
