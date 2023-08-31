const inquirer = require('inquirer');
const fs = require('fs')
const myDb = require("./db");

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
    inquirer.prompt(question)
    .then(answers => {
        let choice = answers.choice;

        switch(choice){
            case "VIEW_ALL_DEPARTMENTS":
                showDepartments();
                break;
                default: 
                process.exit();
        }
    })
}

function showDepartments(){
    
}