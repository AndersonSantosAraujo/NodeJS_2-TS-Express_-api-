import * as jwt from "jsonwebtoken";
import { IJwtData } from "../../interfaces";

const sign = (data: IJwtData) => {
  if (!process.env.JWT_SECRET) return "JWT_SECRET_NOT_FOUND";

  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "24h" });
};

const verify = (
  token: string | "JWT_SECRET_NOT_FOUND"
): IJwtData | "JWT_SECRET_NOT_FOUND" | "INVALID_TOKEN" => {
  if (!process.env.JWT_SECRET) return "JWT_SECRET_NOT_FOUND";

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decoded === "string") {
      return "INVALID_TOKEN";
    }

    return decoded as IJwtData;
  } catch (error) {
    return "INVALID_TOKEN";
  }
};

export const jwtToken = {
  sign,
  verify,
};
