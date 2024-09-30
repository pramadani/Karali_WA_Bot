import express from 'express';
import { Group } from '../models/Group';

const router = express.Router();

router.post('/create/:name', async (req, res) => {
    const { name } = req.params;
    const existingGroup = await Group.findOne({ where: { name } });
    if (existingGroup) { res.status(200).send("Group already exists"); return }
    await Group.create({ name });
    res.status(201).send("Group Created");
});

router.get('/all', async (req, res) => {
    const groups = await Group.findAll();
    const groupNames = groups.map(group => group.name);
    res.send(groupNames);
});

export default router;