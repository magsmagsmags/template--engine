const inquirer = require("inquirer");
const fs = require("fs");
// const mustache = require('mustache');

const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");

var main = fs.readFileSync('./templates/main.html', 'utf8');

// const generate = require("./lib/generateHTML");
//////////////////////////////////////////////////////
// This array fills in with team data.
const team = [];
// const mgrTeam = [];
// const intTeam = [];
// const engTeam = [];
// switch to single employee array


let manager;
//////////////////////////////////////////////////////
function managerInput() {
    inquirer.prompt([
        // * managerName
        {
            type: "input",
            message: "Welcome to the template engine, a simple tool for building a team profile. Let's get some info about your team members! What is the team manager's name?",
            name: "managerName"
        },
        // * managerId
        {
            type: "input",
            message: "What is the team manager's ID?",
            name: "managerId"
        },
        // managerTitle
        {
            type: "input",
            message: "What is the title of this manager?",
            name: "managerTitle"
        },
        // managerEmail
        {
            type: "input",
            message: "What is the team manager's email?",
            name: "managerEmail"
        },

        //conditional question for manager, managerOffice
        {
            type: "input",
            message: "What is the manager's office number?",
            name: "officeNumber",

        },
        //////////////////////////////////////////////////////
        // manager info added as index 0 in array
        // then employee input function runs
        //////////////////////////////////////////////////////
    ]).then(mAnswers => {
        manager = new Manager(mAnswers.managerName, mAnswers.managerID, mAnswers.managerEmail, mAnswers.officeNumber);
        team.push(manager);
        console.log("Manager info logged. Now let's get info about the other employees. ")
        console.log("Manager: " + manager);
        empInput();
    });
};


//////////////////////////////////////////////////////
// employee info function runs
// it is called in managerInput() function
// after the new manager const is added to the team array
//////////////////////////////////////////////////////

function empInput() {
    inquirer.prompt([
        // * name
        {
            type: "input",
            message: "What is the next employee's name?",
            name: "name"
        },
        // * id
        {
            type: "input",
            message: "What is this employee's ID?",
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
            type: "rawlist",
            name: "role",
            message: "What is the role of this employee?",
            choices: ["Intern",
                "Engineer"
            ]
        },

        //////////////////////////////////////////////////////
        // conditional questions for engineer, intern
        //////////////////////////////////////////////////////

        {
            type: "input",
            message: "What school does this intern attend?",
            name: "school",
            when: (userInput) => userInput.role === "Intern"
        },

        {
            type: "input",
            message: "What is the engineer's github username?",
            name: "github",
            when: (userInput) => userInput.role === "Engineer"
        },
        //////////////////////////////////////////////////////
        // Add another team member or finish?
        //////////////////////////////////////////////////////
        {
            type: "rawlist",
            message: "Would you like to add another team member?",
            name: "addAnother",
            choices: ["yes",
                "no"
            ]
        }
    ]).then(eAnswers => {
            //////////////////////////////////////////////////////
            // if 'yes' to 'addAnother':
            // add employee, let = either intern or engineer depending on answer to 'role'
            // then re-run empInput function
            //////////////////////////////////////////////////////
            if (eAnswers.addAnother === "yes") {
                if (eAnswers.role === "Intern") {
                    team.push(new Intern(eAnswers.name, eAnswers.id, eAnswers.title, eAnswers.email, eAnswers.role));
                    console.log("Intern " + eAnswers)
                } else if (eAnswers.role === "Engineer") {
                    team.push(new Engineer(eAnswers.name, eAnswers.id, eAnswers.title, eAnswers.email, eAnswers.role));
                } else {
                    console.log("employee answer error -y");
                }
                empInput();
                //////////////////////////////////////////////////////
                // if 'no' to 'addAnother':
                // add employee, let = either intern or engineer depending on answer to 'role'
                // then create cards, first manager then both employee types
                //////////////////////////////////////////////////////
            } else {
                //////////////////////////////////////////////////////
                // render cards via templates
                //manager or basic employee
                // and readfileSync to .templates/main.html

                if (eAnswers.role === "Intern") {
                    team.push(new Intern(eAnswers.name, eAnswers.id, eAnswers.title, eAnswers.email, eAnswers.role));

                    console.log("We are compiling your team profile!");
                }
                if (eAnswers.role === "Engineer") {
                    team.push(new Engineer(eAnswers.name, eAnswers.id, eAnswers.title, eAnswers.email, eAnswers.role));

                    console.log("We are compiling your team profile!");
                } else {
                    console.log("employee answer error -n");



                }

            }
            //////////////////////////////////////////////////////
            // at end of emInput() function
            // we call the createProfile() function
            // the function code is the next section
            //////////////////////////////////////////////////////
            createProfile();
        }

    )
};


// //////////////////////////////////////////////////////
// // create profile
// //////////////////////////////////////////////////////
function createProfile() {

    console.log("create profile function runs");
    console.log(team[0]);
    console.log("index 1 " + team[1]);
    console.log("index 2 " + team[2]);


    // employee = new Employee(employee.name, employee.id, employee.email);

    // //////////////////////////////////////////////////////
    // // create manager card
    // //////////////////////////////////////////////////////
    // if (employee.getRole() === "Manager") {

    //     const mgrCard = fs.readFileSync('./templates/manager.html');
    //     mgrCard = mgrCard.replace('{{name}}', manager.getName());
    //     mgrCard = mgrCard.replace('{{id}}', manager.getId());
    //     mgrCard = mgrCard.replace('{{role}}', manager.getRole());
    //     mgrCard = mgrCard.replace('{{email}}', manager.getEmail());
    //     mgrCard = mgrCard.replace('{{officeNumber}}', manager.getOfficeNumber());

    //     let mcard = mgrCard;

    //     main = main.replace('{{managerCards}}', mcard);


    //     //////////////////////////////////////////////////////
    //     // create employee cards
    //     //////////////////////////////////////////////////////

    // } else if (employee.getRole() === "Engineer") {
    //     const engCard = fs.readFileSync('./templates/Intern.html');
    //     engCard = engCard.replace('{{name}}', engineer.getName());
    //     engCard = engCard.replace('{{id}}', engineer.getId());
    //     engCard = engCard.replace('{{role}}', engineer.getRole());
    //     engCard = engCard.replace('{{email}}', engineer.getEmail());
    //     engCard = engCard.replace('{{github}}', engineer.getGithub());

    //     let ecard = engCard;

    //     main = main.append(ecard); ///???
    //     function addCode() {
    //         document.getElementById("engineerContainer").innerHTML +=
    //             ecard;
    //     }
    //     addCode();

    // } else if (employee.getRole() === "Intern") {

    //     const intCard = fs.readFileSync('./templates/Intern.html');
    //     intCard = intCard.replace('{{name}}', intern.getName());
    //     intCard = intCard.replace('{{id}}', intern.getId());
    //     intCard = intCard.replace('{{role}}', intern.getRole());
    //     intCard = intCard.replace('{{email}}', intern.getEmail());
    //     intCard = intCard.replace('{{school}}', intern.getSchool());

    //     for (var i = 0; i < team.length; i++) {
    //         var intEmployees = team[i];
    //         // card adds then adds to int array
    //         intCard += intEmployees; //////////////

    //         main = main.replace('{{internCards}}', intCard); ///???

    //     }
    // } else {
    //     console.log("create profile error");

    // }

    fs.writeFileSync('./output/team.html', main);
    console.log("team output file written");

};

// fs.writeFileSync('./output/team.html', main);





///////////////////////////////////////////////////////////////////
// after all other function descriptions and calls are written, 
// we call the managerInput() function
// it is the first function and this call will kick off everything
//////////////////////////////////////////////////////////////////

managerInput();






// var source = document.getElementById("entry-template").innerHTML;
// var template = Handlebars.compile(source);
// //Get the HTML result of evaluating a Handlebars template by executing the template with a context.
// var context = {
//     title: "My New Post",
//     body: "This is my first post!"
// };
// var html = template(context)