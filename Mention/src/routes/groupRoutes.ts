import express from 'express';
import { Group } from '../models/Group';

const router = express.Router();

router.get('/id/:name', async (req, res) => {
    const { name } = req.params;
    const group = await Group.findOne({ where: { name } });

    if (group) {
        res.status(200).json({ id: group.id });
    }

    const groupId = await createGroup(name);
    res.status(201).json({ id: groupId });
});

async function createGroup(name: string) {
    const newGroup = await Group.create({ name });
    return newGroup.id;
}

export default router;