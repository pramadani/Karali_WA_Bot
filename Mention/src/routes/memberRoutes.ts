import express from 'express';
import { Member } from '../models/Member';

const router = express.Router();

router.post('/create/:mention_id', async (req, res) => {
    const { mention_id } = req.params;
    const data = req.body;

    const newMember = await Member.create({ phone_number: data.phone_number, mention_id: Number(mention_id) });
    res.status(201).send({
        message: 'Member added to mention',
        member: {
            id: newMember.id,
            phone_number: newMember.phone_number,
        },
    });
});

router.get('/all/:mention_id', async (req, res) => {
    const { mention_id } = req.params;
    const members = await Member.findAll({ where: { mention_id: Number(mention_id) } });

    const result = members.map(member => ({
        id: member.id,
        phone_number: member.phone_number,
    }));

    res.send(result);
});

router.get('/id/:phone_number', async (req, res) => {
    const { phone_number } = req.params;
    const member = await Member.findOne({ where: { phone_number } });

    if (member) {
        res.status(200).send({ id: member.id });
    } else {
        res.status(404).send({ message: 'Member not found' });
    }
});

router.delete('/remove/:member_id', async (req, res) => {
    const { member_id } = req.params;
    const member = await Member.findByPk(member_id);

    if (member) {
        await member.destroy();
        res.send({ message: 'Member deleted successfully' });
    } else {
        res.status(404).send({ message: 'Member not found' });
    }
});

export default router;
