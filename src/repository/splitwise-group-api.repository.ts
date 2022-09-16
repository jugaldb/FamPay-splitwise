// import { QueryTypes } from "sequelize";
import { run } from "../config/db.config";
import { Group, SplitwiseGroupInterface } from "../model/splitwise-group.model";
import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { UserGroupMapping } from "../model/splitwise-user-group-mapping.model";
import { SplitwiseUserInterface } from "../model/splitwise-user-api.model";

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
      console.log(" repository: " + name);
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
      if (groupCreated) {
        console.log(res);
        return { group: groupCreated, created: true, alreadyExists: false };
      }
      const mapping = new UserGroupMapping({
        user: owner,
        group: res._id,
      });
      await mapping.save();
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}
