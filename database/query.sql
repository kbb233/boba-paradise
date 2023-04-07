--get customer's order
SELECT product_id, quantity
FROM customers_order as c1, order_detail as o1
WHERE c1.phone_number = '2069712334' AND o1.order_id = c1.order_id


--refund
UPDATE public.customers_order
SET status = FALSE
WHERE phone_number = phone_number and order_id = order_id;

--get menu
SELECT 