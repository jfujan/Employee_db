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

    }
    
    module.exports = new DbAccess(connection);