BEGIN;


CREATE TABLE IF NOT EXISTS public.customers
(
    phone_number character varying(20) NOT NULL,
    customer_name character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    points integer NOT NULL DEFAULT 0,
    PRIMARY KEY (phone_number)
);

CREATE TABLE IF NOT EXISTS public.customers_order
(
    order_id serial NOT NULL,
    order_date TIMESTAMP NOT NULL,
    customer_comments character varying(50),
    order_status boolean DEFAULT TRUE,
    phone_number character varying(20) NOT NULL,
    PRIMARY KEY (order_id)
);

CREATE TABLE IF NOT EXISTS public.reward
(
    reward_name character varying(20) NOT NULL,
    points integer NOT NULL,
    PRIMARY KEY (reward_name)
);

CREATE TABLE IF NOT EXISTS public.redeem_reward
(
    customer_id character varying(20),
    reward_id character varying(20),
    redeem_date date,
    PRIMARY KEY (customer_id, reward_id)
);

CREATE TABLE IF NOT EXISTS public.order_detail
(
    order_id bigint,
    product_id character varying(50),
    quantity integer NOT NULL,
    PRIMARY KEY (order_id, product_id)
);

CREATE TABLE IF NOT EXISTS public.product
(
    product_id character varying(50) NOT NULL,
    recipe character varying(200),
    price numeric(5, 2) ,
    status boolean DEFAULT TRUE,
    PRIMARY KEY (product_id)
);

CREATE TABLE IF NOT EXISTS public.employee
(
    employee_email character varying(20) ,
    password character varying(50)  NOT NULL,
    role character varying(20) NOT NULL,
    phone_number character varying(20)  NOT NULL,
    wage numeric(5, 2)  NOT NULL,
    PRIMARY KEY (employee_email)
);

CREATE TABLE IF NOT EXISTS public.event
(
    event_id serial,
    event_name character varying(20)  NOT NULL,
    event_content character varying(50)  NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    employee_id character varying(20)  NOT NULL,
    PRIMARY KEY (event_id)
);

CREATE TABLE IF NOT EXISTS public.schedule
(
    shift_id serial,
    date date NOT NULL,
    type boolean NOT NULL,
    PRIMARY KEY ("shift_id")
);

CREATE TABLE IF NOT EXISTS public.duty
(
    employee_id character varying(20) ,
    shift_id bigint,
    PRIMARY KEY (employee_id, shift_id)
);

CREATE TABLE IF NOT EXISTS public.attendance
(
    employee_id character varying(20) ,
	date DATE
    clockin TIMESTAMP,
	clockOUT TIMESTAMP
    PRIMARY KEY (employee_id, date)
);

CREATE TABLE IF NOT EXISTS public.refund_order
(
    employee_id character varying ,
    order_id bigint,
    date date,
    "time" time without time zone,
    PRIMARY KEY (employee_id, order_id)
);

CREATE TABLE IF NOT EXISTS public.inventory
(
    item_name character varying(20) ,
    quantity integer,
    unit character varying(10) ,
    PRIMARY KEY (item_name)
);

CREATE TABLE IF NOT EXISTS public.supply
(
    item character varying(20) ,
    supplier character varying(20) ,
    unit_price numeric(5, 2) NOT NULL,
    PRIMARY KEY (item, supplier)
);

CREATE TABLE IF NOT EXISTS public.supplier
(
    email character varying(50) NOT NULL,
    supplier_name character varying(20) NOT NULL,
    phone_number character varying(20) NOT NULL,
    PRIMARY KEY (email)
);

CREATE TABLE IF NOT EXISTS public.supply_order
(
    supplier character varying(20) ,
    item character varying(20) ,
    employee_id character varying(20) ,
    quantity integer NOT NULL,
    unit character varying(20)  NOT NULL,
    unit_price numeric(5, 2) NOT NULL,
    date date NOT NULL,
    PRIMARY KEY (supplier, item, employee_id)
);

ALTER TABLE IF EXISTS public.customers_order
    ADD CONSTRAINT customers FOREIGN KEY (phone_number)
    REFERENCES public.customers (phone_number) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.redeem_reward
    ADD FOREIGN KEY (customer_id)
    REFERENCES public.customers (phone_number) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.redeem_reward
    ADD FOREIGN KEY (reward_id)
    REFERENCES public.reward (reward_name) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.order_detail
    ADD FOREIGN KEY (order_id)
    REFERENCES public.customers_order (order_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.order_detail
    ADD FOREIGN KEY (product_id)
    REFERENCES public.product (product_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.event
    ADD FOREIGN KEY (employee_id)
    REFERENCES public.employee (employee_email) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.duty
    ADD FOREIGN KEY (employee_id)
    REFERENCES public.employee (employee_email) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.duty
    ADD FOREIGN KEY (shift_id)
    REFERENCES public.schedule ("shiftID") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.attendance
    ADD FOREIGN KEY (employee_id)
    REFERENCES public.employee (employee_email) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.refund_order
    ADD FOREIGN KEY (employee_id)
    REFERENCES public.employee (employee_email) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.refund_order
    ADD FOREIGN KEY (order_id)
    REFERENCES public.customers_order (order_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.supply
    ADD FOREIGN KEY (item)
    REFERENCES public.inventory (item_name) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.supply
    ADD FOREIGN KEY (supplier)
    REFERENCES public.supplier (email) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.supply_order
    ADD FOREIGN KEY (supplier)
    REFERENCES public.supplier (email) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.supply_order
    ADD FOREIGN KEY (item)
    REFERENCES public.inventory (item_name) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.supply_order
    ADD FOREIGN KEY (employee_id)
    REFERENCES public.employee (employee_email) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;