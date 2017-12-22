const express = require('express');
const router = express.Router();
const mongo = require("../mongoAPI");
const logger = require("../logger");

mongo.connect()
    .then(() => {
        router.post('/quizResponse', (req, res) => {
            const quizResponse = req.body;
            quizResponse.timestamp = new Date();
            logger.info("quiz response: ", quizResponse);
            mongo.saveQuizResponse(quizResponse);
            res.send({});
        });

        router.get('/quizdata', (req, res) => {
            mongo.getQuizData()
                .then(quizData => res.send(quizData));
        });

        router.get('/quiz', (req, res) => {
            mongo.getQuizData()
                .then(quizData => res.send(quizData.map(quiz => {
                    return {name: quiz.name, numberOfItems: quiz.quizItems ? quiz.quizItems.length : 0}
                })));
        });

    })
    .catch(error => {
        logger.error(error);
        throw error;
    });


module.exports = router;