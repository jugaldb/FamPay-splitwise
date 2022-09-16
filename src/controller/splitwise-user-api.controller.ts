import { SplitwiseUserAPIService } from "../service/splitwise-user-api.service";

export class SplitwiseUserAPIController {
  splitwiseUserAPIService: SplitwiseUserAPIService;
  constructor() {
    this.splitwiseUserAPIService = new SplitwiseUserAPIService();
  }

  async createUser(name: string, number: number, email: string) {
    name = name.trim();
    const res = await this.splitwiseUserAPIService.createUser(
      name,
      number,
      email
    );

    console.log("controller: " + res);
    return res;
  }
}
