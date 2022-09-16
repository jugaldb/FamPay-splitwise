import * as bodyParser from "body-parser";
import express from "express";
import { SplitwiseUserAPIController } from "./controller/splitwise-user-api.controller";
import "dotenv/config";
import cors from "cors";

class App {
  public express: express.Application;
  public splitwiseUserAPIController: SplitwiseUserAPIController;

  /* Swagger files start */

  /* Swagger files end */

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.splitwiseUserAPIController = new SplitwiseUserAPIController();
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
        this.splitwiseUserAPIController
          .createUser(name, number, email)
          .then((data) => res.json(data));
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