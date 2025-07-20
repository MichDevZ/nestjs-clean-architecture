import { User } from "../entitites/user.entity";


export interface IUserRepository {
  create(user: User): Promise<User>;
  update(user: User): Promise<void>;
  isEmailInUse(email: string): Promise<Boolean>;
}