import express from 'express';
import { Request, Response } from 'express';
const router = express.Router();

router.use((request: Request, response: Response, next: () => void) => {
	next();
});

module.exports = router;
