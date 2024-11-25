class Assinatura {
  constructor(id, clienteId, aplicativoId, inicioVigencia, fimVigencia) {
    this.id = id;
    this.clienteId = clienteId;
    this.aplicativoId = aplicativoId;
    this.inicioVigencia = inicioVigencia;
    this.fimVigencia = fimVigencia;
  }
}

module.exports = Assinatura;