-- Create the necessary tables
SOURCE create.sql;

-- Import data into product and inventory tables
LOAD DATA INFILE 'product.csv'
INTO TABLE product
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE 'inventory.csv'
INTO TABLE inventory
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- Insert additional data into the tables
SOURCE insert.sql;

-- Import data into supply table
LOAD DATA INFILE 'supply.csv'
INTO TABLE supply
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;