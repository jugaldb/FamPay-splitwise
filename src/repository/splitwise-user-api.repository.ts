// import { QueryTypes } from "sequelize";
import { run } from "../config/db.config";
import {
  User,
  SplitwiseUserInterface,
} from "../model/splitwise-user-api.model";
import * as mongoose from "mongoose";
import { Schema } from "mongoose";

export class SplitwiseUserAPIRepository {
  private db: any = {};

  constructor() {
    this.db = run();
  }

  async createUser(name: string, number: number, email: string) {
    try {
      const existingUser = await User.find({ email });
      if (existingUser.length >= 1) {
        return { user: existingUser[0], created: false, alreadyExists: true };
      }
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email,
        number,
        name,
      });
      const res = await user.save();
      console.log(res);
      return { user: user, created: true, alreadyExists: false };
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}
