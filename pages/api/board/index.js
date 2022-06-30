import { data } from 'autoprefixer';
import jwt from 'jsonwebtoken';
import prisma from '../../../prisma/client';

export default async function retrosHandler(req, res) {
    const { method } = req;
    switch (method) {
        case "GET":
            try {
                const conditions = {
                    retroId: {
                        equals: parseInt(req.query.retrosId)
                    }
                }
                if (req.query.categoryId) {
                    conditions.categoryId = {
                        equals: parseInt(req.query.categoryId)
                    }
                }
                const data = await prisma.board.findMany({
                    where: conditions
                });
                res.status(200).json(data);
            } catch (e) {
                res.status(500).json({ error: "Error fetching retros" });
            }
            break;
        case "POST":
            try {
                const body = req.body;
                const board = await prisma.board.create(
                    {
                        data: body
                    }
                );
                res.json(board)
            } catch (e) {
                res.status(500).json({ error: "Error fetching retros" });
            }
            break;
        case "PUT":
                try {
                    const body = req.body;
                    const board = await prisma.board.update({
                        where: {
                            id: body.id,
                        },
                        data: {
                            commentText: body.commentText,
                        },
                    })

                    res.json(board)
                } catch (e) {
                    res.status(500).json({ error: "Error fetching retros" });
                }
                break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
};