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
    host: "eduplatformapi.herokuapp.com",
    basePath: "/",

    schemes: ['https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [{
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
    },
    definitions: {
        group: {
            _id: "604a7d278316be1be42ecab0",
            groupName: "sample group name",
            mentor: "604a7b12d610101287aa2955",
            members: [{
                _id: "604a7ba6d610101287aa2957"
            }]
        },
        allGroups: {
            numberOfGroups: 1,
            result: [{
                _id: "604a7d278316be1be42ecab0",
                groupName: "sample group name",
                mentor: "604a7b12d610101287aa2955",
                members: [{
                    _id: "604a7ba6d610101287aa2957"
                }]
            }]
        },

        createGroup: {
            $mentor: "604a7b12d610101287aa2955",
            $groupName: "sample group name"
        },
        addMember: {
            $_id: "604a7ba6d610101287aa2957"
        },
        deleteMember: {
            $_id: "604a7ba6d610101287aa2957"
        },
        changeName: {
            $newName: "new group name"
        },
        allAnnouncements: [{
                _id: "604fd0d798161c531cc51c03",
                title: "Title1",
                type: "type",
                content: "Lorem Ipsum..."
            },
            {
                _id: "604fd0eb98161c531cc51c04",
                title: "Title2",
                type: "type",
                content: "Becon Ipsummmm..."
            }
        ],
        announcementWithId: {
            _id: "604fd0eb98161c531cc51c04",
            title: "sample announcement name",
            content: "sample announcement content",
            type: "sample type"
        },
        announcement: {
            title: "sample announcement name",
            content: "sample announcement content",
            type: "sample type"
        },
        updateAnnouncement: {
            title: "new announcement name",
        },
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc)