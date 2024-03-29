import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/lib/serverAuth";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    try {
        const data = await serverAuth(req)

        return res.status(200).json(data?.currentUser)
    } catch (error) {
        console.log(error);
    }
}