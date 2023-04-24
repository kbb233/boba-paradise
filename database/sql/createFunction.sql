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
