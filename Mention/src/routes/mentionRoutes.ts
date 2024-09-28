import express from 'express';
import { Mention } from '../models/Mention';

const router = express.Router();

router.post('/create/:group_id', async (req, res) => {
    const { group_id } = req.params;
    const data = req.body;

    const newMention = await Mention.create({ group_id: Number(group_id), name: data.name });
    res.status(201).send({
        message: 'Mention added',
        mention: {
            id: newMention.id,
            name: newMention.name,
        },
    });
});

router.get('/all/:group_id', async (req, res) => {
    const { group_id } = req.params;
    const mentions = await Mention.findAll({ where: { group_id: Number(group_id) } });

    const result = mentions.map(mention => ({
        id: mention.id,
        name: mention.name,
    }));

    res.send(result);
});

router.get('/id/:name', async (req, res) => {
    const { name } = req.params;
    const mention = await Mention.findOne({ where: { name } });

    if (mention) {
        res.status(200).send({ id: mention.id });
    } else {
        res.status(404).send({ message: 'Mention not found' });
    }
});

router.delete('/remove/:mention_id', async (req, res) => {
    const { mention_id } = req.params;
    const mention = await Mention.findByPk(mention_id);

    if (mention) {
        await mention.destroy(); // This will also delete associated members due to cascade
        res.send({ message: 'Mention and associated members deleted successfully' });
    } else {
        res.status(404).send({ message: 'Mention not found' });
    }
});

router.put('/update/:mention_id', async (req, res) => {
    const { mention_id } = req.params;
    const data = req.body;
    const mention = await Mention.findByPk(mention_id);

    if (mention) {
        mention.name = data.name || mention.name;
        await mention.save();
        res.send({
            message: 'Mention updated successfully',
            mention: {
                id: mention.id,
                name: mention.name,
            },
        });
    } else {
        res.status(404).send({ message: 'Mention not found' });
    }
});

export default router;
