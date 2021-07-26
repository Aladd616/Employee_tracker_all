USE employee_trackerdb;



INSERT INTO employee (first_name, last_name, role_id, Manager_id)
VALUES ("Tony","Stark","1",""), ("Steve","Rogers","2","1"), ("Bruce","Banner","1","1"), ("Clint","Barton","2","2"), ("Bucky","Barnes","2","2"), ("Thor","Odinson","3",""), ("Hank","Pym","1",""), ("Peter","Parker","5","1"), ("Stephen","Strange","4","");




INSERT INTO role (title, salary, department_id)
VALUES ("Scientist","500000000.0","1"), ("soldier","50000.0","2"), ("God","90000000.0","3"), ("Intern","10000.0","2"), ("Sorcerer Supreme","60000000.0","4");




INSERT INTO department (name)
VALUES ("Stark industries"), ("avengers"), ("asgard"), ("Sanctum Sanctorum");