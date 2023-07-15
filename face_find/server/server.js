const express= require('express');
const bcrypt=require('bcrypt');
const cors=require('cors');

const app=express()

app.use(cors());
app.use(express.json());

const database = {
    users:[
        {
            id: '123',
            name:'John',
            email:'john@mail.com',
            password:'cookies',
            entries:0,
            joined: new Date()
        }
    ],
    login:[
        {
            id:'987',
            email:'',
            hash:''
        }
    ]
}



app.get('/',(req,res)=>{
    res.send(database.users);
})

app.post('/signin',(req,res)=>{
    console.log(req.body)
    database.users.map((item,index)=>{
    if(req.body.email===item.email &&
        bcrypt.compare(req.body.password,database.login[index].hash)){
           return res.json(database.users[database.users.length-1])
        }
    })
})


app.post('/register',(req,res)=>{
    const { email, name, password } = req.body;
    const id = Math.round(Math.random()*200)
    
    bcrypt.hash(password, 10, function(err, hash) {
        database.login.push({
            id:id,
            email:email,
            hash: hash,
        })
    })

    database.users.push({
        id:id,
        name:name,
        email:email,
        entries:0,
        joined:new Date()
    })
    res.json('succes')
})

app.get('/profile',(req,res)=>{
    const { id } = req.params
    database.users.map(user=>{ //forEach()
        if(user.id === id ){
           return res.status(400).json(user)
        }else{
            res.status(404).json('no such user');
        }
    })
})

app.put('/image',(req,res)=>{
    const { id } = req.body
    database.users.map(user=>{ 
        if(user.id == id ){
           user.entries += 1
           return res.json(user.entries)
        }
    })
});




app.listen(3000,()=>{
    console.log('server on port 3000');
})
