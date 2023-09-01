const inquirer = require('inquirer');
const fs = require('fs')
const myDb = require("./db/dbAccess.js");

const departmentPrompt = [
    {
        name: "addedDepartment",
        type: "input",
        message: "What is the name of this department?"
    }
];

const question = [
    {
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: [
            {
                name:"View All Employess",
                value: "VIEW_ALL_EMPLOYEES" 
            },
            { 
                name:"Add Employee", 
                value: "ADD_EMPOLYEE"
            },
            {
                name: "Update Employee Role", 
                value: "UPDATE_EMPLOYEE_ROLE"
            },
            {
                name: "View All Roles", 
                value: "VIEW_ALL_ROLES"
            },
            {
                name: "Add Role", 
                value: "ADD_ROLE"
            },
            {
                name: "View All Departments", 
                value: "VIEW_ALL_DEPARTMENTS"
            },
            {
                name: "Add Department", 
                value: "ADD_DEPARTMENT"
            },
            {
                name: "Quit",
                value: "QUIT"
    }]
    }
];

function mainPrompt() {
    inquirer
    .prompt(question)
    .then(answers => {
        let choice = answers.options;

        switch(choice){
            case "VIEW_ALL_DEPARTMENTS":
                showDepartments();
                break;

                case "VIEW_ALL_ROLES":
                showRoles();
                break;

                case "VIEW_ALL_EMPLOYEES":
                showEmployees();
                break;

                case "ADD_DEPARTMENT":
                addDepartment();
                break;    

                default: 
                process.exit();
        }
    })
}

mainPrompt();

function showDepartments() {
    console.log("SHOW department")
    myDb.getAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => mainPrompt());
}

function showRoles() {
    console.log("SHOW role")
    myDb.getAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => mainPrompt());
}

function showEmployees() {
    console.log("SHOW employee")
    myDb.getAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => mainPrompt());
}

function addDepartment() {
    inquirer.prompt(departmentPrompt)
    .then(async answers => {
        //console.log(answers)
        await myDb.createDepartment(answers.addedDepartment);
    })
    .then(() => mainPrompt());
}

