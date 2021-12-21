const expanse = require('../../db/models/expanse/index');
const Expanse = require ('../../db/models/expanse/index');

module.exports.getAllList = (req, res, next) => {
    Expanse.find({}).then(result => {
        res.send({data: result});
    }).catch(err => {
        res.status(500).send(err);
    });
};

module.exports.createNewExpanse = (req, res, next) => {
    const body = req.body;
    const exp = new Expanse({
        reason: body.reason,
        date: body.date,
        exp: body.exp
    });
    exp.save().then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(500).send(err);
    });
};
    
module.exports.changeExpanse = (req, res, next) => {
    const body = req.body;
    const query = {_id: body._id};
        Expanse.updateOne(query,{
            $set: {
                reason: body.reason,
                exp: body.exp
            }
        }).then(result => {
            res.status(200).send(body);
        }).catch(err => {
            res.status(500).send(err);
        });
};
    
module.exports.deleteExpanse = (req, res, next) => {
    const _id = req.query.id;
    const query = {_id: _id};
    Expanse.deleteOne(query).then(result => {
        res.send('Deleted');
    }).catch(err => {
        res.status(500).send(err);
    });
};