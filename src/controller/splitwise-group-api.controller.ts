import mongoose, { Schema } from "mongoose";
import { SplitwiseGroupAPIService } from "../service/splitwise-group-api.service";

export class SplitwiseGroupAPIController {
  splitwiseGroupAPIService: SplitwiseGroupAPIService;
  constructor() {
    this.splitwiseGroupAPIService = new SplitwiseGroupAPIService();
  }

  async createGroup(name: string, owner: string) {
    console.log(" conteoller: " + name);
    let ownerId = new mongoose.Types.ObjectId(owner);
    const res = await this.splitwiseGroupAPIService.createGroup(name, ownerId);

    console.log("controller: " + res);
    return res;
  }
}
