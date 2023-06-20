USE `employee_db`;

INSERT INTO `departments`(name) 
VALUES ('IT'), 
    ('SALES'), 
    ('HR');

INSERT INTO `roles`(title, salary, departments_id ) 
VALUES ("artist",600,2)
, ("developer",700,3)
, ("typist",300, 2);


INSERT INTO `employees`(first_name, last_name, role_id, manager_Id) 
VALUES ("Miles", "Morales", 2, 1)
, ("Peter", "Parker", 2, 0)
, ("Miguel", "O'Hara", 3, 0);