const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');

// require models
const db = require('./models');

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shrouded-citadel-69778';

// initialize express
const app = express();

// configure handlebars
const expressHandlebars = require('express-handlebars');

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// use morgan to log requests
app.use(logger('dev'));
// use express static to keep public folder as statid directory
app.use(express.static('public'));

// connect to mongo db w/ promise
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
    useMongoClient: true
});

// set routes

// GET route to scrape
app.get('/scrape', (req, res) => {
    axios.get('https://www.nytimes.com/').then((response) => {
        var $ = cheerio.load(response.data);
        
        // grab h2 within article tag
        $('article.story').each(i, element) => {
            var result = {};

            // add text and href of links. save as properties of result.
            result.title = $(this)
                .children('h2.story-heading')
                .children('a')
                .text();
            result.link = $(this)
                .children('h2.story-heading')
                .children('a')
                .attr('href');
            result.summary = $(this)
                .children('p.summary')
                .text();

            db.Article.create(result)
                .then((dbArticle) => {

                })
                .catch((err) => {
                    return res.json(err);
                });
        };

        res.redirect('/');

    });
});

// GET route to get all articles from db
app.get('/', (req,res) => {
    db.Article.find({}).populate('comments')
        .then((data) => {
            res.render('index' { articles: data });
        }).catch((err) => {
            res.json(err);
        });
});

// GET route to get specific article by ID
app.get('/articles/:id', (req, res) => {
    db.Article.findById(req.params.id).populate('comments')
        .then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err);
        });
});

// POST to save article's note
app.post('/articles/:id', (req, res) => {
    db.Comments.create(req.body)
        .then((dbComment) => {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: {comments: dbComment}})
                .then((dbRes) => {
                    res.redirect('/');
                });
        });
});

// POST to delete article's note
app.post('/articles/delete/:id', (req, res) => {
    db.Comments.remove({ _id: req.params.id })
        .then((dbRemove) => {
            res.json(dbRemove);
        });
});

// POST to save article
app.post('/articles/save/:id', (req, res) => {
    db.Article.findByIdAndUpdate({ _id: req.params.id }, { saved: true })
        .then((dbRes) => {
            res.redirect('/');
        });
});

// POST to unsave article
app.post('/articles/unsave/:id', (req, res) => {
    db.Article.findByIdAndUpdate({ _id: req.params.id }, { saved: false })
        .then((dbRes) => {
            res.redirect('/');
        });
});

// GET to get all saved articles
app.get('/savedarticles', (req, res) => {
    db.Article.find({ saved: true }).populate('comments')
        .then((data) => {
            res.render('saved', { articles: data });
        }).catch((err) => {
            res.json(err);
        });
});

// starting the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});