const connection = require("./connection");

class DbAccess {

    constructor ( connection) {
    this.connection  = connection;
    }
    
    getAllDepartments() {
        return this.connection.promise().query(
          "SELECT department.id, department.department_name FROM department;"
        );
      }

      getAllRoles() {
        return this.connection.promise().query(
          "SELECT role.id, role.title, department.department_name, role.salary FROM role LEFT JOIN department on role.department_id=department.id;"
        );
      }

      getAllEmployees() {
        return this.connection.promise().query(
          "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.department_id=department.id LEFT JOIN employee manager ON manager.id=employee.manager_id;"
        );
      }
    }
    
    module.exports = new DbAccess(connection);