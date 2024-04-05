# RESTful

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
- [User Operations](#UO)
    - [Get User Profile](#GUP)
    - [Edit User Profile](#EDP)
- [Get Restaurants Info](#GetRes)
    - [By Tag (with Lazy loading)](#ByTag)
    - [By Restaurant id](#ByRID)
    - [By Text](#ByText)
    
## Authentication <a name="Auth"/>
### Register <a name="Register"/>
* Request
    `POST /api/user`

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
    `POST /api/login`
    
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
## User Operations <a name="UO"/>
### Get User Profile <a name="GUP"/>
* Request
`GET /api/user/:uid`

    ```JSON
    "header":{
        "auth-token": "JWT token given while login/register"
    }
    ```
* Response(200 ok)
```JSON
{
    "name": "test",
    "account": "test001",
    "password": "test001",
    "gender": false,
    "avatar_id": 4
}
```
### Edit User Profile <a name="EDP"/>
* Request
`PATCH /api/user/:uid`

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


## Get Restaurants Infomations <a name="GetRes"/>
We have a function that allows users to get restaurants informations by using different filter. Below are the filters:
### By Tag (with Lazy loading) <a name="ByTag"/>
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
99: "All"
```
* Request
`GET /api/restaurants?cid=[1-9]&page=[1-end]`
* Response (200 ok) (10 restaurants a page)
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
### By Restaurant id <a name="ByRID"/>
* Request
`/api/restaurant?rid=xxxxx`
* Response (200 ok)
    ```json
     [
        {
            "id": "636469836279633b372c6f43",
            "name": "713厝",
            "rate": 2.45,
            "address": "高雄市鼓山區九如四路713號",
            "res_type": 1,
            "photo": "store in base 64",
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
              },
              {
                  
              }
          ]
      },
      {
      
      }
  ]
  ```
The explanations of "reviews":
- comment: full comment
- rate: the rate generate by our sentiment analysis
- SCR: each single comment rate (cut by punctuation mark)
- type: the type generate by our classification model.ex: price, environment
- singlerate: the rate of each type above

### By Text <a name="ByText"/>
Using regular expression for searching : `".*" + text + ".*$"`
* Request
`api/api/restaurant?text=xxx`
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







