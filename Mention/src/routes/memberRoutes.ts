import express from 'express';
import { Member } from '../models/Member';
import { Group } from '../models/Group';
import { Mention } from '../models/Mention';

const router = express.Router();

router.post('/create/:group_name/:mention_name/:phone_number', async (req, res) => {
    const { group_name, mention_name, phone_number } = req.params;
    const group = await Group.findOne({ where: { name: group_name } });
    const mention = await Mention.findOne({ where: { name: mention_name, group_id: group!.id } });
    const existingMember = await Member.findOne({ where: { phone_number, mention_id: mention!.id } });
    if (existingMember) { res.status(200).send('Member already exists in this mention'); return }
    await Member.create({ phone_number, mention_id: mention!.id });
    res.status(201).send('Member added to mention');
});

router.get('/all/:group_name/:mention_name', async (req, res) => {
    const { group_name, mention_name } = req.params;
    const group = await Group.findOne({ where: { name: group_name } });
    const mention = await Mention.findOne({ where: { name: mention_name, group_id: group!.id } });
    const members = await Member.findAll({ where: { mention_id: mention!.id } });
    const phoneNumbers = members.map(member => member.phone_number);
    res.send(phoneNumbers);
});

router.delete('/remove/:group_name/:mention_name/:phone_number', async (req, res) => {
    const { group_name, mention_name, phone_number } = req.params;
    const group = await Group.findOne({ where: { name: group_name } });
    const mention = await Mention.findOne({ where: { name: mention_name, group_id: group!.id } });
    const member = await Member.findOne({ where: { phone_number: phone_number, mention_id: mention!.id } });
    await member!.destroy();
    res.send('Member deleted successfully');
});

export default router;