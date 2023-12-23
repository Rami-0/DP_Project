import express from 'express';
import { Request, Response } from 'express';
const router = express.Router();

router.use((request: Request, response: Response, next: () => void) => {
	// console.log('middleware');
	next();
});

module.exports = router;
