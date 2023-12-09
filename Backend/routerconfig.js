const express = require('express');
const router = express.Router();

router.use((request, response, next) => {
	console.error('middleware');
	next();
});

module.exports = router;
