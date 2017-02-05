var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ContentSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model('Content', ContentSchema);
