// 'use strict';
// // use model
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;


// var GenericSchema = new Schema({
//     created: {
//         type: Date,
//         default: Date.now
//     },
//     updated: {
//         type: Date
//     },
//     createby: {
//         _id: {
//             type: String
//         },
//         username: {
//             type: String
//         },
//         displayname: {
//             type: String
//         }
//     },
//     updateby: {
//         _id: {
//             type: String
//         },
//         username: {
//             type: String
//         },
//         displayname: {
//             type: String
//         }
//     }
// }, { strict: false });
// GenericSchema.pre('save', function (next) {
//     let Generic = this;
//     const model = mongoose.model("Generic", GenericSchema);
//     if (Generic.isNew) {
//         // create
//         next();
//     } else {
//         // update
//         Generic.updated = new Date();
//         next();
//     }


// })
// module.exports = GenericSchema;

'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var GenericSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
}, { strict: false });
GenericSchema.pre('save', function (next) {
    let Generic = this;
    const model = mongoose.model("Generic", GenericSchema);
    if (Generic.isNew) {
        // create
        next();
    } else {
        // update
        Generic.updated = new Date();
        next();
    }


});
GenericSchema.method('transform', function () {
    var obj = this.toObject();
    
    //Rename fields
    obj.id = obj._id;
    // delete obj._id;

    return obj;
});
module.exports = GenericSchema;