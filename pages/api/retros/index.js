import { data } from 'autoprefixer';
import jwt from 'jsonwebtoken';
import prisma from '../../../prisma/client';

export default async function retrosHandler(req, res) {
    const { method } = req;
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
                const body = req.body;
                const retros = await prisma.retros.create(
                    {
                        data: {
                            teamName: body.teamName,
                            passCode: body.passCode,
                            isActive: true
                        }
                    }
                );
                const token = jwt.sign(retros, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
                res.json({ retros, token })
            } catch (e) {
                res.status(500).json({ error: "Error fetching retros" });
            }
            break;
        case "PUT":
            try {
                const body = req.body;
                const { passCode } = body;
                const retrosEntity = await prisma.retros.findMany({
                    where: {
                        passCode: passCode
                    }
                });

                if (retrosEntity && retrosEntity.length > 0) {
                    const retros = await prisma.retros.update({
                        where: {
                            id: retrosEntity[0].id,
                        },
                        data: {
                            isActive: true,
                        },
                    })

                    const token = jwt.sign(retros, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
                    res.json({ retros, token })
                } else {
                    res.status(200).json({
                        status: 404,
                        message: 'Invalied passCode'
                    });
                }

            } catch (e) {
                res.status(500).json({ error: "Error fetching retros", exception: e });
            }
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
};