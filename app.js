const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const mongoose=require("mongoose");
const app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/ukdb",{useNewUrlParser: true, useUnifiedTopology: true } );
const storeSchema={
  title: String,
  content: String

};

const Store=mongoose.model("Store",storeSchema);
app.route("/stores")
.get(function(req,res){
  Store.find(function(err,foundStores){
   if(!err){
     res.send(foundStores);
   }else{
     res.send(err);
   }
  });
})

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
app.route("/stores/:storeTitle")
.get(function(req,res){
  Store.findOne({title: req.params.storeTitle},function(err, foundStores){
    if(foundStores){
      res.send(foundStores);
    }else{
      res.send("No article matchong that title was found.");
    }
  });
})
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
