import { NextFunction, Request, Response } from "express";
import registerUserService from "../services/users/RegisterUser.service";
import loginService from "../services/users/LoginUser.service";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = await registerUserService.register(req.body);
        return res.status(201).json({ response: { message: newUser.message, user: newUser.user, status: 'Created' } });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loggedIn = await loginService.login(req.body);
        return res.json({ response: { message: 'Logged in', data: loggedIn, status: 'OK' } });
    } catch (error) {
        next(error);
    }
};