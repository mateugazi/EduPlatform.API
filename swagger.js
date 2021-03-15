const swaggerAutogen = require('swagger-autogen')()
const mongoose = require('mongoose')

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/app.ts']

const doc = {
    info: {
        version: "1.0.0",
        title: "EduPlatform.API",
        description: "This is API for EduPlatform"
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: "Groups",
            description: "Endpoints"
        },
        {
            name: "Tasks",
            description: "Endpoints"
        },
        {
            name: "Projects",
            description: "Endpoints"
        },
        {
            name: "Announcements",
            description: "Endpoints"
        },
        {
            name: "Authorization",
            description: "Endpoints"
        }
    ],
    securityDefinitions: {
        api_key: {
            type: "apiKey",
            name: "api_key",
            in: "header"
        },
        petstore_auth: {
            type: "oauth2",
            authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
            flow: "implicit",
            scopes: {
                read_pets: "read your pets",
                write_pets: "modify pets in your account"
            }
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc)
