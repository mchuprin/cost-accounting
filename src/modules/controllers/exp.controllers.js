const expanse = require('../../db/models/expanse/index');
const Expanse = require ('../../db/models/expanse/index');

module.exports.getAllList = (req, res, next) => {
    Expanse.find().then(result => {
        res.send({data: result});
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
    });
};
    
module.exports.changeExpanse = (req, res, next) => {
    const body = req.body;
    const filter = {_id: body._id};
        Expanse.updateOne(filter,{
            $set: {
                reason: body.reason,
                exp: body.exp
            }
        }).then(result => {
            res.status(200).send(body);
        });
    
    };
    
module.exports.deleteExpanse = (req, res, next) => {
    const _id = req.query.id;
    const filter = {_id: _id};
    Expanse.deleteOne(filter).then(result => {
        res.send('Deleted');
    });
};