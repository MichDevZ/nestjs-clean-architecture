import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/entitites/user.entity';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import admin from 'firebase-admin';
import { FirebaseService } from '../database/firebase/firebase.config.service';
import { IPasswordService } from 'src/application/services/interfaces/password.service';
import { PASSWORD_SERVICE } from 'src/shared/constants/tokents';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  private readonly db: admin.firestore.Firestore;
  private readonly usersRef: FirebaseFirestore.CollectionReference;

  constructor(
    private readonly firebaseService: FirebaseService, 
    @Inject(PASSWORD_SERVICE)
    private readonly passwordService: IPasswordService) {
    this.db = this.firebaseService.getDb();
    this.usersRef = this.db.collection('users');
  }

  async create(user: User): Promise<User> {
    const userRef = this.usersRef.doc(user.id);
    await userRef.set({
      name: user.username,
      email: user.email,
      password: user.password ? user.password : "",
    });
    return user;
  }

  async update(user: User): Promise<void> {
    const generatedPassword = this.passwordService.generatePassword(10)
    const hashedPassword = await this.passwordService.hashPassword(generatedPassword);
    const userRef = this.usersRef.doc(user.id);
    await userRef.update({
      password: hashedPassword,
    });
  }

    async isEmailInUse(email: string): Promise<Boolean> {
     const querySnapshot = await this.usersRef.where('email', '==', email).limit(1).get()

     return !querySnapshot.empty;
  }
}