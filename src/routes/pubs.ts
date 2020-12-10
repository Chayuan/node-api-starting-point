// src/routes/pubs.ts
import { Router, Request, Response } from 'express';
import getModel from '../db/models';

const router = Router();

// renvoie un tableau avec tous les pubs
router.get('/', async (req: Request, res: Response): Promise<void> => {
    const pubModel = getModel('pub');

    // find sans paramètre renvoie l'ensemble des documents de la collection
    const pubs = await pubModel.find();
    res.json(pubs);
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const pubModel = getModel('pub');

        const pub = await pubModel.findById(req.params.id);

        if (!pub) {
            throw (new Error('Pub not found'));
        }

        res.json(pub);
    } catch (err) {
        res.status(404);
        res.json({ error: true, message: `Pub with id ${req.params.id} not found` });
    }
});

export default router;