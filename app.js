const inquirer = require("inquirer");
const fs = require("fs");
// const mustache = require('mustache');

const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");
// const generate = require("./lib/generateHTML");

/////////////////////////////////////////////////////
// Variable 'main' id defined by reading main.html (template) file
//////////////////////////////////////////////////////
var main = fs.readFileSync('./templates/main.html', 'utf8');


/////////////////////////////////////////////////////
// This array fills in with team data.
// switchED to single employee array
//////////////////////////////////////////////////////
const team = [];


/////////////////////////////////////////////////////
// dON'T KNOW IF i NEED TO "LET" THESE VARIABLES 
//////////////////////////////////////////////////////
let manager;
let intern;
let engineer;



/////////////////////////////////////////////////////
// begin function to collect data pertaining only to manager
// the must be a manager and only one manager
// so we call this function first
// and separate from the other employee data function (empInput())
//////////////////////////////////////////////////////
function managerInput() {
    inquirer.prompt([
        // * managerName

        {
            type: "rawlist",
            message: "Welcome to the template engine, a simple tool for building a team profile. Let's build your manager profile first. Select -manager- to continue",
            name: "role",
            choices: ["manager"]
        },
        {
            type: "input",
            message: "Welcome to the template engine, a simple tool for building a team profile. Let's get some info about your team members! What is the team manager's name?",
            name: "name"
        },
        // * managerId
        {
            type: "input",
            message: "What is the team manager's ID?",
            name: "id"
        },
        // managerTitle
        {
            type: "input",
            message: "What is the title of this manager?",
            name: "title"
        },
        // managerEmail
        {
            type: "input",
            message: "What is the team manager's email?",
            name: "email"
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
        manager = new Manager(mAnswers.role, mAnswers.name, mAnswers.id, mAnswers.email, mAnswers.officeNumber);
        // manager.getRole(); // getting manager role? so the if statement will run, not the else? ????????????
        team.push(manager);
        console.log("Manager info logged. Now let's get info about the other employees. ")
        console.log("Manager: " + manager);

        // if (manager.getRole() === "Manager") {
        //////////////////////////////////////////////////////
        // reference team array
        // manager will always be first (index 0)
        // if role of index 0 = manager (it will)
        // then create this (manager) card type
        //////////////////////////////////////////////////////
        if (team[0].role === "Manager") {

            ///////////// how can I pull the HTML template in AND write in the data colled from the node/js
            //////////// ???????????????????????????
            //////////// will below work?

            const mgrCard = fs.readFileSync('./templates/manager.html');
            mgrCard = mgrCard.replace('{{name}}', manager.getName());
            mgrCard = mgrCard.replace('{{id}}', manager.getId());
            mgrCard = mgrCard.replace('{{role}}', manager.getRole());
            mgrCard = mgrCard.replace('{{email}}', manager.getEmail());
            mgrCard = mgrCard.replace('{{officeNumber}}', manager.getOfficeNumber());

            let mcard = mgrCard;

            main = main.replace('{{managerCards}}', mcard)
        } else {
            console.log("^^*manager card error*^^")
        }

        empInput();
    });
};


//////////////////////////////////////////////////////
// employee info function runs
// it is called at end of managerInput() function
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
                    intern = new Intern(eAnswers.name, eAnswers.id, eAnswers.title, eAnswers.email, eAnswers.role);
                    team.push(intern);
                    console.log("Intern " + eAnswers)
                } else if (eAnswers.role === "Engineer") {
                    engineer = new Engineer(eAnswers.name, eAnswers.id, eAnswers.title, eAnswers.email, eAnswers.role);
                    team.push(engineer);
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
                //////////////////////////////////////////////////////
                // after the if/if/else statements run, 
                // add they add the intern or engineer to the team array
                // the for loop loops through the array
                // and creates cards based on team[i].role
                //////////////////////////////////////////////////////

                for (var i = 1; i < team.length; i++) {
                    //////////////////////////////////////////////////////
                    /////// loop through team array
                    // if else statement based on role intern or engineer
                    // build card based on this
                    //////////////////////////////////////////////////////

                    if (role = "Engineer") {
                        const engCard = fs.readFileSync('./templates/Intern.html');
                        engCard = engCard.replace('{{name}}', engineer.getName());
                        engCard = engCard.replace('{{id}}', engineer.getId());
                        engCard = engCard.replace('{{role}}', engineer.getRole());
                        engCard = engCard.replace('{{email}}', engineer.getEmail());
                        engCard = engCard.replace('{{github}}', engineer.getGithub());

                        let ecard = engCard;
                        main = main.replace('{{engineerCards}}', ecard);

                    } // end engineer if statement
                    else if (role = "Intern") {
                        const intCard = fs.readFileSync('./templates/Intern.html');
                        intCard = intCard.replace('{{name}}', intern.getName());
                        intCard = intCard.replace('{{id}}', intern.getId());
                        intCard = intCard.replace('{{role}}', intern.getRole());
                        intCard = intCard.replace('{{email}}', intern.getEmail());
                        intCard = intCard.replace('{{school}}', intern.getSchool());

                        let icard = intCard;
                        main = main.replace('{{internCards}}', icard); ///???                        

                    } // end intern elseif statement


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


    fs.writeFileSync('./output/team.html', main);
    console.log("team output file written");

};





///////////////////////////////////////////////////////////////////
// after all other function descriptions and calls are written, 
// we call the managerInput() function
// it is the first function and this call will kick off everything
//////////////////////////////////////////////////////////////////

managerInput();