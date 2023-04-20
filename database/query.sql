--get customer's order
SELECT product_id, quantity
FROM customers_order as c1, order_detail as o1
WHERE c1.phone_number = '2069712334' AND o1.order_id = c1.order_id;


--refund
UPDATE public.customers_order
SET status = FALSE
WHERE phone_number = phone_number and order_id = order_id;

--get menu
SELECT product_id,price
FROM product;

--get work hour for the past week
SELECT
    employee_id,
    SUM(EXTRACT(EPOCH FROM (clockOUT - clockIn))/3600) AS total_hours
FROM
    attendance
WHERE
    date > ('2023-04-20'::date - INTERVAL '1 week') AND date <= ('2023-04-20'::date)
GROUP BY
    employee_id
;

--or change to CURRENT_DATE

SELECT
    employee_id,
    SUM(EXTRACT(EPOCH FROM (clockOUT - clockIn))/3600) AS total_hours
FROM  attendance
WHERE	date > (CURRENT_DATE - INTERVAL '1 week')
GROUP BY  employee_id
HAVING
    SUM(EXTRACT(EPOCH FROM (clockOUT - clockIn))/3600) > 40;
	
--create ORDER
SELECT create_customer_order(
    '206945634', 
    '70% sweatness and less ice, please.',
    ARRAY['green tea', 'black tea'], 
    ARRAY[2, 1] 
);	
/*
CREATE OR REPLACE FUNCTION create_customer_order(
    p_phone_number character varying,
    p_customer_comments character varying,
    p_product_ids character varying[],
    p_quantities integer[]
)
RETURNS integer AS $$
DECLARE
    v_order_id integer;
BEGIN
    
    INSERT INTO customers_order (phone_number, customer_comments, order_status, order_date)
    VALUES (p_phone_number, p_customer_comments, TRUE, NOW())
    RETURNING order_id INTO v_order_id;

    
    FOR i IN 1..array_length(p_product_ids, 1) LOOP
        BEGIN
            INSERT INTO order_detail (order_id, product_id, quantity)
            VALUES (v_order_id, p_product_ids[i], p_quantities[i]);
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Error adding product_id: %, quantity: %', p_product_ids[i], p_quantities[i];
        END;
    END LOOP;

    RETURN v_order_id;
END;
$$ LANGUAGE plpgsql;

*/


--get order detail
SELECT order_id, product_id, quantity 
FROM get_order_details(21);
/*
CREATE OR REPLACE FUNCTION get_order_details(p_order_id integer)
RETURNS TABLE(
    order_id integer,
    order_date TIMESTAMP,
    customer_comments character varying,
    order_status boolean,
    phone_number character varying,
    product_id character varying,
    quantity integer
) AS $$
BEGIN
    RETURN QUERY
    SELECT co.order_id, co.order_date::TIMESTAMP, co.customer_comments, co.order_status, co.phone_number, od.product_id, od.quantity
    FROM customers_order co
    JOIN order_detail od ON co.order_id = od.order_id
    WHERE co.order_id = p_order_id;
END;
$$ LANGUAGE plpgsql;
*/

--order price
SELECT
    SUM(od.quantity * p.price) as order_total
FROM
    customers_order co
JOIN
    order_detail od ON co.order_id = od.order_id
JOIN
    product p ON od.product_id = p.product_id
WHERE co.order_id = 21;

--income
SELECT
    SUM(order_income) as income
FROM(
SELECT
        co.order_id,
		co.order_date,
        SUM(od.quantity * p.price) as order_income
FROM
    customers_order co
JOIN
    order_detail od ON co.order_id = od.order_id
JOIN
    product p ON od.product_id = p.product_id
WHERE 	
	co.order_date >= CURRENT_DATE - INTERVAL '1 week'
    AND co.order_date <= CURRENT_DATE
GROUP BY
        co.order_id
)subquery;


--check point
SELECT points
FROM customers
WHERE phone_number = ?;