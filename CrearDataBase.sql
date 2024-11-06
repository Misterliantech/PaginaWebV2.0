CREATE DATABASE Credenciales;

USE Credenciales;

CREATE TABLE Usuarios (
    usuario VARCHAR(50) NOT NULL,
    clave VARCHAR(255) NOT NULL,
    email VARCHAR(50) NOT NULL
);

INSERT INTO Usuarios (usuario, clave, email)
VALUES ('a', 'a', 'a@a.com');

CREATE TABLE Productos (

    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL (10, 2) NOT NULL,
    cantidad INT NOT NULL
    moneda VARCHAR (3) DEFAULT 'COP'

);

INSERT INTO Productos (nombre, precio)
VALUES 
    ('Chasis Gamer Thermaltake T800', 450.000,00),
    ('Procesador Intel Core i9', 960.000,00),
    ('Nvidia RTX 4060 ROG STRIX', 3.800.000,00),
    ('Teclado Mecanico Thermaltake Aura II', 230.000,00),
    ('Ram DDR4 Y-Skill 2x8GB 16GB', 410.000,00),
    ('Monitor Hp Colossus FHD', 550.000,00),
    ('Camiseta', 19,00),
    ('Camiseta', 19,00),
    ('Camiseta', 19,00),
    ('Camiseta', 19,00),
    ('Camiseta', 19,00),
    ('Camiseta', 19,00),
    ('Camiseta', 19,00),
    ('Camiseta', 19,00),
    ('Camiseta', 19,00),
    ('Camiseta', 19,00),
    ('Camiseta', 19,00),
    ('Camiseta', 19,00);
