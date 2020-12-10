import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import getModel from '../db/models';
const router = Router();

// renvoie un tableau avec tous les pubs
router.get('/', async (req: Request, res: Response): Promise<void> => {
    const barathonModel = getModel('barathon');

    // find sans paramètre renvoie l'ensemble des documents de la collection
    const barathons = await barathonModel.find();
    res.json(barathons);
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        console.log(req.body.name);
        const barathonModel = getModel('barathon');
        // validation du format des données
        await barathonModel.validate(req.body);
        // création du model
        const barathon = new barathonModel(req.body);
        // inserted
        const insertedBarathon = await barathon.save();
        res.json(insertedBarathon);
    } catch (err) {
        console.log(err);
        if (err instanceof mongoose.Error.ValidationError) {
            res.status(400);
            res.json({ error: true, message: 'Bad request' });
        } else {
            res.status(500);
            res.json({ error: true, message: 'Server Error' });
        }
    }
});

export default router;