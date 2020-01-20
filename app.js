const inquirer = require("inquirer");
const fs = require("fs");
const mustache = require('mustache');

const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");

const generateHTML = require("./generateHTML.js");
const generate = require("./generateHTML");

// This array fills in with employee data.
const teamMembers = [];

async function userInput(data) {
    inquirer.prompt()[
        // * name
        {
            type: "input",
            message: "What is the name of this employee?",
            name: "Name"
        },
        // * id
        {
            type: "input",
            message: "What is the employee ID?",
            name: "ID"
        },
        // title
        {
            type: "input",
            message: "What is the title of this employee?",
            name: "title"
        },
        // email
        {
            type: "input",
            message: "What is this employee's email?",
            name: "email"
        },
        // role
        {
            type: "rawList",
            message: "What is the role of this employee?",
            name: "role",
            choices: ["Manager", "Intern", "Engineer"]
        },

        if (data.role === "Manager") {
            {
                type: "input",
                message: "What is the manager's office number?",
                name: "officeNum"
            }
        },

        if (data.role === "Intern") {
            {
                type: "input",
                message: "What school does this intern attend?",
                name: "school"
            }
        },


        if (data.role === "Engineer") {
            {
                type: "input",
                message: "What is the engineer's github username?",
                name: "github"
            }
        },

        {
            type: "rawList",
            message: "Would you like to add another team member?",
            name: "addAnother",
            choices: ["yes", "no"]
        },

        // {
        //     type: "input",
        //     message: "What is the engineer's github username?",
        //     name: "github",
        //     when: (data) => data.role === "Engineer"
        // },
        // {
        //     type: "input",
        //     message: "What school does this intern attend?",
        //     name: "school",
        //     when: (data) => data.role === "Intern"
        // },

        // * name
        // * id
        // * title
        // * getName()
        // * getId()
        // * getEmail()
        // * getRole() // Returns 'Employee'

        // if manager:
        //   * officeNumber
        // * getRole() // Overridden to return 'Manager'

        // if engineer:
        // * github  // GitHub username
        // * getGithub()
        // * getRole() // Overridden to return 'Engineer'

        // if intern:
        //  * school 
        // * getSchool()
        // * getRole() // Overridden to return 'Intern'

        // generate 
    ]
};

userInput();

if (data.addAnother === "yes") {
    userInput();
};

if (data.addAnother === "no") {
    fs.writeFile("team.html", generateHTML, function (err) {
        console.log(err);
        if (err) return console.log(err);
        console.log(response);
    });
};





var source = document.getElementById("entry-template").innerHTML;
var template = Handlebars.compile(source);
//Get the HTML result of evaluating a Handlebars template by executing the template with a context.
var context = {
    title: "My New Post",
    body: "This is my first post!"
};
var html = template(context);