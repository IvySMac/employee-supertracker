require("dotenv").config();
const {
  buildConnectionOptions,
  createConnection,
} = require("./config/dbConfig.js");

const mysql = "mysql2/promise";
const inquirer = require("inquirer");

async function main() {
  const connection = await createConnection(buildConnectionOptions());

  const { createPromptModule } = inquirer;
  const prompt = createPromptModule();

  const selectedOption = await prompt([
    {
      type: "list",
      name: "menuOption",
      choices: [
        "View All Departments",
        "View All Employees",
        "View All Roles",
        "Add A Role",
        "Add A Department",
        "Add An Employee",
        "Update an Employee Role",
      ],
    },
  ]);

  if (selectedOption.menuOption === "View All Departments") {
    try {
      const [departments] = await connection.query(
        "SELECT * FROM departments;"
      );
      console.table(departments);
    } catch (err) {
      console.error(err);
    }
  } else if (selectedOption.menuOption === "View All Roles") {
    try {
      const [roles] = await connection.query(
        "SELECT * FROM roles JOIN departments ON roles.departments_id = departments.id;"
      );
      console.table(roles);
    } catch (err) {
      console.error(err);
    }
  } else if (selectedOption.menuOption === "View All Employees") {
    try {
      const [employees] = await connection.query(
        "SELECT * FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.departments_id = departments.id;"
      );
      console.table(employees);
    } catch (err) {
      console.error(err);
    }
  } else if (selectedOption.menuOption === "Add A Department") {
    try {
      const newDepartment = await prompt([
        {
          type: "input",
          name: "departmentName",
          message: "Name of New Department",
          default: null,
        },
      ]);
      const departmentName = newDepartment.departmentName;
      await connection.query(
        `INSERT INTO departments (name) VALUES ('${departmentName}');`
      );
      const [updated] = await connection.query("SELECT * FROM departments;");
      console.table(updated);
    } catch (err) {
      console.error(err);
    }
  } else if (selectedOption.menuOption === "Add A Role") {
    try {
      const newRole = await prompt([
        {
          type: "input",
          name: "roleName",
          message: "Name of New Role",
        },
        {
          type: "input",
          name: "roleSalary",
          message: "Enter Salary of Role",
        },
        {
          type: "list",
          name: "roleDepartment",
          choices: async () => {
            const [departments] = await connection.query(
              "SELECT id, name FROM departments;"
            );
            return departments.map(({ id, name }) => ({
              name,
              value: id.toString(),
            }));
          },
        },
      ]);
      const roleName = newRole.roleName;
      const roleSalary = newRole.roleSalary;
      const roleDepartment = newRole.roleDepartment;

      await connection.query(
        `INSERT INTO roles (title, salary, departments_id) VALUES ('${roleName}', '${roleSalary}', '${roleDepartment}');`
      );
      const [updated] = await connection.query(
        "SELECT * FROM roles JOIN departments ON roles.departments_id = departments.id;"
      );

      console.table(updated);
    } catch (err) {
      console.error(err);
    }
  } else if (selectedOption.menuOption === "Add An Employee") {
    try {
      const newEmployee = await prompt([
        {
          type: "input",
          name: "employeeFirstName",
          message: "Enter Employee's First Name",
        },
        {
          type: "input",
          name: "employeeLastName",
          message: "Enter Employee's Last Name",
        },
        {
          type: "list",
          name: "employeeRole",
          choices: async () => {
            const [roles] = await connection.query(
              "SELECT id, title FROM roles;"
            );
            return roles.map(({ id, title }) => ({
              title,
              value: id.toString(),
            }));
          },
        },
        {
          type: "confirm",
          name: "managerStatus",
          message: "Is this employee a manager?",
          default: 0,
        },
        {
          type: "list",
          name: "managerId",
          message: "Select Employee Manager",
          choices: async () => {
            const [employees] = await connection.query(
              "SELECT id, last_name FROM employees WHERE employees.isManager=1;"
            );
            return employees.map(({ id, last_name }) => ({
              name: `${last_name}`,
              value: id.toString(),
            }));
          },
        },
      ]);
      const employeeFirstName = newEmployee.employeeFirstName;
      const employeeLastName = newEmployee.employeeLastName;
      const employeeRole = newEmployee.employeeRole;
      const managerStatus=newEmployee.managerStatus;
      const managerId=newEmployee.managerId;

      await connection.query(
        `INSERT INTO employees (first_name, last_name, role_id, managerStatus, managerId) VALUES ('${employeeFirstName}', '${employeeLastName}', '${employeeRole}', '${managerStatus}','${managerId}');`
      );
      const [updated] = await connection.query(
        "SELECT * FROM employees;"
      );

      console.table(updated);
    } catch (err) {
      console.error(err);
    }
  }
}
main();

//    console.log(selectedOption);

//    const [departments] = await connection.execute('SELECT * FROM departments;',[]);
//    console.table(departments);

//    const [roles] =await connection.execute('SELECT * FROM roles JOIN departments ON roles.departments_id = departments.id;', []);
//    console.table(roles);

//    const [employees] =await connection.execute('SELECT * FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.departments_id = departments.id;', []);
//    console.table(employees);
