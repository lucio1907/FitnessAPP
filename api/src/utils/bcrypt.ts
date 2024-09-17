import { compare, hash } from "bcrypt";

export const hashPassword = async (password: string) => {
    const isOk = await hash(password, 8);
    return isOk;
};

export const comparePassword = async (hashedPassword: string, password: string) => {
    const isOk = await compare(password, hashedPassword);
    return isOk;
};