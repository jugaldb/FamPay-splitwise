// import { QueryTypes } from "sequelize";
import { run } from "../config/db.config";
import { Group, SplitwiseGroupInterface } from "../model/splitwise-group.model";
import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { UserGroupMapping } from "../model/splitwise-user-group-mapping.model";
import {
  SplitwiseUserInterface,
  User,
} from "../model/splitwise-user-api.model";
import { Bill } from "../model/splitwise-bills.model";

export class SplitwiseGroupAPIRepository {
  private db: any = {};

  constructor() {
    this.db = run();
  }

  async createGroup(
    name: string,
    createdAt: Date,
    owner: mongoose.Types.ObjectId
  ) {
    try {
      const existingGroup = await Group.find({ name }).populate<{
        owner: SplitwiseUserInterface;
      }>("owner");
      if (existingGroup.length >= 1) {
        return { group: existingGroup[0], created: false, alreadyExists: true };
      }
      const group = new Group({
        _id: new mongoose.Types.ObjectId(),
        createdAt,
        owner,
        name,
      });
      const res = await group.save();
      let groupCreated = await Group.findOne({ name: res.name }).populate<{
        owner: SplitwiseUserInterface;
      }>("owner");
      const mapping = new UserGroupMapping({
        user: owner,
        group: res._id,
      });
      await mapping.save();
      if (groupCreated) {
        return { group: groupCreated, created: true, alreadyExists: false };
      }
    } catch (e: any) {
      console.log(e);
      return { error: e.toString() };
    }
  }

  async addUserToGroup(
    user: mongoose.Types.ObjectId,
    group: mongoose.Types.ObjectId,
    owner: mongoose.Types.ObjectId
  ) {
    try {
      const existingGroup = await Group.find({ _id: group });
      if (existingGroup.length < 1) {
        return { message: "Incorrect group id", added: false };
      }
      const existingUser = await User.find({ _id: user });
      if (existingUser.length < 1) {
        return { message: "Incorrect user id", added: false };
      }

      const existingMapping = await UserGroupMapping.findOne({ user, group });
      if (existingMapping) {
        return { message: "user already in group", added: false };
      }

      const mapping = new UserGroupMapping({
        user: user,
        group: group,
      });
      await mapping.save();
      return { message: "User added to group successfully", added: true };
    } catch (e: any) {
      console.log(e);
      return { error: e.toString(), added: false };
    }
  }
  async addBill(toBeBilledObjects: any[]) {
    try {
      const bills = await Bill.insertMany(toBeBilledObjects);
      return { bills: toBeBilledObjects };
    } catch (e: any) {
      console.log(e);
      return { error: e.toString() };
    }
  }
}
