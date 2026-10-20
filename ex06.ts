// Atividade: Tipos em TypeScript
// Aluno: Carlos Vitor Camara Gomes | Ciência da Computação | Centro Universitário São Lucas
// Exercício 06: Status do pedido no app de delivery

export {};

enum StatusPedido {
  Recebido = 1,
  EmPreparo,
  SaiuParaEntrega,
  Entregue,
  Cancelado,
}

enum FormaPagamento {
  Pix = 'PIX',
  Cartao = 'CARTAO',
  Dinheiro = 'DINHEIRO',
}

function mensagem(status: StatusPedido): string {
  switch (status) {
    case StatusPedido.Recebido:
      return 'Recebemos seu pedido!';
    case StatusPedido.EmPreparo:
      return 'Seu pedido está sendo preparado 🍳';
    case StatusPedido.SaiuParaEntrega:
      return 'O entregador está a caminho 🛵';
    case StatusPedido.Entregue:
      return 'Pedido entregue. Bom apetite!';
    case StatusPedido.Cancelado:
      return 'Pedido cancelado.';
  }
}

function avancar(status: StatusPedido): StatusPedido {
  if (status === StatusPedido.Entregue || status === StatusPedido.Cancelado) {
    return status; // etapas finais não mudam
  }
  return status + 1;
}

// Simulação do início ao fim
let atual: StatusPedido = StatusPedido.Recebido;
while (true) {
  // Mapeamento reverso: StatusPedido[2] === 'EmPreparo'
  console.log(`[${atual} - ${StatusPedido[atual]}] ${mensagem(atual)}`);
  if (atual === StatusPedido.Entregue) {
    break;
  }
  atual = avancar(atual);
}

const pagamento: FormaPagamento = FormaPagamento.Pix;
console.log(`Pagamento: ${pagamento}`);

// Erro provocado:
// const outra: FormaPagamento = 'PIX';
//   // error TS2322: Type '"PIX"' is not assignable to type 'FormaPagamento'.
// Por quê: enums de string são tipos nominais. Mesmo que o valor em tempo de
// execução seja 'PIX', o tipo FormaPagamento só aceita os membros do enum
// (FormaPagamento.Pix). Assim o compilador impede strings soltas e possíveis
// erros de digitação.
