# EduPlatform.API

Product owner: Justyna,
Tech lead: Mateusz,
Development Manager: Kinga,

Funkcjonalność

1. Ogloszenia dla wszytskich, -> Justyna
2. Taski, ograniczone czasowo, zadania do wykonania, mogą być przypisne do proejktu, do osoby -> Marta
3. Zarządzanie grupą, dodawanie userów, usuwanie, przydatne linki, dodawanie linków, plik z ocenami z projektów -> Mateusz
4. Projekty, dodawanie nowego projektu, zmianaie jego statusu, Kinga
5. Autoryzacja, rejstreowanie, token -> Wiktoria

### Configuration

The project has installed many dependencies, but the most important one are:

- express as a web framework
- nodemon for creating server and automatically restarting it when change occurs
- mongoose for easier interacting with MongoDB
- morgan for logging HTTP request
- dotenv for storing environment variables
- body-parser for parsing request's bodies
- jest for testing
- prettier for code formatting
- tslint for code analyzing
- bcrypt for encrypting passwords
- jsonwebtoken for sending tokens

### Scripts

For starting the server:

```
npm run dev
```

Keep in mind that in order to connect to the database you need to create file with the name '.env' in the root of the project, with text that I sent you. That file should be excluded from committing, thanks to the .gitignore. However, please watch out for not releasing it for public.

For testing:

```
npm run test
```

For code formatting:

```
npm run format
```

### Project structure

All of the application's code should be stored in 'src' folder and tests should be in 'spec/tests'. Server is created in 'index.ts'. In the 'app.ts' there is the heart of the app with some previously written middlewares. You should link your routes below the CORS handler middleware and above the middlewares that handle errors.

- In the 'routes' folder you should store your routers
- In the 'models' folder you should store your mongoDB schema
- In the 'middlewares' folder you should store your custom reusable middleware (especially authentication middleware should be stored here)
- In the 'controllers' folder you should store your controllers

The sample .ts files in the following folders are temporary, just to help you with getting the idea of the arrangement.

## Group

The docs for group management were build with swagger ui and can be found at adress https://eduplatformapi.herokuapp.com/doc

## Announcements

The docs for announcements were build with swagger ui and can be found at adress https://eduplatformapi.herokuapp.com/doc

## Authorization

The docs for authorization were build with swagger ui and can be found at adress https://eduplatformapi.herokuapp.com/doc

## Projects

### GET `/projects`

Get all projects.

### GET `/projects/{projectId}`

Get single project informations using project id.

#### Example Request

**GET** /projects/60428ed89187ba2c9807e148

#### Example Response

```
Status: 200 OK

{
    "_id": "60428ed89187ba2c9807e148",
    "title": "Pro to delete",
    "description": "This is our first project",
    "group": "604e2b5a9b420353ec922c4c",
    "linkToDemo": "www.project.asdpl",
    "linkToGitHub": "www.github.pl/project20",
    "timestamp": 1614974680847,
    "__v": 0
}
```

### POST `/projects`

Create new project.

#### Request body

| Name           | Type   |
| -------------- | ------ |
| Title          | String |
| Description    | String |
| Group          | String |
| Link to demo   | String |
| Link to GitHub | String |

#### Example Request

**POST** /projects

```
{
  "title": "First project",
  "description": "This is our first project",
  "group": "604e2b5a9b420353ec922c4c",
  "linkToDemo": "www.project.pl",
  "linkToGitHub": "www.github.pl/project"
}
```

#### Example Response

```
Status: 201 Created

{
    "message": "Project added successfully!"
}
```

### PUT `/projects/{projectId}`

Update informations about project using project id.

#### Parameters

| Name      | Type   |
| --------- | ------ |
| ProjectId | String |

#### Request body

| Name           | Type   |
| -------------- | ------ |
| Title          | String |
| Description    | String |
| Group          | String |
| Link to demo   | String |
| Link to GitHub | String |

### Example Request and Request body

**PUT** /projects/60428ed89187ba2c9807e148

```
{
    "title": "Pro to delete",
    "description": "This is our first project",
    "group": "604e2b5a9b420353ec922c4c",
    "linkToDemo": "www.project.asdpl",
    "linkToGitHub": "www.github.pl/project20",
}
```

#### Example Response

```
Status: 200 OK

{
    "message": "Updated successfully!"
}
```

### DELETE `/projects/{projectId}`

Delete single project using project id.

#### Parameters

| Name      | Type   |
| --------- | ------ |
| ProjectId | String |

#### Example Request

**DELETE** /projects/60428ed89187ba2c9807e148

#### Example Response

```
Status: 200 OK
{
    "message": "Deleted successfully"
}
```
## TASKS

### GET /tasks
Get all tasks

### GET /tasks/{taskId}
Get single task using it ID.

#### Example response
**GET** /tasks/603962e3f87efb51b0907762

```
Status: 200 OK

{
     "_id": "603962e3f87efb51b0907762",
    "name": "Lorem lorem lorem lorem",
    "description": "Lorem lorem lorem lorem",
    "deadline": 1614366265,
    "done": false,
    "__v": 0
},
```

### GET /tasks/project/{projectId}
Get tasks connected with project (by using this project ID).

#### Example response
**GET** /tasks/project/603509b488103d2df0106cbb

```
Status: 200 OK

[
    {
        "_id": "603a99506195bd2ccc8e8db6",
        "name": "Lorem lorem lorem lorem",
        "description": "Lorem lorem lorem lorem",
        "deadline": 1614366265,
        "done": false,
        "project": "603509b488103d2df0106cbb"
        "__v": 0
    },
    {
        "_id": "603a9fc68302362c083c62b8",
        "name": "testWithProject",
        "description": "Lorem lorem lorem lorem",
        "deadline": 1614366265,
        "done": false,
        "project":  "603509b488103d2df0106cbb",
        "__v": 0
    }
]
```

### POST /tasks
Create new task. It is possible to add information to task for project by adding it ID to body request.

#### Request body

| Name           | Type          |
| -------------- | ------------- |
| Name           | String        |
| Description    | String        |
| Deadline       | Number        |
| Done           | Boolean       |
| ProjectId      | String        |
| UserId         | String        |

#### Example response 
**POST** /tasks

```
Status: 200 OK

{
    "_id": "604d158772b2ac47d8ab6831",
    "name": "testTask",
    "description": "Lorem lorem lorem lorem",
    "deadline": 1614366265,
    "done": false,
    "project": {
        "_id": "604cb10425a8d00a9870cd80",
        "title": "Third project",
        "description": "This is first project",
        "mentor": "604a7b12d610101287aa2955",
        "authors": [
            {
                "_id": "604cb136f37f141378db09e7"
            }
        ],
        "linkToDemo": "www.demo.pl",
        "linkToGitHub": "www.link.pl",
        "timestamp": 1615638838149,
        "__v": 0
    },
    "__v": 0
}
```

### PUT /tasks/{taskID}
Update task information using it ID.

#### Parameters

| Name   | Type   |
| ------ | ------ |
| TaskId | String |

#### Example response
**PUT** /tasks/604d158772b2ac47d8ab6831

```
Status: 200 OK

{
    "message": "Updated successfully!"
}
```

### DELETE `/projects/{projectId}`

Delete single project using project id.

#### Parameters

| Name      | Type   |
| --------- | ------ |
| ProjectId | String |

#### Example Request

**DELETE** /projects/60428ed89187ba2c9807e148

#### Example Response

```
Status: 200 OK
{
    "message": "Deleted successfully"
    "_id": "604d158772b2ac47d8ab6831",
    "name": "UpdatedTask",
    "description": "Lorem lorem lorem lorem",
    "deadline": 1614366265,
    "done": null,
    "__v": 0
}
```

### DELETE /tasks/{taskID}
Delete task using it ID.

| Name   | Type   |
| ------ | ------ |
| TaskId | String |

#### Example response 
**DELETE** /tasks/603957ee18a8ef14bc439b33

```
Status: 200 OK

{
    "_id": "603957ee18a8ef14bc439b33",
    "name": "Lorem lorem lorem lorem",
    "description": "Lorem lorem lorem lorem",
    "deadline": 1614366265,
    "done": false,
    "__v": 0
}
```
