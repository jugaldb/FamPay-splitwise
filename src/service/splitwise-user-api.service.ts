import { SplitwiseUserAPIRepository } from "../repository/splitwise-user-api.repository";
import { SplitwiseUserInterface } from "../model/splitwise-user-api.model";
import mongoose from "mongoose";
export class SplitwiseUserAPIService {
  private splitwiseUserAPIRepository: SplitwiseUserAPIRepository;

  constructor() {
    this.splitwiseUserAPIRepository = new SplitwiseUserAPIRepository();
  }

  async createUser(name: string, number: number, email: string) {
    const res = await this.splitwiseUserAPIRepository.createUser(
      name,
      number,
      email
    );
    console.log("service: " + res);
    return res;
  }

  async getTotalOwed(user: mongoose.Types.ObjectId) {
    try {
      const { moneyGiven, moneyTaken } =
        await this.splitwiseUserAPIRepository.getTotalOwed(user);
      let totalAmount = 0;
      if (moneyGiven) {
        for (let moneyGivenOnce of moneyGiven) {
          totalAmount += moneyGivenOnce.amount;
        }
      }
      if (moneyTaken) {
        for (let moneyTakenOnce of moneyTaken) {
          totalAmount -= moneyTakenOnce.amount;
        }
      }
      if (totalAmount >= 0) {
        return {
          amountOwedInTotal: Math.abs(totalAmount),
          moneyToBeTaken: true,
        };
      } else {
        return {
          amountOwedInTotal: Math.abs(totalAmount),
          moneyToBeTaken: false,
        };
      }
    } catch (e: any) {
      return { error: e.toString() };
    }
  }

  async getTotalOwedInAGroup(
    user: mongoose.Types.ObjectId,
    group: mongoose.Types.ObjectId
  ) {
    try {
      const { moneyGiven, moneyTaken } =
        await this.splitwiseUserAPIRepository.getTotalOwedInAGroup(user, group);
      let totalAmount = 0;
      if (moneyGiven) {
        for (let moneyGivenOnce of moneyGiven) {
          totalAmount += moneyGivenOnce.amount;
        }
      }
      if (moneyTaken) {
        for (let moneyTakenOnce of moneyTaken) {
          totalAmount -= moneyTakenOnce.amount;
        }
      }
      if (totalAmount >= 0) {
        return {
          amountOwedInGroup: Math.abs(totalAmount),
          moneyToBeTaken: true,
        };
      } else {
        return {
          amountOwedInGroup: Math.abs(totalAmount),
          moneyToBeTaken: false,
        };
      }
    } catch (e: any) {
      return { error: e.toString() };
    }
  }
}
