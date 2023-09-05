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
    
    createDepartment(department) {
        console.log(department)
        return this.connection.promise().query(
            `INSERT INTO department(department_name) VALUES (?)`, department
        );
    }

    createRole(role, salary, departmentId) {
        console.log(role, salary, departmentId)
        return this.connection.promise().query(
            `INSERT INTO role(title, salary, department_id) VALUES (?,?,?)`, [role, salary, departmentId]
        );
    }

    createEmployee(firstName, lastName, roleId, managerId) {
      console.log(firstName, lastName, roleId, managerId)
      return this.connection.promise().query(
          `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, [firstName, lastName, roleId, managerId]
      );
  }

  changeRole(roleID, employeeID) {
    return this.connection.promise().query(
      `UPDATE employee SET role_id = (?) WHERE id = (?)`, [roleID, employeeID]
    );
  }
}
    
module.exports = new DbAccess(connection);