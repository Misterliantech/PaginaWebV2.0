CREATE DATABASE Credenciales;

USE Credenciales;

CREATE TABLE Usuarios (
    usuario VARCHAR(50) NOT NULL,
    clave VARCHAR(255) NOT NULL,
    email VARCHAR(50) NOT NULL,
);
