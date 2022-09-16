import { SplitwiseGroupAPIRepository } from "../repository/splitwise-group-api.repository";
import { SplitwiseGroupInterface } from "../model/splitwise-group.model";
import mongoose, { Schema } from "mongoose";
export class SplitwiseGroupAPIService {
  private splitwiseGroupAPIRepository: SplitwiseGroupAPIRepository;

  constructor() {
    this.splitwiseGroupAPIRepository = new SplitwiseGroupAPIRepository();
  }

  async createGroup(name: string, owner: mongoose.Types.ObjectId) {
    let createdAt = new Date();
    console.log(" xervie; " + name);
    const res = await this.splitwiseGroupAPIRepository.createGroup(
      name,
      createdAt,
      owner
    );
    console.log("service: " + res);
    return res;
  }

  async addUserToGroup(
    user: mongoose.Types.ObjectId,
    group: mongoose.Types.ObjectId,
    owner: mongoose.Types.ObjectId
  ) {
    return await this.splitwiseGroupAPIRepository.addUserToGroup(
      user,
      group,
      owner
    );
  }

  async addBill(
    users: any[],
    amount: number,
    title: string,
    paid_by_id: mongoose.Types.ObjectId,
    group?: mongoose.Types.ObjectId
  ) {
    try {
      console.log("hello from service");
      console.log(group);
      let toBeBilledObjects = [];
      for (let user of users) {
        if (user._id.toString() == paid_by_id.toString()) {
          continue;
        } else {
          let billObject = {
            user1: paid_by_id,
            user2: user._id,
            amount: user.amount,
            group: group ? group : undefined,
            title: title,
          };
          toBeBilledObjects.push(billObject);
        }
      }
      return this.splitwiseGroupAPIRepository.addBill(toBeBilledObjects);
    } catch (e: any) {
      return { error: e.toString() };
    }
  }
}
