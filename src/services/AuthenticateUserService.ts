
import { getRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import  authConfig from '../config/auth';
import AppError from '../errors/AppError'
import User from '../models/User';
import { id } from 'date-fns/locale';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}
class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { email }
    });
    if (!user) {
      throw new AppError("Incorect email/ password combination",401)
    }
    
    const passwordMatched = await compare(password, user.password);
        
    if (!passwordMatched) {
      throw new AppError("Incorect email/ password combination",401)
    }
    
    const {secret , expiresIn} = authConfig.jwt;
    const token = sign(
      {}, //PauLoad
      secret , {  //Chave
      subject: user.id,
      expiresIn: expiresIn,
      }
    );



    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;