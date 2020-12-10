const express=require("express"); //importing packages from express using npm install in cmd 
const bodyParser=require("body-parser");//importing body-parser
const ejs=require("ejs");//importing embedded java script
const mongoose=require("mongoose");//importing mongoose to stabalise the database
const app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//hosting our local monodb database in localhost of 27017 of mongodb server
mongoose.connect("mongodb://localhost:27017/ukdb",{useNewUrlParser: true, useUnifiedTopology: true } );
const storeSchema={
  title: String,
  content: String

};

const Store=mongoose.model("Store",storeSchema);
//this is using chain route handler using express
app.route("/stores")//route for our localhost:3000/stores 
//this is get all the data stored in the data base
.get(function(req,res){
  Store.find(function(err,foundStores){
   if(!err){
     res.send(foundStores);
   }else{
     res.send(err);
   }
  });
})
//this is for create the new data in the database
.post(function(req,res){
  const newStore=new Store({
    title:req.body.title,
    content:req.body.content
  });
  newStore.save(function(err){
    if(!err){
      res.send("successfully added a new store.");
    }else{
      res.send(err);
    }
  });
})
//this is to delete all the data in the database
.delete(function(req,res){
  Store.deleteMany(function(err){
    if(!err){
      res.send("successfully deleted all store");
    }else{
      res.send(err);
    }
  });
});

/////////////////specific target/////////
app.route("/stores/:storeTitle")//chained route handler
//to get one particular data
.get(function(req,res){
  Store.findOne({title: req.params.storeTitle},function(err, foundStores){
    if(foundStores){
      res.send(foundStores);
    }else{
      res.send("No article matchong that title was found.");
    }
  });
})
//to delete one particular data
.delete(function(req,res){
  Store.deleteOne(
    {title: req.params.storeTitle},
    function(err){
      if(!err){
        res.send("successfully deleted corresponding store");
      }else{
        res.send(err);
      }
    }
  );
});
app.listen(3000,function(req,res){
  console.log("server in port 3000");
});
/////////end//////////////////////////////////////////////
