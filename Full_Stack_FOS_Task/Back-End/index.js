const express = require("express")

// app service 
const app = express()
const cors = require('cors');
app.use(cors());
app.use(express.json())
let users = [
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
let departments = [
	{
		"id": "1",
		"name": "Ali",
		"description": "0111111",
		"link": "ali@gmail.com"
	},
	{
		"id": "2",
		"name": "mohamed",
		"description": "02222222",
		"link": "mohamed@gmail.com"
	},
	{
		"id": "3",
		"name": "Ahmed",
		"description": "0333333333333",
		"link": "Ahmed@gmail.com"
	}
]

app.get('/', (req, res) => {
	res.send('Hello World, from cs309');
});

app.get('/users', (req, res) => {
	res.json(users);
});
app.get('/departments', (req, res) => {
	res.json(departments);
});

app.get('/user/:id', (req, res) => {

	// req id 
	const id = req.params.id;
	// find by id in users 
	const user = users.find((u) => u.id === id);

	if (user) {
		res.json(user);
	}
	else {
		res.status(404).send('user not found');
	}
});


app.delete('/user/:id', (req, res) => {

	// req id 
	const id = req.params.id;
	let old_len = users.length;
	users = users.filter((u) => u.id !== id);
	let new_len = users.length;

	if (new_len === old_len - 1)
		res.send('user deleted 100 100');
});

app.delete('/department/:id', (req, res) => {

	// req id 
	const id = req.params.id;
	let old_len = departments.length;
	departments = departments.filter((u) => u.id !== id);
	let new_len = departments.length;

	if (new_len === old_len - 1)
		res.send('user deleted 100 100');
});

app.post('/adduser', (req, res) => {

	//get user object from body 
	let pram = req.body;
	let user = {
		"name": pram.name,
		"email": pram.email
	}
	// add user to users list 
	// if email already exist should return user already exist
	if (!users.find((e) => { return e.email === req.body.email })) {
		users = [...users, user]
		res.status(200).send('user added 100 100');
	}

	// return success 
});
app.post('/adddepartment', (req, res) => {

	//get user object from body 
	let pram = req.body;
	let department = {
		"name": pram.name,
		"description": pram.description,
		"link": pram.link
	}
	// add user to users list 
	// if email already exist should return user already exist
	if (!departments.find((e) => { return e.email === req.body.email })) {
		departments = [...departments, department]
		res.status(200).send('user added 100 100');
	}

	// return success 
});

app.put('/editdepartment/:id', (req, res) => {
	let pram = req.body;
	let department = {
		"name": pram.name,
		"description": pram.description,
		"link": pram.link
	}
	let foundDepartment = departments.find((e) => { return e.id === req.params.id })
	if (!foundDepartment)
		res.status(404).send('department not found');
	else {
	    departments = departments.map((e) => {if (e.id === req.params.id) return department; else return e;})
		res.status(200).send('department editied 100 100');
	}

});
app.put('/edituser/:id', (req, res) => {
	let pram = req.body;
	let user = {
		"name": pram.name,
		"email": pram.email
	}
	let foundUser = users.find((e) => { return e.id === req.params.id })
	if (!foundUser)
		res.status(404).send('user not found');
	else {
	    users = users.map((e) => {if (e.id === req.params.id) return user; else return e;})
		res.status(200).send('user editied 100 100');
	}

});

//listen on specific port 
app.listen(8000, () => console.log('app started on port 8000'))
