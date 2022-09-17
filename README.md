# FamPay-Assignment

Hi recruiters 🙋🏻‍♂️, this is my submission for the assignment-task for the role of ```Backend Engineer``` for which the link can be found: [Google Docs - Splitwise Assignment | FamPay](https://docs.google.com/document/d/1jGCBfXgj32cvw9Sgctue_ZDpNErJRxlzsAM7qRWWXhY/edit#)



### The postman collection can be found at: [Postman Docs](https://documenter.getpostman.com/view/10968840/2s7YfVar9T#1c053dcc-866b-435a-8912-7359e83f970e)

## Features Implemented
- APIs
  1. Register a new user - ✅

  2. Create a group - ✅

  3. Add a user to a group (only for group creator) - ✅

  4. Add a bill to the group along with details of how to split and among whom to split the bill - ✅

  5. List owe amount per user in total - ✅

  6. List owe amount per user in a group - ✅

- APIs should be designed keeping in mind the scale. Server should be able to handle concurrent requests without affecting the business logic. - ✅
- Dockerize the project - ✅


## ER Diagram 

![image](https://user-images.githubusercontent.com/55304795/190842053-676aa9cc-3b8a-4a1e-9859-bc03945fc009.png)

  
## Tech stack used:

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## Tools used
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

## Installation

1. Clone the repo ```git clone https://github.com/jugaldb/FamPay-splitwise.git``` (assumes you have git installed).
2. Go to  ```cloud.mongodb.com``` and create a new database cluster and get the connection string. Ref - ```https://www.mongodb.com/basics/mongodb-atlas-tutorial```.

## Running the project
- There are multiple ways to run the Project, once you are done with the prerequisites and the basic installation you can use either:

### 1. Using Docker and docker compose.
- Rename the ```example.env``` file to ```.env``` and add the necessary variables' values.
- Paste the following in your terminal <br>
<code>cd (project directory)</code><br>
```docker build -t <image name> .```<br>

- Open the ```docker-compose.yml``` file <br>
- Change ```jugaldb/fampay-backend:latest``` with your  image name
- Run ```docker compose up``` to start the server.


### 2. Using npm

- Run the following command to download all the node modules.
```npm install```
- Rename the ```example.env``` file to ```.env``` and add the necessary variables' values.
- Run the project using 
```npm run start```
- This command will build the project and compile the TS to JS and run the JS compiled files under the ```/dist folder```

