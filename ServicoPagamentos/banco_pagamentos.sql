CREATE DATABASE IF NOT EXISTS banco_pagamentos;

USE banco_pagamentos;

CREATE TABLE pagamento (
    codigo BIGINT PRIMARY KEY AUTO_INCREMENT,
    codAssinatura BIGINT NOT NULL,
    valor_pago DECIMAL(10, 2) NOT NULL,
    data_pagamento DATE NOT NULL
);