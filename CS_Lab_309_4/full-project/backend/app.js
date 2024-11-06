const express = require("express"),
    mongoose = require('mongoose'),
    User = require('./models/user.model'),
    bcrypt = require('bcrypt');

const mongouri = "mongodb://localhost:27017/lab1db"
// app service 
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get('/', (req, res) => {
    res.send('Hello World, from cs309');
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.get('/user/:id', async (req, res) => {
    
    try {
        // req id 
        const id = req.params.id;
        // find by id in users 
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});


app.get('/user/:email', async (req, res) => {
    try {
        // req email
        const email = req.params.email;
        // find by email in users
        const user = await User.findOne({email: email});

        if (user) {
            res.status(200).json(user);
        } else {
            return res.status(404).json({message: 'cannot find any user with email ${email}'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


app.delete('/user/:id', async (req, res) => {

    // delete by id in users
   
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: `cannot find any user with ID ${id}`})
        }
        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.post('/adduser',  async (req, res) => {

    try {
        //get user object from body 
        let userParam = req.body;
        // validate
        if (await User.findOne({ email: userParam.email })) {
            res.send( 'email "' + userParam.email + '" already exists');
        }

        const saltRounds = 10;
        userParam.password = await bcrypt.hash(userParam.password, saltRounds);

        const user = new User(userParam);

        // save user
         await user.save();
         res.send("user added successfully ")

    } catch(err) {
        res.status(500).send('server error: '+ err);
    }

});

app.put("/user/:id", async (req, res) => {
    try {
        const id = req.params;
        const updates = req.body;
        const user = await User.findByIdAndUpdate(id, updates, {new: true});

        if (!user) {
            return res.status(404).json({message: `User with id: ${id} wasn't found`});
        }

        res.status(200).json({message: 'User updated successfully!'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/login', async (req, res) => {
    try {
        const userParams = req.body;
        const user = await User.findOne({email: userParams.email});

        if (!user || !(await bcrypt.compare(userParams.password, user.password))) {
            return res.status(404).json({message: 'Invalid email or password.'});
        }

        res.status(200).json({message: 'Logged in successfully!'});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

mongoose.set("strictQuery", false)
mongoose
.connect(mongouri)
.then(() => {
    console.log('connected to MongoDB')
    //listen on specific port 
    app.listen(8000, () => console.log('app started on port 8000'))
}).catch((error) => {
    console.log('cant connect to mongodb'+error)
})