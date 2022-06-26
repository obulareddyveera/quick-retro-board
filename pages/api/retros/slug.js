import prisma from '../../../prisma/client';

export default async function retrosHandler(req, res) {
    const { method } = req;
    const { service, passCode } = req.query
    console.log('--== query ', service, passCode);
    switch (method) {
        case "GET":
            try {
                switch (service) {
                    case 'doCodeCheck':
                        const data = await prisma.retros.findMany({
                            where: {
                                passCode: passCode
                            }
                        });
                        console.log('--== doCodeCheck ', data);
                        if (data.length > 0) {
                            res.status(200).json({
                                status: 409, 
                                message: 'Duplicate passCode'
                            });
                        }
                        res.status(200).json({});
                        break;
                    default:
                        res.status(200).json([]);
                        break;
                }
            } catch (e) {
                res.status(500).json({ error: "Error fetching retros" });
            }
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
};