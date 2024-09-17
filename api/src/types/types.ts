import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

/**
 * AUTH types
 */
export interface RegisterBody {
  name: string;
  lastname: string;
  email: string;
  password: string;
  phone_number: string;
}

export interface User extends RegisterBody {
    user_id: string
}

export interface LoginBody {
  email: string,
  password: string
}

export interface ReqExtended extends Request {
  user?: JwtPayload | { id: string };
}