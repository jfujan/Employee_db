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

const rolePrompt = [
    {
        name: "addedRole",
        type: "input",
        message: "What is the name of this role?"
    },
    {
        name: "salary",
        type: "input",
        message: "What is the base salary?"
    },
    {
        name: "departmentId",
        type: "input",
        message: "What is the department ID?"
    }
]

const employeePrompt = [
    {
        name: "addedFirstName",
        type: "input",
        message: "What is the employees first name?"
    },
    {
        name: "addedLastName",
        type: "input",
        message: "What is the employees last name?"
    },
    {
        name: "roleId",
        type: "input",
        message: "What is this employees role ID?"
    },
    {
        name: "managerId",
        type: "input",
        message: "What is this employees manager ID?"
    }
]

const updatePrompt = [
    {
        name: "employeeID",
        type: "input",
        message: "What is the ID of the employee whose role you want to change?"
    },
    {
        name: "roleID",
        type: "input",
        message: "What is the ID of the role you want to change them to?"
    }
]

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
                value: "ADD_EMPLOYEE"
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
                
                case "ADD_ROLE":
                addRole();
                break;

                case "ADD_EMPLOYEE":
                addEmployee();
                break;

                case "UPDATE_EMPLOYEE_ROLE":
                updateRole();
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

function addRole() {
    inquirer.prompt(rolePrompt)
    .then(async answers => {
        //console.log(answers)
        await myDb.createRole(answers.addedRole, answers.salary, answers.departmentId);
    })
    .then(() => mainPrompt());
}

function addEmployee() {
    inquirer.prompt(employeePrompt)
    .then(async answers => {
        //console.log(answers)
        await myDb.createEmployee(answers.addedFirstName, answers.addedLastName, answers.roleId, answers.managerId);
    })
    .then(() => mainPrompt());
}

function updateRole() {
    inquirer.prompt(updatePrompt)
    .then(async answers => {
        //console.log(answers)
        await myDb.changeRole(answers.roleID, answers.employeeID);
    })
    .then(() => mainPrompt());
}