import express from 'express';
const router = express.Router();

router.use((request: any, response: any, next: () => void) => {
	next();
});

module.exports = router;
