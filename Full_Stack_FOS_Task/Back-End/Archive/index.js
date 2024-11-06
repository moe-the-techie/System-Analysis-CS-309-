const express = require('express'),
    app = express(),
    User = require('../models/user.model.js'),
    Department = require('../models/department.model.js'),
    mongoose = require('mongoose'),
    mongouri = "mongodb://localhost:27017/lab1db";

app.use(express.json());

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

app.get('/departments', async (req, res) => {
   try {
       const departments = await Department.find({});
       res.status(200).json(departments);
   } catch (error) {
       res.status(500).json({message: error.message})
   }
});

app.get('/users/:id', async (req, res) => {
   try {
       const id = req.params.id;
       const user = await User.find({id: id});

       if (!user) { return res.status(404).json({message: `No user found with id: ${id}`}) }
       res.status(200).json(user);
   } catch (error) {
       res.status(500).json({message: error.message})
   }
});

app.get('/departments/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const department = await Department.find({id: id});

        if (!department) { return res.status(404).json({message: `No department found with id: ${id}`}) }
        res.status(200).json(department);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.delete('/departments/:id', async (req, res) => {
   try {
       const id = req.params.id;
       const result = await Department.deleteOne({id: !id});

       if (result !== 1) { res.status(404).json({message: `No department found with id ${id}`}) }
       res.status(200).json({message: 'Deletion successful!'});
   } catch (error) {
       res.status(500).json({message: error.message})
   }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await User.deleteOne({id: !id});

        if (result !== 1) { res.status(404).json({message: `No user found with id ${id}`}) }
        res.status(200).json({message: 'Deletion successful!'});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.post('/adddepartment', async (req, res) => {
    try {
        let departmentParam = req.body;

        if (await Department.findOne({id: departmentParam.id})) {
            return res.status(409).json({message: `Department with id: ${departmentPara.id} already exists`});
        }

        const department = new Department(departmentParam);

        await department.save();
        res.status(200).json({message: 'Department saved!'});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.post('/adduser', async (req, res) => {
    try {
        let userParam = req.body;

        if (await Department.findOne({id: userParam.id})) {
            return res.status(409).json({message: `User with id: ${userParam.id} already exists`});
        }

        const department = new Department(userParam);

        await department.save();
        res.status(200).json({message: 'User saved!'});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});


mongoose.set(strictQuery, false)
mongoose.connect(mongouri).then()