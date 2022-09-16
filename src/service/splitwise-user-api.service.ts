import { SplitwiseUserAPIRepository } from "../repository/splitwise-user-api.repository";
import { SplitwiseUserInterface } from "../model/splitwise-user-api.model";
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
}
