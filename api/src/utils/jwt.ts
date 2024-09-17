import { JwtPayload, sign, verify } from "jsonwebtoken";
import configServer from "../config/configServer.config";

class JwtManagement {
  private JWT_SECRET = configServer.jwt.secret_key;
  private EXPIRESIN = configServer.jwt.expiration;

  public generateToken = async (id: string): Promise<string> => {
    const jwt = sign({ id }, this.JWT_SECRET, {
      expiresIn: this.EXPIRESIN,
    });
    return jwt;
  };

  public compareToken = async (jwt: string): Promise<string | JwtPayload> => {
    const isOk = verify(jwt, this.JWT_SECRET);
    return isOk;
  };
}

const jwtManagement = new JwtManagement();
export default jwtManagement;