const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'Lancelot@7',
    database: 'employee_trackerDB'

});

connection.connect((err) => {
    if (err) throw err;
    run_Options();
});

const run_Options = () => {
    inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View all Departments',
        'View All Employees By Department',
        'View All Employees By Manager',
        'Add Employee',
        'Remove Employee',
        'Update Employee Role',
        'Update Employee Manager',
        'View all Roles',
        'Add Role',
        'Remove Role',
        'exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View All Employees':
         view_all();
          break;

        case 'View all Roles':
            view_all_Roles();
            break;

        case 'View all Departments':
            view_all_Dept('viewall');
            break;

        case 'Add Employee':
            add_Employee();
            break;
        
        case 'Add Role':
          view_all_Dept('addrole');
            break;

        case 'Add Department':
            add_Dept();
            break;

        case 'Update Employee Role':
            update_emp_Role();
            break;
      

        case 'View All Employees By Department':
          view_all_Emp_Dept();
          break;

        case 'View All Employees By Manager':
          view_all_EMP_Man();
          break;

        case 'Remove Employee':
          remove_Employee();
          break;

        
        case 'Update Employee Manager':
            update_Manager();
            break;


        case 'Remove Role':
          Remove_role();
          break;

        case 'Exit':
          connection.end();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const view_all = () =>{
    // const query =
    // 'SELECT * FROM employee' ;
    // connection.query(query, (err, res) => {
    //     if (err) throw err;
    //     console.log(res);
    //     run_Options();
    // });
    let query =

        'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name  ';
        query+=
	      'FROM employee INNER JOIN role ON (employee.role_id = role.id AND employee.manager_id)';
        query+=
	      'INNER JOIN department on (department_id = department.id)';


        connection.query(query, (err, res) => {
          if (err) throw err;
          console.table(res);
          run_Options();
      });
  
};

const view_all_Dept = (call) => {
    const query = 
    'SELECT * FROM department';
    connection.query(query, (err, res) => {
      if (err) throw err;
      let depo = res;
      console.table(res);
      switch (call) {
        case 'addrole':
          add_Role(depo)
          break;
        
        case 'viewall':
          run_Options();
          break;
        }
     

      });
};

const view_all_Roles = () => {
    const query = 
    'SELECT * FROM role';
    connection.query(query, (err, res) => {
        res.forEach(({ title }) => console.table(title));
        run_Options();
      });
};

const add_Employee = () => {
  inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: 'Enter the new employees first name:',
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'Enter the new employees last name:',
      },
      {
        name: 'role_id',
        type: 'input',
        message: 'Enter the new employees first name:',
      },
      {
        name: 'manager_id',
        type: 'input',
        message: 'Enter the new employees first name:',
      },
    ])

    .then((answer) => {

      connection.query(
        'INSERT INTO employee SET ?',
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id,
        },
        (err) => {
          if(err) throw err;
          console.log('Your employee was successfully added');
          run_Options();
        }
      )
    })
}

const add_Dept = () =>{
  inquirer.prompt({
    name: 'department',
    type: 'input',
    message: 'Insert the name of your new department'
  })

  .then((answer) => {

    connection.query(
      'INSERT INTO department SET ?',
      {
        name: answer.department
      },
      (err) => {
        if(err) throw err;
        console.log('Your Department was successfully added');
        run_Options();
      }
    )
  })
}

const add_Role = (depo) =>{
  console.log(depo);
  inquirer.prompt([{
    name: 'title',
    type: 'input',
    message: 'Insert the name of your new role'
  },
  {
    name: 'salary',
    type: 'input',
    message: 'Insert the salary of this new role'
  },
  {
    name: 'department id',
    type: 'list',
    message: 'What department is this new role in?',
    choices: [...depo]
  },])

  .then((answer) => {

    connection.query(
      'INSERT INTO role SET ?',
      {
        title: answer.title,
        salary: answer.salary,
        department_id: answer.department_id
      },
      (err) => {
        if(err) throw err;
        console.log('Your role was successfully added');
        run_Options();
      }
    )
  })
}

const update_emp_Role = () => {
  inquirer.prompt(
    {
    name: 'name',
    type: 'list',
    message: "What employee would you like to change the role of ?"
  },
  )

  const query = connection.query(
    'UPDATE role SET ? WHERE ?',
  )
}