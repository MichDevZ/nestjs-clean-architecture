import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private readonly firestore: admin.firestore.Firestore;

  constructor() {
    if (!admin.apps.length) {
      if (process.env.USE_FIREBASE_EMULATOR) {
        admin.initializeApp({
          projectId: 'geekcastle-test', 
        });
      } else {
        admin.initializeApp({
          
        });
      }
    }
    this.firestore = admin.firestore();
  }

  getDb() {
    return this.firestore;
  }
}