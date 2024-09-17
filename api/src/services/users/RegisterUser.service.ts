import { Optional } from "sequelize";
import BadRequestException from "../../errors/BadRequestException";
import UsersModel from "../../models/Users.models";
import { RegisterBody, User } from "../../types/types";
import { v4 as uuid } from "uuid";
import { hashPassword } from "../../utils/bcrypt";

class RegisterUserService {
  private collection;

  constructor() {
    this.collection = UsersModel;
  }

  private checkExistentUser = async (email: string) => {
    const exists = await this.collection.findOne({ where: { email } });
    return exists;
  };

  public register = async (body: RegisterBody) => {
    const { name, lastname, email, password, phone_number } = body;

    if ([name, lastname, email, password, phone_number].includes("")) throw new BadRequestException("Fields cannot be empty");

    const existentUser = await this.checkExistentUser(email);
    if (existentUser) throw new BadRequestException(`User with email: ${email} already exists`);

    const saveToDB: Optional<User, any> = {
      user_id: uuid(),
      name,
      lastname,
      email,
      password: await hashPassword(password),
      phone_number
    };

    await this.collection.create(saveToDB);

    return {
      message: "User created successfully",
      user: { name, lastname, email, phone_number },
    };
  };
}

const registerUserService = new RegisterUserService();
export default registerUserService;
