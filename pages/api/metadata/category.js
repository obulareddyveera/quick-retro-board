import prisma from '../../../prisma/client';

export default async function categoryHandler(req, res) {
    const { method } = req;
    switch (method) {
        case "GET":
            try {   
                const data = await prisma.category.findMany();
                res.status(200).json(data);
            } catch(e) {
                res.status(500).json({ error: "Error fetching category" });
            }
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
};