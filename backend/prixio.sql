CREATE TABLE supermarket (
    name VARCHAR(255) NOT NULL,
    CONSTRAINT PK_supermarket PRIMARY KEY (name)
);

CREATE TABLE unit (
    name VARCHAR(10) NOT NULL,
    CONSTRAINT PK_unit PRIMARY KEY (name)
);

CREATE TABLE product (
    ean VARCHAR(13) NOT NULL,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    unit VARCHAR(10) NOT NULL,
    CONSTRAINT PK_product PRIMARY KEY (ean),
    CONSTRAINT FK_unit FOREIGN KEY (unit) REFERENCES unit(name) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE observation (
    supermarket_name VARCHAR(255) NOT NULL,
    product_ean VARCHAR(13) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    CONSTRAINT PK_observation PRIMARY KEY (supermarket_name, product_EAN, date),
    CONSTRAINT FK_supermarket FOREIGN KEY (supermarket_name) REFERENCES supermarket(name) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT FK_product FOREIGN KEY (product_ean) REFERENCES product(ean) ON UPDATE CASCADE ON DELETE CASCADE
);
