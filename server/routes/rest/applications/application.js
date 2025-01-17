const models = require('../../../models');
const sha256 = require('sha256');
const app = require('../../../app');

async function getApplications(req, res) {
    try {
        const resp = await models.application.findAll({
            attributes: {
                include: [[models.Sequelize.fn("COUNT", models.Sequelize.col("requests.id")), "requestCount"]]
            },
            group: ['application.id'],
            order: [
                ['startTime', 'DESC']
            ],
            include: [
                {
                    model: models.user,
                    attributes: {
                        exclude: ['password']
                    }
                },
                {
                    model: models.request,
                    attributes: []
                }
            ],
        });

        res.send(resp);
    }
    catch (err) {
        //bad request
        console.log(err);
        res.status(400).send({
            result: false,
            msg: err.toString()
        });
    }
}

async function getApplications_pagination(req, res) {
    const pageNum = req.query.page;
    const limit = 8;
    const offset = limit * (parseInt(pageNum) - 1);
    try {
        let resp = await models.application.findAll({
            group: ['application.id'],
            order: [
                ['startTime', 'DESC']
            ],
            attributes: {
                 include: [[models.Sequelize.fn("COUNT", models.Sequelize.col("requests.id")), "requestCount"]]
            },
            include: [
                {
                    model: models.user,
                    attributes: {
                        exclude: ['password']
                    }
                },
                {
                    model: models.request,
                    attributes: []
                }
            ],
          

        });
        resp=resp.filter((app, idx) => (offset <= idx && idx <= offset + limit - 1));        
        res.send(resp);
    }
    
    catch (err) {
        //bad request
        console.log(err);
        res.status(400).send({
            result: false,
            msg: err.toString()
        });
    }
}

async function getApplication(req, res) {
    try {
        //pid: 받아온 id 파라미터
        const pid = req.params.id;

        const resp = await models.application.findOne({
            where: {
                id: pid
            },
            include: [
                {
                    model: models.request
                }
            ]
        });
        res.send(resp);
    }
    catch (err) {
        //bad request
        console.log(err);
        res.status(400).send({
            result: false,
            msg: err.toString()
        });
    }
}
async function upsertApp(req, res) {
    try {
        req.body.userId = req.session.user.id;
        await models.application.upsert({
            title: req.body.title,
            decription: req.body.description,
            startTime: req.body.startTime,
            openTime: req.body.openTime,
            maxNum: req.body.maxNum,
            userId: req.body.userId,
            poster: req.file.filename
        })
 
        res.send({ result: req.file });
    }
    catch (err) {
        // bad request
        console.log(err);
        res.status(400).send({
            result: false,
            msg: err.toString()
        });
    }
}

async function deleteApp(req, res) {
    try {
        await models.application.destroy({
            where: {
                id: req.params.id
            }
        })

        res.send({ result: true });
    }
    catch (err) {
        //bad request
        console.log(err);
        res.status(400).send({
            result: false,
            msg: err.toString()
        });
    }
}

module.exports = {
    getApplications_pagination,
    getApplications,
    getApplication,
    upsertApp,
    deleteApp
};