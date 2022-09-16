import mongoose, { Schema } from "mongoose";
import { SplitwiseGroupAPIService } from "../service/splitwise-group-api.service";
import { validateAmount } from "../utils/validateAmount";

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

  async addUserToGroup(user: string, group: string, owner: string) {
    let userId = new mongoose.Types.ObjectId(user);
    let groupId = new mongoose.Types.ObjectId(group);
    let ownerId = new mongoose.Types.ObjectId(owner);

    return await this.splitwiseGroupAPIService.addUserToGroup(
      userId,
      groupId,
      ownerId
    );
  }

  async addBill(
    users: any[],
    amount: number,
    group: string,
    title: string,
    paid_by: string
  ) {
    let userIDs: any[] = [];
    for (let user of users) {
      let obj = {
        _id: new mongoose.Types.ObjectId(user.id),
        amount: user.amount,
      };
      userIDs.push(obj);
    }
    if (validateAmount(amount, userIDs)) {
      console.log("validated");
      let paid_by_id = new mongoose.Types.ObjectId(paid_by);
      console.log(group);
      if (group != undefined) {
        console.log(" group ");
        let groupId = new mongoose.Types.ObjectId(group);
        return await this.splitwiseGroupAPIService.addBill(
          userIDs,
          amount,
          title,
          paid_by_id,
          groupId
        );
      } else {
        console.log("no group");
        return await this.splitwiseGroupAPIService.addBill(
          userIDs,
          amount,
          title,
          paid_by_id
        );
      }
    } else {
      return { message: "amount not adding up to the total" };
    }
  }
}
