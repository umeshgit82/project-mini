const cors = require('cors');
const express = require('express');
const path = require('path');
const collection = require('./vendor');



const app = express();
//convert data into json format
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname,'startpage.html'))
});
app.get('/login', async (req, res) => {
    res.sendFile(path.join(__dirname,'login.html'))
});
app.get('/regist',(req,res)=>{
    res.sendFile(path.join(__dirname ,'regist.html'));
});
app.get('/home',(req,res)=>{
    res.sendFile(path.join(__dirname ,'home.html'))
});
app.get('/service',(req,res)=>{
    res.sendFile(path.join(__dirname ,'service.html'))
});
app.get('makeup', (req,res)=> {
    res.sendFile(path.join(__dirname ,'makeup.html'))
});
app.get('/drap', (req,res)=> {
    res.sendFile(path.join(__dirname ,'draping.html'))
});
app.get('/hairstyle',(req,res)=>{
    res.sendFile(path.join(__dirname ,'hairstyle'))
});
app.get('/vendorpage',(req,res)=>{
    res.sendFile(path.join(__dirname ,'vendorpage.html'))
});

//register user
app.post('/register', async(req, res) => {

    const data = {
        name: req.body.username,
        email:req.body.email,
        address:req.body.address,
        mobile:req.body.mobile,
        type:req.body.type,
        shop:req.body.shop,
        password: req.body.password
    }


    const existingUser = await collection.findOne({email: data.email});
    if (existingUser){
        res.send("User already exists.Please choose a different email.");
    }else{
        const userdata = await collection.insertMany(data);
        Console.log(userdata);
    }
    

    const userdata = await collection.insertMany(data);
    console.log(userdata);

});

//login user 
app.post('/login', async (req, res) => {
    try{
        const check = await collection.findOne({email: req.body.email});
        if(!check) {
            res.send("user  cannot found");
        }
        const isPasswordMatch = await collection.compare(req.body.password);
        if(isPasswordMatch){
            res.send("/");
        }else{
            res.send("wrong password")
        }
    }catch{
        res.send("wrong details");
    }
}); 


const port = 5000;
app.listen(port,() => {
    console.log(`Server running on Port: ${port}`);
});