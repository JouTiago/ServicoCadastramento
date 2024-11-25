CREATE DATABASE IF NOT EXISTS banco_cadastramento;

USE banco_cadastramento;

CREATE TABLE app (
    codigo BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT NOT NULL,
    custo_mensal DECIMAL(10, 2) NOT NULL
);

CREATE TABLE cliente (
    codigo BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome TEXT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE assinatura (
    codigo BIGINT PRIMARY KEY AUTO_INCREMENT,
    codApp BIGINT NOT NULL,
    codCli BIGINT NOT NULL,
    inicio_vigencia DATE NOT NULL,
    fim_vigencia DATE NOT NULL,
    FOREIGN KEY (codApp) REFERENCES app(codigo),
    FOREIGN KEY (codCli) REFERENCES cliente(codigo)
);

CREATE TABLE usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(50) UNIQUE NOT NULL,
  senha VARCHAR(64) NOT NULL,
  token VARCHAR(32) DEFAULT NULL
);

INSERT INTO cliente (nome, email) VALUES ('Cliente 1', 'cliente1@email.com'), ('Cliente 2', 'cliente2@email.com');
INSERT INTO app (nome, custo_mensal) VALUES ('App A', 19.99), ('App B', 29.99);