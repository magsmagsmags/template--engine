const inquirer = require("inquirer");
const fs = require("fs");
// const mustache = require('mustache');

// const Employee = require("./lib/employee");
// const Engineer = require("./lib/engineer");
// const Intern = require("./lib/intern");
// const Manager = require("./lib/manager");

// This array fills in with employee data.
// const teamMembers = [];

async function userInput(data) {
    inquirer.prompt(data)[
        // * name
        {
            type: "input",
            message: "What is the name of this employee?",
            name: "name"
        },
        // * id
        {
            type: "input",
            message: "What is the employee ID?",
            name: "id"
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

        //conditional questions for engineer, manager, intern
        {
            type: "input",
            message: "What is the manager's office number?",
            name: "office",

        },

        {
            type: "input",
            message: "What school does this intern attend?",
            name: "school",
            when: (data) => data.role === "Intern"
        },

        {
            type: "input",
            message: "What is the engineer's github username?",
            name: "github",
            when: (data) => data.role === "Engineer"
        },

        {
            type: "rawList",
            message: "Would you like to add another team member?",
            name: "addAnother",
            choices: ["yes", "no"]
        }
    ]
};

userInput().then(); {

    if (data.addAnother === "yes") {
        userInput();
    };

    if (data.addAnother === "no") {
        fs.writeFile("team.html", generateHTML, function (err) {
            console.log(err);
            if (err) return console.log(err);
            console.log(response);
        });
    }
};





// var source = document.getElementById("entry-template").innerHTML;
// var template = Handlebars.compile(source);
// //Get the HTML result of evaluating a Handlebars template by executing the template with a context.
// var context = {
//     title: "My New Post",
//     body: "This is my first post!"
// };
// var html = template(context);