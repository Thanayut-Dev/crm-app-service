// 'use strict';
// var controller = require('../controllers/controller'),
//     mq = require('../../core/controllers/rabbitmq'),
//     policy = require('../policy/policy');
// module.exports = function (app) {
//     var url = '/api/:moduleName';
//     var urlWithParam = '/api/:moduleName/:genericId';
//     app.route(url).all(policy.isAllowed)
//         .get(controller.getList)
//         .post(controller.create);

//     app.route(urlWithParam).all(policy.isAllowed)
//         .get(controller.read)
//         .put(controller.update)
//         .delete(controller.delete);

//     app.param('moduleName', (req, res, next, moduleName) => {
//         // console.log(moduleName);
//         req.moduleName = moduleName;
//         next();
//     });
//     app.param('genericId', controller.getByID);

//     /**
//      * Message Queue
//      * exchange : ชื่อเครือข่ายไปรษณีย์  เช่น casan
//      * qname : ชื่อสถานีย่อย สาขา
//      * keymsg : ชื่อผู้รับ
//      */
//     // mq.consume('exchange', 'qname', 'keymsg', (msg)=>{
//     //     console.log(JSON.parse(msg.content));

//     // });
// }

'use strict';
var controller = require('../controllers/controller'),
    mq = require('../../core/controllers/rabbitmq'),
    policy = require('../policy/policy');
module.exports = function (app) {
    var url = '/api/:moduleName';
    var urlWithParam = '/api/:moduleName/:genericId';

    // app.route('/api/layouts')
    //     .get((req, res, next) => { req.moduleName = 'layouts' }
    //         , controller.getList)

    app.route('/api/lov-:moduleName').all(policy.isAllowed)
        .get(controller.lov)

    app.route(url).all(policy.isAllowed)
        .get(controller.getContactList, controller.getCustomerList, controller.getList)
        .post(controller.gendocno, controller.getHdr, controller.getDtl, controller.create);

    app.route(urlWithParam).all(policy.isAllowed)
        .get(controller.getContactList, controller.getCustomerList, controller.read)
        .put(controller.update)
        .delete(controller.delete);


    app.param('moduleName', controller.getModule);
    app.param('genericId', controller.getByID);

    /**
     * Message Queue
     * exchange : ชื่อเครือข่ายไปรษณีย์  เช่น casan
     * qname : ชื่อสถานีย่อย สาขา
     * keymsg : ชื่อผู้รับ
     */
    // mq.consume('exchange', 'qname', 'keymsg', (msg)=>{
    //     console.log(JSON.parse(msg.content));

    // });
}