import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/register', (req: Request, res: Response) => {
    res.render('register');
});

// You can add more routes for other views here
// Example: router.get('/login', (req: Request, res: Response) => { res.render('login'); });

export default router;