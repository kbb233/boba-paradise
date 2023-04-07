--Customer register
INSERT INTO public.customers(phone_number,customer_name,password) 
			VALUES('206945634','user1','qwe123'),
			('2069712334','user2','qwe123'),
			('20612331234','user4','qwe123'),
			('20697123234','user6','qwe123'),
			('2069123234','user7','qwe123');

--customer order
WITH new_order AS (
  INSERT INTO public.customers_order (order_date, customer_comments, phone_number)
  VALUES (CURRENT_TIMESTAMP, NULL, '2069712334')
  RETURNING order_id
)
INSERT INTO public.order_detail (order_id, product_id, quantity)
SELECT order_id, 'green tea', 1
FROM new_order;

WITH new_order AS (
  INSERT INTO public.customers_order (order_date, customer_comments, phone_number)
  VALUES (CURRENT_TIMESTAMP, NULL, '2069712334')
  RETURNING order_id
)
INSERT INTO public.order_detail (order_id, product_id, quantity)
SELECT order_id, 'black tea', 2
FROM new_order;

WITH new_order AS (
  INSERT INTO public.customers_order (order_date, customer_comments, phone_number)
  VALUES (CURRENT_TIMESTAMP, NULL, '20612331234')
  RETURNING order_id
)
INSERT INTO public.order_detail (order_id, product_id, quantity)
SELECT order_id, 'brown sugar geern tea latte', 33
FROM new_order;

WITH new_order AS (
  INSERT INTO public.customers_order (order_date, customer_comments, phone_number)
  VALUES (CURRENT_TIMESTAMP, NULL, '20612331234')
  RETURNING order_id
)
INSERT INTO public.order_detail (order_id, product_id, quantity)
SELECT order_id, 'passionfruit green tea', 4
FROM new_order;

--new employee
INSERT INTO public.employee(employee_email,password,role,phone_number,wage) 
VALUES('thisisemail1@gsu.edu','QWE123','cashier','540654605',12.50),
('thisisemail2@gsu.edu','QWE123','barista','5406546605',13.50),
('thisisemail3@gsu.edu','QWE123','barista','540654456',13.50),
('thisisemail4@gsu.edu','QWE123','manager','23432405',15.50),
('thisisemail5@gsu.edu','QWE123','manager','523454605',15.50);

--schedule
WITH new_schedule AS (
  INSERT INTO public.schedule(date, type)
  VALUES ('2023-04-13', TRUE)
  RETURNING shift_id
)
INSERT INTO public.duty (employee_id, shift_id)
SELECT 'thisisemail1@gsu.edu', shift_id
FROM new_schedule
;
WITH new_schedule AS (
  INSERT INTO public.schedule(date, type)
  VALUES ('2023-04-13', FALSE)
  RETURNING shift_id
)
INSERT INTO public.duty (employee_id, shift_id)
SELECT 'thisisemail2@gsu.edu', shift_id
FROM new_schedule
;
WITH new_schedule AS (
  INSERT INTO public.schedule(date, type)
  VALUES ('2023-04-13', TRUE)
  RETURNING shift_id
)
INSERT INTO public.duty (employee_id, shift_id)
SELECT 'thisisemail3@gsu.edu', shift_id
FROM new_schedule
;
WITH new_schedule AS (
  INSERT INTO public.schedule(date, type)
  VALUES ('2023-04-13', FALSE)
  RETURNING shift_id
)
INSERT INTO public.duty (employee_id, shift_id)
SELECT 'thisisemail4@gsu.edu', shift_id
FROM new_schedule
;

--attendance sign in
INSERT INTO public.attendance(employee_id,date,clockin) 
VALUES('thisisemail3@gsu.edu',CURRENT_DATE,CURRENT_TIMESTAMP);

--attendance sign out
UPDATE public.attendance
SET clockout = CURRENT_TIMESTAMP
WHERE employee_id = 'thisisemail3@gsu.edu' and date=CURRENT_DATE;


--supplier
INSERT INTO public.supplier(email,supplier_name,phone_number) 
VALUES('supplier1@gsu.edu','supplier1','123123123'),
('supplier2@gsu.edu','supplier2','1232131223'),
('supplier3@gsu.edu','supplier3','12312456423'),
('supplier4@gsu.edu','supplier4','1212345623'),
('supplier5@gsu.edu','supplier5','123123123'),
('supplier6@gsu.edu','supplier6','1231274353');

--event
INSERT INTO public.event(employee_id,event_name,event_content,start_date,end_date) 
VALUES
('thisisemail1@gsu.edu','event1','buy one get one 50% off','2023-04-07','2023-04-09');


--reward
INSERT INTO public.reward(reward_name,points) 
VALUES('free drink',15),
('a boba keychain',15),
('a boba bag',7);

--inventory

--product

--supply

