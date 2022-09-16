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
}
