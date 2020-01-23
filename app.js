const inquirer = require("inquirer");
const fs = require("fs");
// const mustache = require('mustache');

// const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");

const generate = require("./lib/generateHTML");

// This array fills in with employee data.
const teamMembers = [];

function mInput() {
    inquirer.prompt([
        // * name
        {
            type: "input",
            message: "What is the team manager's name?",
            name: "managerName"
        },
        // * id
        {
            type: "input",
            message: "What is the team manager's ID?",
            name: "managerId"
        },
        // title
        {
            type: "input",
            message: "What is the title of this manager?",
            name: "managerTitle"
        },
        // email
        {
            type: "input",
            message: "What is the team manager's email?",
            name: "managerEmail"
        },

        //conditional question for manager
        {
            type: "input",
            message: "What is the manager's office number?",
            name: "managerOffice",

        },

    ]).
};
mInput(); // calls manager input function
// add mInput / mdata to manager const and then team array


function bodyInput() {
    inquirer.prompt([
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

            //conditional questions for engineer, intern

            {
                type: "input",
                message: "What school does this intern attend?",
                name: "school",
                when: (bdata) => bdata.role === "Intern"
            },

            {
                type: "input",
                message: "What is the engineer's github username?",
                name: "github",
                when: (bdata) => bdata.role === "Engineer"
            },

            {
                type: "rawList",
                message: "Would you like to add another team member?",
                name: "addAnother",
                choices: ["yes", "no"]
            }
        ]
    };


    bodyInput().then(); {

        if (bdata.addAnother === "yes") {
            // add bdata to new Employee and into team array
            bodyInput();
        };

        if (bdata.addAnother === "no") {
            function addCard(res) {

                fs.writeFile(__dirname + "/employee.html", function (myFrameworkHTML) {
                    if (err) throw err;
                    // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
                    // an html file.

                });
            }
            addCard();






            // fs.writeFile("team.html", generateHTML, function (err) {
            //     console.log(err);
            //     if (err) return console.log(err);
            //     console.log(response);
            // });
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