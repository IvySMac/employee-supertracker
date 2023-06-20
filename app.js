require('dotenv').config();
const {
    buildConnectionOptions, 
    createConnection 
} = require('./config/dbConfig.js');

const mysql= ('mysql2/promise');
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
   ],
   );

   if (selectedOption.menuOption === "View All Departments") {
    try {
        const [departments] = await connection.query('SELECT * FROM departments;');
        console.table(departments);
    } catch (err) {
      console.error(err);
    } 
} else if (selectedOption.menuOption === "View All Roles") {
    try {
        const [roles] = await connection.query('SELECT * FROM roles JOIN departments ON roles.departments_id = departments.id;');
        console.table(roles);
    } catch (err) {
      console.error(err);
    } 
} else if (selectedOption.menuOption === "View All Employees") {
    try {
        const [employees] = await connection.query('SELECT * FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.departments_id = departments.id;');
        console.table(employees);
        // console.log("YAY OMG JESUS CHRIST");
    } catch (err) {
      console.error(err);
    }}
    else if (selectedOption.menuOption === "Add A Department"){
        try {    const newDepartment = await prompt([
            {
                type: "input",
                name: "newDepartment",
                message: 'Name of New Department',
                default: null
            },
           ],
           );
        //    await mysql.createConnection(buildConnectionOptions());
           await connection.query(
            `INSERT INTO departments (name) VALUES ('${newDepartment}');`
          );
          const [updated] = await connection.query("SELECT * FROM departments;");
          console.table(updated);

        }catch (err) {
            console.error(err);
    } 
}}
main();














//    console.log(selectedOption);
  
//    const [departments] = await connection.execute('SELECT * FROM departments;',[]);
//    console.table(departments);

//    const [roles] =await connection.execute('SELECT * FROM roles JOIN departments ON roles.departments_id = departments.id;', []);
//    console.table(roles);

//    const [employees] =await connection.execute('SELECT * FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.departments_id = departments.id;', []);
//    console.table(employees);