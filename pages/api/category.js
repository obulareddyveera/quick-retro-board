import prisma from '../../prisma/client';

export default async function categoryHandler(req, res) {
    const { method } = req;
    console.log('---= 1 data categoryHandler ', method);
    switch (method) {
        case "GET":
            try {   
                const data = await prisma.category.findMany();
                console.log('---= 2 data categoryHandler ', data);
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