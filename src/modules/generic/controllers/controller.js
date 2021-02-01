'use strict';
const { result } = require('lodash');
var mongoose = require('mongoose'),
    moment = require('moment'),
    errorHandler = require('../../core/controllers/errors.server.controller'),
    _ = require('lodash');

var GenericSchema = require('../models/model');
var DocumentSchema = require('../models/document.model');

exports.getModule = function (req, res, next, moduleName) {
    req.moduleName = moduleName;
    next();
}

exports.getContactList = function (req, res, next) {
    const Model = mongoose.model('contacts', GenericSchema);
    switch (req.moduleName) {
        case 'deals':
            Model.find(function (err, datas) {
                if (err) {
                    return res.status(400).send(errorHandler.getErrorMessage(err));
                } else {
                    req.contacts = datas;
                    next();
                };
            });
            break;
        case 'notes':
            Model.find(function (err, datas) {
                if (err) {
                    return res.status(400).send(errorHandler.getErrorMessage(err));
                } else {
                    req.contacts = datas;
                    next();
                };
            });
            break;
        case 'calls':
            Model.find(function (err, datas) {
                if (err) {
                    return res.status(400).send(errorHandler.getErrorMessage(err));
                } else {
                    req.contacts = datas;
                    next();
                };
            });
            break;
        case 'tasks':
            Model.find(function (err, datas) {
                if (err) {
                    return res.status(400).send(errorHandler.getErrorMessage(err));
                } else {
                    req.contacts = datas;
                    next();
                };
            });
            break;
        case 'events':
            Model.find(function (err, datas) {
                if (err) {
                    return res.status(400).send(errorHandler.getErrorMessage(err));
                } else {
                    req.contacts = datas;
                    next();
                };
            });
            break;
        default:
            next();
            break;
    }
}

exports.getCustomerList = function (req, res, next) {
    const Model = mongoose.model('customers', GenericSchema);
    switch (req.moduleName) {
        case 'contacts':
            Model.find(function (err, datas) {
                if (err) {
                    return res.status(400).send(errorHandler.getErrorMessage(err));
                } else {
                    req.customers = datas;
                    next();
                };
            });
            break;
        case 'deals':
            Model.find(function (err, datas) {
                if (err) {
                    return res.status(400).send(errorHandler.getErrorMessage(err));
                } else {
                    req.customers = datas;
                    next();
                };
            });
            break;
        case 'notes':
            Model.find(function (err, datas) {
                if (err) {
                    return res.status(400).send(errorHandler.getErrorMessage(err));
                } else {
                    req.customers = datas;
                    next();
                };
            });
            break;
        case 'calls':
            Model.find(function (err, datas) {
                if (err) {
                    return res.status(400).send(errorHandler.getErrorMessage(err));
                } else {
                    req.customers = datas;
                    next();
                };
            });
            break;
        case 'tasks':
            Model.find(function (err, datas) {
                if (err) {
                    return res.status(400).send(errorHandler.getErrorMessage(err));
                } else {
                    req.customers = datas;
                    next();
                };
            });
            break;
        case 'events':
            Model.find(function (err, datas) {
                if (err) {
                    return res.status(400).send(errorHandler.getErrorMessage(err));
                } else {
                    req.customers = datas;
                    next();
                };
            });
            break;
        default:
            next();
            break;
    }
}

exports.getList = function (req, res) {
    const Model = mongoose.model(req.moduleName, GenericSchema);
    let query = {};
    if (req.query.relateId) {
        switch (req.moduleName) {
            case 'deals':
                query = {
                    $or: [{ dealContact: req.query.relateId }, { dealCustomer: req.query.relateId }]
                };
                break;
            case 'notes':
                query = {
                    $or: [{ relateToID: req.query.relateId }, { deal: req.query.relateId }]
                };
                break;
            case 'tasks':
                query = {
                    relateToID: req.query.relateId
                };
                break;
            case 'events':
                query = {
                    relateToID: req.query.relateId
                };
                break;
            case 'calls':
                query = {
                    relateToID: req.query.relateId
                };
                break;
            case 'fm-mk-06':
                query = {
                    deal: req.query.relateId
                };
                break;
            case 'fm-mk-06-dtl':
                query = {
                    hdr: req.query.relateId
                };
                break;
            case 'fm-mk-13':
                query = {
                    deal: req.query.relateId
                };
                break;
            case 'fm-mk-13-dtl':
                query = {
                    hdr: req.query.relateId
                };
                break;
            case 'fm-mk-11':
                query = {
                    deal: req.query.relateId
                };
                break;
            case 'fm-mk-11-dtl':
                query = {
                    hdr: req.query.relateId
                };
                break;
            case 'so':
                query = {
                    deal: req.query.relateId
                };
                break;
            case 'so-dtl':
                query = {
                    hdr: req.query.relateId
                };
                break;
            case 'boms':
                query = {
                    hdr: req.query.relateId
                };
                break;
            case 'routes':
                query = {
                    hdr: req.query.relateId
                };
                break;
            case 'spec-result':
                query = {
                    hdr: req.query.relateId
                };
            default:
                break;
        }
    }
    Model.find(query, function (err, datas) {
        if (err) {
            return res.status(400).send(errorHandler.getErrorMessage(err));
        } else {
            let result = [];
            datas.forEach(data => {
                let _data = data.transform();
                switch (req.moduleName) {
                    case 'deals':
                        if (_data.dealContact) {
                            _data.dealContact = req.contacts.filter(cust => cust.id === _data.dealContact)[0].transform().contactName;
                        }
                        if (_data.dealCustomer) {
                            _data.dealCustomer = req.customers.filter(cust => cust.id === _data.dealCustomer)[0].transform().customerName;
                        }
                        break;
                    case 'contacts':
                        if (_data.contactCompany) {
                            _data.contactCompany = req.customers.filter(cust => cust.id === _data.contactCompany)[0].transform().customerName;
                        }
                        break;
                    case 'notes': // No havve join to deals with dealID
                        if (_data.relateToID) {
                            let cust = req.customers.filter(cust => cust.id === _data.relateToID)[0];
                            if (cust) {
                                _data.relateToID = cust.transform().customerName;
                            } else {
                                _data.relateToID = req.contacts.filter(cust => cust.id === _data.relateToID)[0].transform().contactName;
                            }
                        }
                        break;
                    case 'calls':
                        if (_data.relateToID) {
                            let cust = req.customers.filter(cust => cust.id === _data.relateToID)[0];
                            if (cust) {
                                _data.relateToID = cust.transform().customerName;
                            } else {
                                _data.relateToID = req.contacts.filter(cust => cust.id === _data.relateToID)[0].transform().contactName;
                            }
                        }
                        if (_data.activityDate) {
                            _data.activityDate = moment(_data.activityDate).format('DD/MM/YYYY');
                        }
                        break;
                    case 'tasks':
                        if (_data.relateToID) {
                            let cust = req.customers.filter(cust => cust.id === _data.relateToID)[0];
                            if (cust) {
                                _data.relateToID = cust.transform().customerName;
                            } else {
                                _data.relateToID = req.contacts.filter(cust => cust.id === _data.relateToID)[0].transform().contactName;
                            }

                        }
                        if (_data.activityDate) {
                            _data.activityDate = moment(_data.activityDate).format('DD/MM/YYYY');
                        }
                        break;
                    case 'events':
                        if (_data.relateToID) {
                            let cust = req.customers.filter(cust => cust.id === _data.relateToID)[0];
                            if (cust) {
                                _data.relateToID = cust.transform().customerName;
                            } else {
                                _data.relateToID = req.contacts.filter(cust => cust.id === _data.relateToID)[0].transform().contactName;
                            }

                        }
                        if (_data.activityDate) {
                            _data.activityDate = moment(_data.activityDate).format('DD/MM/YYYY');
                        }
                        break;
                    case 'fm-mk-06':
                        if (_data.docDate) {
                            _data.docDate = moment(_data.docDate).format('DD/MM/YYYY');
                        }
                        if (_data.dueDate) {
                            _data.dueDate = moment(_data.dueDate).format('DD/MM/YYYY');
                        }
                        break;
                    case 'fm-mk-13':
                        if (_data.docDate) {
                            _data.docDate = moment(_data.docDate).format('DD/MM/YYYY');
                        }
                        break;
                    case 'fm-mk-11':
                        if (_data.docDate) {
                            _data.docDate = moment(_data.docDate).format('DD/MM/YYYY');
                        }
                        break;
                    case 'so': //docDate
                        if (_data.docDate) {
                            _data.docDate = moment(_data.docDate).format('DD/MM/YYYY');
                        }
                        break;
                    default:
                        break;
                }
                // console.log(_data);
                _data.createby = _data.createby ? _data.createby.firstName + ' ' + _data.createby.lastName : '';
                _data.updateby = _data.updateby ? _data.updateby.firstName + ' ' + _data.updateby.lastName : '';
                result.push(_data);
            });
            res.jsonp(result);
        };
    });
};

const nextId = function (docType, docDate, callback) {
    function prefix(date) {
        return parseInt(moment(date).format('YYYYMM'));
    }
    const Document = mongoose.model('Document', DocumentSchema);
    Document.findOneAndUpdate(
        { prefix: `${docType}-${prefix(new Date(docDate))}` },
        { $inc: { count: 1 } },
        { upsert: true },
        function (err, idDoc) {
            callback(err, idDoc);
        });
};

exports.gendocno = function (req, res, next) {
    switch (req.moduleName) {
        case 'fm-mk-06':
            nextId('MK06', req.body.docDate, (err, docNo) => {
                if (err) {
                    return res.status(400).send(errorHandler.getErrorMessage(err));
                } else {
                    if (docNo) {
                        req.body.docNo = `${docNo.prefix}-${(docNo.count + 1).toString().padStart(4, '0')}`;
                    } else {
                        req.body.docNo = `MK06-${parseInt(moment(new Date(req.body.docDate)).format('YYYYMM'))}-0001`;
                    }

                    next();
                }
            })
            break;
        case 'fm-mk-13':
            nextId('MK11', req.body.docDate, (err, docNo) => {
                if (err) {
                    return res.status(400).send(errorHandler.getErrorMessage(err));
                } else {
                    if (docNo) {
                        req.body.docNo = `${docNo.prefix}-${(docNo.count + 1).toString().padStart(4, '0')}`;
                    } else {
                        req.body.docNo = `MK13-${parseInt(moment(new Date(req.body.docDate)).format('YYYYMM'))}-0001`;
                    }

                    next();
                }
            })
            break;
        case 'fm-mk-11':
            nextId('QT', req.body.docDate, (err, docNo) => {
                if (err) {
                    return res.status(400).send(errorHandler.getErrorMessage(err));
                } else {
                    if (docNo) {
                        req.body.docNo = `${docNo.prefix}-${(docNo.count + 1).toString().padStart(4, '0')}`;
                    } else {
                        req.body.docNo = `QT-${parseInt(moment(new Date(req.body.docDate)).format('YYYYMM'))}-0001`;
                    }

                    next();
                }
            })
            break;
        case 'so':
            nextId('SO', req.body.docDate, (err, docNo) => {
                if (err) {
                    return res.status(400).send(errorHandler.getErrorMessage(err));
                } else {
                    if (docNo) {
                        req.body.docNo = `${docNo.prefix}-${(docNo.count + 1).toString().padStart(4, '0')}`;
                    } else {
                        req.body.docNo = `SO-${parseInt(moment(new Date(req.body.docDate)).format('YYYYMM'))}-0001`;
                    }

                    next();
                }
            })
            break;
        default:
            next();
            break;
    }

}

exports.getHdr = function (req, res, next) {
    req.body.refDocsID = req.body.refDocs;
    let query = {};
    switch (req.moduleName) {
        case 'fm-mk-13':
            const MK06DTL = mongoose.model("fm-mk-06", GenericSchema);
            query = { _id: req.body.refDocs };
            MK06DTL.find(query, function (err, data) {
                req.body.refDocs = data;
                next();
            });
            break;
        case 'fm-mk-11':
            const MK13DTL = mongoose.model("fm-mk-13", GenericSchema);
            query = { _id: req.body.refDocs };
            MK13DTL.find(query, function (err, data) {
                req.body.refDocs = data;
                next();
            });
            break;
        case 'so':
            const MK11DTL = mongoose.model("fm-mk-11", GenericSchema);
            query = { _id: req.body.refDocs };
            MK11DTL.find(query, function (err, data) {
                req.body.refDocs = data;
                next();
            });
            break;
        default:
            next();
            break;
    }
}

exports.getDtl = function (req, res, next) {
    let query = {};
    switch (req.moduleName) {
        case 'fm-mk-13':
            const MK06DTL = mongoose.model("fm-mk-06-dtls", GenericSchema);
            query = { hdr: { $in: req.body.refDocsID } };
            MK06DTL.find(query, function (err, data) {
                req.body.refDtls = data;
                next();
            });
            break;
        case 'fm-mk-11':
            const MK13DTL = mongoose.model("fm-mk-13-dtls", GenericSchema);
            query = { hdr: { $in: req.body.refDocsID } };
            MK13DTL.find(query, function (err, data) {
                req.body.refDtls = data;
                next();
            });
            break;
        case 'so':
            const MK11DTL = mongoose.model("fm-mk-11-dtls", GenericSchema);
            query = { hdr: { $in: req.body.refDocsID } };
            MK11DTL.find(query, function (err, data) {
                req.body.refDtls = data;
                next();
            });
            break;
        default:
            next();
            break;
    }
}

exports.create = function (req, res) {
    const Model = mongoose.model(req.moduleName, GenericSchema)
    var newGeneric = new Model(req.body);
    newGeneric.createby = req.user;
    newGeneric.save(function (err, data) {
        if (err) {
            return res.status(400).send(errorHandler.getErrorMessage(err));
        } else {
            switch (req.moduleName) {
                case 'fm-mk-13':
                    const MK13DTL = mongoose.model("fm-mk-13-dtls", GenericSchema);
                    MK13DTL.insertMany(req.body.refDtls.map(function (dtl) {
                        const _dtl = dtl.transform();
                        return {
                            hdr: data.transform().id.toString(),
                            bomCode: _dtl.bomCode,
                            bomDesc: _dtl.bomDesc,
                            productColor: _dtl.productColor,
                            productSmell: _dtl.productSmell,
                            productTexture: _dtl.productTexture,
                            productCostPrice: _dtl.productCostPrice,
                            createby: req.user
                        }
                    }));
                    res.jsonp(data.transform());
                    break;
                case 'fm-mk-11':
                    const MK11DTL = mongoose.model("fm-mk-11-dtls", GenericSchema);
                    MK11DTL.insertMany(req.body.refDtls.map(function (dtl) {
                        const _dtl = dtl.transform();
                        return {
                            hdr: data.transform().id.toString(),
                            bomCode: _dtl.bomCode,
                            bomDesc: _dtl.bomDesc,
                            productColor: _dtl.productColor,
                            productSmell: _dtl.productSmell,
                            productTexture: _dtl.productTexture,
                            productCostPrice: _dtl.productCostPrice,
                            createby: req.user
                        }
                    }));
                    res.jsonp(data.transform());
                    break;
                case 'so':
                    const SODTL = mongoose.model("so-dtls", GenericSchema);
                    SODTL.insertMany(req.body.refDtls.map(function (dtl) {
                        const _dtl = dtl.transform();
                        return {
                            hdr: data.transform().id.toString(),
                            bomCode: _dtl.bomCode,
                            bomDesc: _dtl.bomDesc,
                            productColor: _dtl.productColor,
                            productSmell: _dtl.productSmell,
                            productTexture: _dtl.productTexture,
                            productCostPrice: _dtl.productCostPrice,
                            createby: req.user
                        }
                    }));
                    res.jsonp(data.transform());
                    break;
                default:
                    res.jsonp(data.transform());
                    break;
            }

            /**
             * Message Queue
             */
            // mq.publish('exchange', 'keymsg', JSON.stringify(newOrder));
        };
    });
};

exports.getByID = function (req, res, next, id) {
    const Model = mongoose.model(req.moduleName, GenericSchema);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ errorSource: 'nodejs', errorCode: 500, errorrMessage: 'พบข้อผิดพลาด: ID ไม่ถูกต้อง' });
    }

    Model.findById(id, function (err, data) {
        if (err) {
            return res.status(400).send(errorHandler.getErrorMessage(err));
        } else {
            req.data = data ? data : {};
            next();
        };
    });
};

exports.read = function (req, res) {
    let _data = req.data.transform();
    switch (req.moduleName) {
        case 'deals':
            if (_data.dealContact) {
                _data.contact = req.contacts.filter(cust => cust.id === _data.dealContact)[0].transform();
            }
            if (_data.dealCustomer) {
                _data.customer = req.customers.filter(cust => cust.id === _data.dealCustomer)[0].transform();
            }
            break;
        case 'contacts':
            if (_data.contactCompany) {
                _data.customer = req.customers.filter(cust => cust.id === _data.contactCompany)[0].transform();
            }
            break;

        default: //noteRelateID //dealID //relateToID
            break;
    }
    _data.createby = _data.createby ? _data.createby.firstName + ' ' + _data.createby.lastName : '';
    _data.updateby = _data.updateby ? _data.updateby.firstName + ' ' + _data.updateby.lastName : '';
    res.jsonp(_data);
};
exports.update = function (req, res) {
    const Model = mongoose.model(req.moduleName, GenericSchema);
    req.body.updated = new Date();
    req.body.updateby = req.user;
    Model.updateOne({ _id: req.data._id }, req.body, function (err, data) {
        if (err) {
            return res.status(400).send(errorHandler.getErrorMessage(err));
        } else {
            res.jsonp(req.body);
        };
    });
};

exports.delete = function (req, res) {
    req.data.remove(function (err, data) {
        if (err) {
            return res.status(400).send(errorHandler.getErrorMessage(err));
        } else {
            res.jsonp(data.transform());
        };
    });
};

const ValueName = function (moduleName) {
    let result = '';
    if (moduleName.endsWith('ies')) {
        result = moduleName.replace('ies', 'y') + 'Name';
    } else {
        result = moduleName.substring(0, moduleName.length - 1) + 'Name';
    }
    return result;
};

const LovResults = function (moduleName, datas) {
    let result = [];
    const valueName = ValueName(moduleName);
    datas.forEach(data => {
        switch (moduleName) {
            case "companies":
                result.push({ key: data.transform()["companyCode"], value: data.transform()['companyName'] });
                break;

            case "users":
                result.push({ key: data.transform()['_id'], value: data.transform()['firstName'] + ' ' + data.transform()['lastName'] });
                break;

            case "fm-mk-06":
                result.push({ key: data.transform()['_id'], value: data.transform()['docNo'] });
                break;

            case "fm-mk-13":
                result.push({ key: data.transform()['_id'], value: data.transform()['docNo'] });
                break;

            case "fm-mk-11":
                result.push({ key: data.transform()['_id'], value: data.transform()['docNo'] });
                break;



            default:
                result.push({ key: data.transform()['_id'], value: data.transform()[valueName] });
                break;
        }
    });
    return result;
}

exports.lov = function (req, res) {
    const moduleName = req.params.moduleName;
    const Model = mongoose.model(moduleName, GenericSchema);
    let query = {};
    switch (moduleName) {
        case "fm-mk-06":
            query = { status: 'อนุมัติ' };
            break;
        case "fm-mk-13":
            query = { status: 'อนุมัติ' };
            break;
        case "fm-mk-11":
            query = { status: 'อนุมัติ' };
            break;
        default:
            break;
    }
    Model.find(query, function (err, datas) {
        if (err) {
            return res.status(400).send(errorHandler.getErrorMessage(err));
        } else {
            res.jsonp(LovResults(moduleName, datas));
        };
    });
};



