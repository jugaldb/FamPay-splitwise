import * as bodyParser from "body-parser";
import express from "express";
import { SplitwiseUserAPIController } from "./controller/splitwise-user-api.controller";
import { SplitwiseGroupAPIController } from "./controller/splitwise-group-api.controller";
import "dotenv/config";
import cors from "cors";

class App {
  public express: express.Application;
  public splitwiseUserAPIController: SplitwiseUserAPIController;
  public splitwiseGroupAPIController: SplitwiseGroupAPIController;

  /* Swagger files start */

  /* Swagger files end */

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.splitwiseUserAPIController = new SplitwiseUserAPIController();
    this.splitwiseGroupAPIController = new SplitwiseGroupAPIController();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.express.use(cors());

    this.express.post("/api/user/create", (req, res) => {
      try {
        console.log("revcieved");
        let name = req.body.name;
        let number = req.body.number;
        let email = req.body.email!;
        if (name == "" || email == "" || number == undefined) {
          return res.status(400).json({
            message: "Bad request, Params are missing",
          });
        }
        this.splitwiseUserAPIController
          .createUser(name, number, email)
          .then((data) => res.json(data));
      } catch (e: any) {
        res.status(500).json({
          error: e.toString(),
        });
      }
    });

    this.express.get("/api/user/totalOwed", (req, res) => {
      try {
        var user = req.query.user;
        if (!user) {
          user = "";
        }
        if (user == "") {
          return res.status(400).json({
            message: "Bad request, Params are missing",
          });
        }
        user = user.toString();
        this.splitwiseUserAPIController.getTotalOwed(user).then((data) => {
          res.json(data);
        });
      } catch (e: any) {
        res.status(500).json({
          error: e.toString(),
        });
      }
    });

    this.express.get("/api/user/totalOwedInAGroup", (req, res) => {
      try {
        var user = req.query.user;
        var group = req.query.group;
        if (!user) {
          user = "";
        }
        if (!group) {
          group = "";
        }
        if (user == "" || group == "") {
          return res.status(400).json({
            message: "Bad request, Params are missing",
          });
        }
        user = user.toString();
        group = group.toString();
        this.splitwiseUserAPIController
          .getTotalOwedInAGroup(user, group)
          .then((data) => {
            res.json(data);
          });
      } catch (e: any) {
        res.status(500).json({
          error: e.toString(),
        });
      }
    });

    this.express.post("/api/group/create", (req, res) => {
      try {
        let name = req.body.groupName;
        let owner = req.body.owner;
        if (name == "") {
          return res.status(400).json({
            message: "Bad request, Params are missing",
          });
        }
        this.splitwiseGroupAPIController
          .createGroup(name, owner)
          .then((data) => res.json(data));
      } catch (e: any) {
        res.status(500).json({
          error: e.toString(),
        });
      }
    });

    this.express.post("/api/group/addUser", (req, res) => {
      try {
        let user = req.body.user;
        let group = req.body.group;
        let owner = req.body.owner;
        if (user == "" || group == "") {
          return res.status(400).json({
            message: "Bad request, Params are missing",
          });
        }
        this.splitwiseGroupAPIController
          .addUserToGroup(user, group, owner)
          .then((data) => res.json(data));
      } catch (e: any) {
        res.status(500).json({
          error: e.toString(),
        });
      }
    });

    this.express.post("/api/group/addBill", (req, res) => {
      try {
        let users = req.body.users;
        let amount = req.body.totalAmount;
        let group = req.body.group;
        let title = req.body.title;
        let paid_by = req.body.paidBy;
        this.splitwiseGroupAPIController
          .addBill(users, amount, group, title, paid_by)
          .then((data) => {
            res.json(data);
          });
      } catch (e: any) {
        res.status(500).json({
          error: e.toString(),
        });
      }
    });

    this.express.get("/", (req, res, next) => {
      res.status(200).json({
        message:
          "Hi Recruiters, I am Jugal, and this is my submission for the FamPay - backend engineer role.",
        important_links: {
          github_repo: {
            backend_repo: "https://github.com/jugaldb/FamPay-Assignment",
            frontend_repo:
              "https://github.com/jugaldb/fampay-assignment-frontend",
          },
          hosted_api: "https://fampay-task-api.jugaldb.com",
          frontend: "https://fampay-task.jugaldb.com",
          postman_docs:
            "https://documenter.getpostman.com/view/10968840/VUqrPd4s",
          youtube_video: "https://youtu.be/FBF0OYFLLTo",
        },
      });
    });
    // handle undefined routes
    this.express.use("*", (req, res, next) => {
      res.send("Make sure url is correct!!!");
    });
  }
}

export default new App().express;
