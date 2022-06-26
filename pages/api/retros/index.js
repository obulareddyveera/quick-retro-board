import { data } from 'autoprefixer';
import jwt from 'jsonwebtoken';
import prisma from '../../../prisma/client';

export default async function retrosHandler(req, res) {
    const { method } = req;
    console.log('--== 1 Retros ', method);
    switch (method) {
        case "GET":
            try {
                const data = await prisma.retros.findMany();
                res.status(200).json(data);
            } catch (e) {
                res.status(500).json({ error: "Error fetching retros" });
            }
            break;
        case "POST":
            try {
                console.log('--== 2 Retros ', req.body);
                const body = req.body;
                console.log('--== 3 Retros ', body);
                const retros = await prisma.retros.create(
                    {
                        data: {
                            teamName: body.teamName,
                            passCode: body.passCode
                        }
                    }
                );
                console.log('--== 4 Retros ', body, retros);
                const usersData = [];
                body.members.forEach(rec => {
                    usersData.push({ name: rec.name, retros_id: retros.id })
                })
                console.log('--== 5 Retros ', usersData);
                const users = await prisma.users.createMany(
                    {
                        data: usersData
                    }
                )
                // create a jwt token that is valid for 7 days
                const token = jwt.sign(retros, 'Hemitha@789', { expiresIn: '2h' });
                console.log('--== token ', token, users);
                res.json({ token })
            } catch (e) {
                res.status(500).json({ error: "Error fetching retros" });
            }
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
};