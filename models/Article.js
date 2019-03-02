const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ArticleSchema = new Schema({

    title: {
        type: String,
        unique: true,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    summary: {
        type: String
      },

    saved: {
        type: Boolean,
        default: false
      },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }]
    });

    // create model from schema with mongoose model method
    var Article = mongoose.model("Article", ArticleSchema);

    // export article model
    module.exports = Article;