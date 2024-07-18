import express from "express";
var router = express.Router();

router.get('/chat', function(req, res, next) {
    res.send('API is working properly');
});

export default router