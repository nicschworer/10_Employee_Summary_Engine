const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const newEmployeeQuestion = [
    {
        type: "list",
        message: "Do you want to create a new employee?",
        name: "employee",
        choices: ["yes", "no"]
    },
];

const newEmployeeDetails = [
    {
        type: "input",
        message: "What is this employee's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is this employee's ID?",
        name: "id"
    },  
    {
        type: "input",
        message: "What is this employee's email?",
        name: "email"
    },    
    {
        type: "list",
        message: "What is this employee's role?",
        name: "role",
        choices: ["Manager", "Engineer", "Intern"]
    },
    // if manager
    {
        type: "input",
        message: "What is this Manager's office number?",
        name: "office",
        when: function (answers) {
            return answers.role === "Manager"
        },
    },
    // if engineer
    {
        type: "input",
        message: "What is this Engineer's GitHub username?",
        name: "git",
        when: function(answers) {
            return answers.role === "Engineer"
        }
    },
    // if intern
    {
        type: "input",
        message: "Where does this Intern go to school?",
        name: "school",
        when: function(answers) {
            return answers.role === "Intern"
        }
    },
]

async function init() {
    let answer = await inquirer.prompt(newEmployeeQuestion);
    if (answer.employee === "yes") {
        let detailsAnswers = await inquirer.prompt(newEmployeeDetails);
        // create objects...
        createEmployee(detailsAnswers);
        init();
    } else {
        const html = render(employees);
        fs.writeFile(outputPath, html, (e) => {console.log(e)});
    }
};

function createEmployee (answers) {
    if (answers.role === "Manager") {
        createManager(answers);
    } else if (answers.role === "Engineer") {
        createEngineer(answers);
    } else if (answers.role === "Intern") {
        createIntern(answers);
    };
}; 

function createManager (answers) {
    const m = new Manager(answers.name, answers.id, answers.email, answers.office);
    employees.push(m);
};

function createEngineer (answers) {
    const e = new Engineer(answers.name, answers.id, answers.email, answers.git);
    employees.push(e);
}

function createIntern (answers) {
    const i = new Intern(answers.name, answers.id, answers.email, answers.school);
    employees.push(i);
}


init();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
