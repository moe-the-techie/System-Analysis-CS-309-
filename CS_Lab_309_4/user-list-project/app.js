const express = require("express")

// app service 
const app = express()

let users= [
    {
        "id": "1",
        "name": "Ali",
        "phone": "0111111",
        "email": "ali@gmail.com"
    },
    {
        "id": "2",
        "name": "mohamed",
        "phone": "02222222",
        "email": "mohamed@gmail.com"
    },
    {
        "id": "3",
        "name": "Ahmed",
        "phone": "0333333333333",
        "email": "Ahmed@gmail.com"
    }
]

app.get('/', (req, res) => {
    res.send('Hello World, from cs309');
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/user/:id', (req, res) => {

    // req id 
    const id = req.params.id;
    // find by id in users 
    const user = users.find((u) => u.id === id);

    if(user){
        res.json(user);
    }
    else{
        res.status(404).send('user not found');
    }
});


app.delete('/user/:id', (req, res) => {

    // req id 
    const id = req.params.id;
    // delet by id in users 
   
    res.send('user deleted 100 100');
});

app.post('/sdduser', (req, res) => {

    //get user object from body 
    let user = {
        "name": req.body.name,
        "email": req.body.email 
    }
    // add user to users list 
    // if email already exist should return user already exist

    // return success 
});

// add new route here to edit 

//listen on specific port 
app.listen(8000, () => console.log('app started on port 8000'))