require('dotenv').config();
const {
    buildConnectionOptions, 
    createConnection 
} = require('./config/dbConfig.js');

const inquirer= require('inquirer');

async function main() {
   const connection = await createConnection(buildConnectionOptions());

   const {createPromptModule}= inquirer;
   const prompt= createPromptModule();

   const selectedOption = await prompt([
    {
        type: "list",
        name: "menuOption",
        choices: ["View All Departments","View All Employees", "View All Roles","Add An Employee", "Add A Role", "Add A Department", "Update an Employee Role"],
    },
   ]);

   if (selectedOption === "View All Departments") {
    try {
        const result= await connection.execute (selectedOption);
        console.log("YAY OMG JESUS CHRIST");
    } catch (err) {
      console.error(err);
    }

//    console.log(selectedOption);
  
//    const [departments] = await connection.execute('SELECT * FROM departments;',[]);
//    console.table(departments);

//    const [roles] =await connection.execute('SELECT * FROM roles JOIN departments ON roles.departments_id = departments.id;', []);
//    console.table(roles);

//    const [employees] =await connection.execute('SELECT * FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.departments_id = departments.id;', []);
//    console.table(employees);
}
}
main();