import { NextFunction, Response } from "express";
import jwtManagement from "../utils/jwt";
import { ReqExtended } from "../types/types";

const checkSession = async (req: ReqExtended, res: Response, next: NextFunction) => {
    try {
        const jwtByUser = req.headers.authorization || "";
        const jwt = jwtByUser.split(' ').pop();
        const isUser = await jwtManagement.compareToken(`${jwt}`) as unknown as { id: string };

        if (!isUser.id) return res.status(400).json({ response: { message: 'Invalid session token', status: 'Bad Request' } });
        else req.user = isUser;

        next();
    } catch (error) {
        return res.status(500).json({ response: { message: 'Invalid session', status: 'Internal Server Error' } });
    }
}

export default checkSession;