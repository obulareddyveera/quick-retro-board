import prisma from '../../../prisma/client';

export default async function retrosHandler(req, res) {
    const { method } = req;
    const { retrosId, usersId } = req.query
    switch (method) {
        case "GET":
            try {
                const conditions = {}
                if (retrosId) {
                    conditions.retrosId = {
                        equals: parseInt(req.query.retrosId)
                    }
                } else if (usersId) {
                    conditions.id = {
                        equals: parseInt(req.query.usersId)
                    }
                }
                const data = await prisma.users.findMany({
                    where: conditions,
                });
                res.status(200).json(data);
            } catch (e) {
                res.status(500).json({ error: "Error fetching retros", exception: e });
            }
            break;
        case "POST":
            try {
                const body = req.body;
                const users = await prisma.users.create(
                    {
                        data: {
                            firstName: body.firstName,
                            lastName: body.lastName,
                            email: body.email,
                            color: body.color,
                            retrosId: body.retrosId
                        }
                    }
                );
                res.json({ ...users })
            } catch (e) {
                res.status(500).json({ error: "Error fetching retros", exception: e });
            }
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
};