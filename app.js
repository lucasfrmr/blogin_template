const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

//Check connection
db.once('open', () => {
	console.log('Connected to MongoDB');
});

//Check for DB errors
db.on('error', (err) => {
	console.log('err');
});

//init app
const app = express();

//Bring in models
let Post = require('./models/post');

// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', "pug");

//Body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// home route
app.get('/', (req, res) => {
	Post.find({}, (err, posts) => {
		if (err){
			console.log(err);
		} else {
			res.render('index', {
				title: "Posts",
				posts: posts
			});
		}
	});
});

//Get Single Post
app.get('/post/:id', (req, res) => {
	Post.findById(req.params.id, (err, post) => {
		res.render('post', {
			post:post
		});
	});
});

//Add Route
// app.get('/posts/add', (req, res) => {
// 	res.render('add_post', {
// 		title: "Add Post"
// 	});
// });

//Add Submit post route
app.post('/posts/add', (req, res) => {
	let post = new Post();
	post.title = req.body.title;
	post.author = req.body.author;
	post.body = req.body.body;

	post.save((err) => {
		if(err){
			console.log(err);
			return;
		} else {
			res.redirect('/');
		}
	});
;
});

//start server
app.listen('3000',  () => {
	console.log('Server started on port 3000...');
});