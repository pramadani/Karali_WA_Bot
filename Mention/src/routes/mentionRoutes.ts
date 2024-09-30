import express from 'express';
import { Mention } from '../models/Mention';
import { Group } from '../models/Group';

const router = express.Router();

router.post('/create/:group_name/:name', async (req, res) => {
    const { group_name, name } = req.params;
    const group = await Group.findOne({ where: { name: group_name } });
    const existingMention = await Mention.findOne({ where: { group_id: group!.id, name } });
    if (existingMention) { res.status(200).send('Mention already exists'); return }
    await Mention.create({ group_id: group!.id, name });
    res.status(201).send('Mention added');
});

router.get('/all/:group_name', async (req, res) => {
    const { group_name } = req.params;
    const group = await Group.findOne({ where: { name: group_name } });
    const mentions = await Mention.findAll({ where: { group_id: group!.id } });
    const result = mentions.map(mention => mention.name);
    res.send(result); 
});

router.delete('/remove/:group_name/:mention_name', async (req, res) => {
    const { group_name, mention_name } = req.params;
    const group = await Group.findOne({ where: { name: group_name } });
    const mention = await Mention.findOne({ where: { name: mention_name, group_id: group!.id } });
    await mention!.destroy();
    res.send('Mention and associated members deleted successfully');
});

router.put('/update/:group_name/:mention_name/:new_mention_name', async (req, res) => {
    const { group_name, mention_name, new_mention_name } = req.params;
    const group = await Group.findOne({ where: { name: group_name } });
    const mention = await Mention.findOne({ where: { name: mention_name, group_id: group!.id } });
    mention!.name = new_mention_name;
    await mention!.save();
    res.send('Mention updated successfully');
});

export default router;