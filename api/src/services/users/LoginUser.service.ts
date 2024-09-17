import BadRequestException from "../../errors/BadRequestException";
import NotFoundException from "../../errors/NotFoundException";
import UsersModel from "../../models/Users.models";
import { LoginBody } from "../../types/types";
import { comparePassword } from "../../utils/bcrypt";
import jwtManagement from "../../utils/jwt";

class LoginService {
  private collection;

  constructor() {
    this.collection = UsersModel;
  }

  private checkUserExistent = async (email: string) => {
    const exists = await this.collection.findOne({ where: { email } });
    return exists;
  };

  public login = async (body: LoginBody) => {
    const { email, password } = body;

    if ([email, password].includes("")) throw new BadRequestException("Fields cannot be empty");

    const user = await this.checkUserExistent(email);
    if (!user) throw new NotFoundException("User not found");

    const hashedPassword = await user.dataValues.password;
    const isPasswordOk = await comparePassword(
      hashedPassword,
      password
    );

    const token = await jwtManagement.generateToken(user.dataValues.user_id);
    if (token) {
      const data = {
        user: {
          id: user.dataValues.user_id,
          credentials: {
            name: user.dataValues.name,
            lastname: user.dataValues.lastname,
            email: user.dataValues.email,
        },
          session: "active",
        },
        access_token: token,
        token_type: "Bearer",
      };

      if (isPasswordOk) return data;
      else throw new BadRequestException("Incorrect password");
    }
  };
}

const loginService = new LoginService();
export default loginService;
