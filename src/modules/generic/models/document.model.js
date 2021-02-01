var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
 
var DcoumentSchema = new Schema({
  prefix: { type: String, required: true },
  count:  { type: Number, required: true }
});
 
// mongoose.model('Document', DcoumentSchema);
module.exports = DcoumentSchema;