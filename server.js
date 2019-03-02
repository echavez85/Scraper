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
const handlebars = require('express-handlebars');


