# Project_backend
Graduation project of the Department of Information Management, National Sun Yat-sen University. This repo is for backend development, it demonstrate how api works in our project. Repo for frontend:https://github.com/ycloudo/Project_frontend

## Getting Started (with Docker)
if you have Docker installed in your computer, you can simply fork this repo and get started with following script:
  ```bash
   $ docker-compose up
  ```
## Code Overview
### dependencies
- dotenv - Loads .env parameters
- express - Web framework for Node.js for building web apps and APIs.
- jsonwebtoken - Library for generating and verifying JSON Web Tokens (JWTs).
- mongoose - MongoDB object modeling tool for Node.js apps.

### Development Dependencies
- nodemon - Monitors Node.js files for changes and automatically restarts the server.

### Application Structure
- `index.js` - The entry point to our application. This file defines the express server, integrates all the routes, initializes the logger and the mongoDB connection. 
- `src/controller/` - This folder contains the controllers for the app to read and write data to MongoDB.
- `src/routes/` - This folder contains the route definitions for the app.
- `src/models/` - This folder contains the Mongoose Schema definitions.
- `mongo_seed/` - This folder contains example data and script that push that data into MongoDB on Docker.

## Data
We have collected over 500 restaurants by crawling Google Maps, Dcard, and PTT. However, due to the file limit on Github, we can only provide 100 of them. Below are some IDs for example
`6364699444cde686910b5c7e, 63646999a3cc2e9ec63d3a40, 6364698858e0863d12ad4bd5` (If you access the dataBase, you can find the rest).

# API Examples
- [Authentication](#Auth)
  - [Register](#Register)
  - [Login](#Login)
  - [Varify JWT (authentication/authoriztion)](#JWT)
- [Functions](#Func)
    - [Edit User Profile](#EDP)
    - [Get Restaurants Info By tag](#InfoByTag)
    - [Get Restaurant Reviews](#GRR)
    - [Searching Restaurants](#SR)
## Authentication <a name="Auth"/>
### Register <a name="Register"/>
* Request
    `POST /api/user/register`

    ```JSON
    {
        "name": "test",
        "account": "test001",
        "password": "test001"
    }
    ```
* Response(200 ok)
    ```JSON
    {
        "info": {
            "name": "test",
            "account": "test001",
            "gender": false,
            "password": "test001",
            "avatar_id": 4,
            "favor": [],
            "_id": "65fd0232755676544bde3724",
            "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWZkMDIzMjc1NTY3NjU0NGJkZTM3MjQiLCJpYXQiOjE3MTEwNzk5ODYsImV4cCI6MTcxMTE2NjM4Nn0.10CoMko00d4Fz513mnlQDryL0PLGKcozj_5VPSV3Ctk"
    }
    ```

### Login <a name="Login"/>
* Request
    `POST /api/user/login`
    
    ```JSON
    {
        "account": "test001",
        "password": "test001"
    }
    ```
* Repsonse(200 ok)
    ```JSON
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWZhZDE0Mjc1NTY3NjU0NGJkZTM3MjIiLCJpYXQiOjE3MTEwODUwNTMsImV4cCI6MTcxMTE3MTQ1M30.Sdtd0qdQFFgbistuT3vUjslZlc1JxrMVIrz6D4EF2Ik",
        "uid": "65fad142755676544bde3722",
        "account": "test001"
    }
    ```
### Varify JWT (authentication/authoriztion) <a name="JWT"/>
* Resquest
    `GET /api/user/isTokenValid`

    ```JSON
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWZhZDE0Mjc1NTY3NjU0NGJkZTM3MjIiLCJpYXQiOjE3MTEwODUwNTMsImV4cCI6MTcxMTE3MTQ1M30.Sdtd0qdQFFgbistuT3vUjslZlc1JxrMVIrz6D4EF2Ik"
    }
    ```
* Response(200 ok)
    ```JSON
        true
    ```

## Functions <a name="Func"/>
### Edit User Profile <a name="EDP"/>
* Request
`PATCH /api/user/editProfile/:uid`

    ```JSON
    "header":{
        "auth-token": "JWT token given while login/register"
    }
    "body":{  
        "name":"test01",
        "account": "test001",
        "password": "test001",
        "gender": 1,
        "avatar_id": 2
    }
    ```
* Response(200 ok)
```JSON
{
    "message": "edit success"
}
```

### Get Restaurants Info By tag (lazy loading - ten per page) <a name="InfoByTag"/>
We have a function that allows users to filter restaurants by selecting different tags. Below are the types related to cid:
```
cid: type
1: "中式"
2: "日式"
3: "韓式"
4: "美式"
5: "西式"
6: "泰式"
7: "異國"
8: "輕食"
9: "All"
```
* Request
`GET /api/restaurant/getInfoByTag/:cid/:page`
* Response (200 ok)
    ```json
    [
        {
            "id": "636469836279633b372c6f43",
            "name": "713厝",
            "rate": 2.45,
            "address": "高雄市鼓山區九如四路713號",
            "res_type": 1,
            "photo": "store in base 64"
        },
        {
            
        }
    ]
    ```
### Get Restaurant Reviews <a name="GRR"/>
* Request
`/api/restaurant/reviews/:rid`
* Response (200 ok)
  - comment: full comment
  - rate: the rate generate by our sentiment analysis
  - SCR: each single comment rate (cut by punctuation mark)
  - type: the type generate by our classification model.ex: price, environment
  - singlerate: the rate of each type above
    ```json
    "reviews": [
            {
                "comment": "從小吃到大，但也漸漸漲價了",
                "rate": 1.904125,
                "resource": "Google",
                "singlecomment": [
                    "從小吃到大",
                    "但也漸漸漲價了"
                ],
                "SCR": [
                    3.5121,
                    1.4123
                ],
                "type": [
                    3,
                    4
                ],
                "singlerate": [
                    0,
                    0,
                    3.51,
                    1.41,
                    0
                ]
            }, ...
    ```

### Searching Restaurants <a name="SR"/>
Using regular expression for searching : `".*" + text + ".*$"`
* Request
`api/search/text/:text`
* Response
    ```json
    [
        {
            "id":
            "name":
            "rate":
            "address":
            "res_type":
            "photo":
        },
        {
            
        }
    ]
    ```







