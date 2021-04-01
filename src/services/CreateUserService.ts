import User from '../models/User';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError'

import {hash  } from 'bcryptjs';

interface Request {
  name: string;
  email: string;
  password: string;
}


class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address alredy used.')
    }
    const user = userRepository.create({
      name,
      email,
      password,
    });
    await userRepository.save(user);
    return user;
  }
}

export default CreateUserService;
