// Atividade: Tipos em TypeScript (todos os exercícios em um único arquivo)
// Aluno: Carlos Vitor Camara Gomes | Ciência da Computação | Centro Universitário São Lucas
// Professor, para testar este codigo compile e execute com:
//   tsc --strict atividade.ts
//   node atividade.js

export {};

// ===========================================================================
// Exercício 01: Caixa da padaria
// ===========================================================================
function ex01(): void {
  // 1. Variáveis com anotação de tipo explícita
  const nomeProduto1: string = 'Pão francês';
  const precoUnitario1: number = 0.75;
  let quantidade1: number = 12;

  const nomeProduto2: string = 'Bolo de cenoura';
  const precoUnitario2: number = 18.5;
  const quantidade2: number = 2;

  // 2. Sem anotação: o TypeScript infere o tipo pelo valor
  const aberta = true;
  // Tipo inferido (passando o mouse no VS Code): true
  // (com const o tipo é o literal 'true'; com let seria boolean)
  let abertaLet = true;
  // Tipo inferido para o let: boolean
  abertaLet = false;

  // 3. Subtotais e total
  const subtotal1: number = precoUnitario1 * quantidade1;
  const subtotal2: number = precoUnitario2 * quantidade2;
  const total: number = subtotal1 + subtotal2;

  // 4. Separador numérico: 1_250_000 === 1250000
  const paesVendidosNoAno: number = 1_250_000;

  // 5. Hexadecimal: 0x1A é 26 em decimal (1 * 16 + 10)
  const codigoCategoria: number = 0x1a;

  // 6. Erro provocado:
  // quantidade1 = 'doze'; // error TS2322: Type 'string' is not assignable to type 'number'.

  // Saída
  console.log(`${nomeProduto1}: ${quantidade1} x R$ ${precoUnitario1.toFixed(2)} = R$ ${subtotal1.toFixed(2)}`);
  console.log(`${nomeProduto2}: ${quantidade2} x R$ ${precoUnitario2.toFixed(2)} = R$ ${subtotal2.toFixed(2)}`);
  console.log(`Total: R$ ${total.toFixed(2)}`);
  console.log(`Padaria aberta? ${aberta}`);
  console.log(`Pães vendidos no ano: ${paesVendidosNoAno}`);
  console.log(`Categoria: ${codigoCategoria}`);
}

// ===========================================================================
// Exercício 02: Cupom fiscal
// ===========================================================================
function ex02(): void {
  const nomeDigitado: string = ' maria da silva ';

  const PALAVRAS_MINUSCULAS: string[] = ['da', 'de', 'do'];

  function formatarNome(nome: string): string {
    return nome
      .trim()
      .split(' ')
      .filter((parte: string): boolean => parte !== '') // remove espaços duplicados
      .map((palavra: string): string => {
        const minuscula: string = palavra.toLowerCase();
        if (PALAVRAS_MINUSCULAS.includes(minuscula)) {
          return minuscula;
        }
        return minuscula.charAt(0).toUpperCase() + minuscula.slice(1);
      })
      .join(' ');
  }

  // Conversões: o leitor de código de barras entrega texto
  const precoLido: string = '12.40';
  const quantidadeLida: string = '3un';
  const preco: number = Number(precoLido);
  const quantidade: number = parseInt(quantidadeLida, 10); // parseInt ignora o sufixo "un"

  const clienteFidelidade: boolean = true;
  const numeroCupom: number = 42;

  const subtotal: number = preco * quantidade;
  const desconto: number = clienteFidelidade ? subtotal * 0.05 : 0;
  const totalFinal: number = subtotal - desconto;

  const cupom: string = `CUPOM Nº ${String(numeroCupom).padStart(6, '0')}
Cliente: ${formatarNome(nomeDigitado)}
Item: ${quantidade} x R$ ${preco.toFixed(2)}
Subtotal: R$ ${subtotal.toFixed(2)}
Desconto fidelidade: R$ ${desconto.toFixed(2)}
TOTAL: R$ ${totalFinal.toFixed(2)}`;

  console.log(cupom);
}

// ===========================================================================
// Exercício 03: Ficha de paciente
// ===========================================================================
function ex03(): void {
  // Tipo de objeto escrito diretamente na anotação (sem type nem interface)
  const paciente1: {
    readonly cpf: string;
    nome: string;
    idade: number;
    plano: boolean;
    alergias?: string[];
    contatoEmergencia?: { nome: string; telefone: string };
  } = {
    cpf: '123.456.789-00',
    nome: 'Ana Souza',
    idade: 34,
    plano: true,
    alergias: ['dipirona', 'lactose'],
    contatoEmergencia: { nome: 'Pedro Souza', telefone: '(69) 99999-0000' },
  };

  // Só com os campos obrigatórios
  const paciente2: {
    readonly cpf: string;
    nome: string;
    idade: number;
    plano: boolean;
    alergias?: string[];
    contatoEmergencia?: { nome: string; telefone: string };
  } = {
    cpf: '987.654.321-00',
    nome: 'Carlos Lima',
    idade: 61,
    plano: false,
  };

  function resumo(p: { nome: string; idade: number; alergias?: string[] }): string {
    const alergias: string =
      p.alergias !== undefined && p.alergias.length > 0
        ? `Alergias: ${p.alergias.join(', ')}`
        : 'Sem alergias registradas';
    return `${p.nome}, ${p.idade} anos. ${alergias}`;
  }

  console.log(resumo(paciente1));
  console.log(resumo(paciente2));

  // Erros provocados:
  // paciente1.cpf = '000.000.000-00';
  //   // error TS2540: Cannot assign to 'cpf' because it is a read-only property.
  // const paciente3: { nome: string } = { nome: 'Bia', peso: 70 };
  //   // error TS2353: Object literal may only specify known properties, and 'peso' does not exist in type '{ nome: string; }'.

  // Reflexão: object × Object × {}
  let dados: object = paciente1;
  // dados.nome;
  //   // error TS2339: Property 'nome' does not exist on type 'object'.
  // Por que dá erro: o tipo "object" só diz "isto é um valor não primitivo"
  // (objeto, array, função...). Ele não informa quais propriedades existem,
  // então o compilador não deixa acessar dados.nome. Ao anotar a variável como
  // object, o TypeScript esquece o formato original de paciente1.
  console.log(typeof dados);

  let x: {} = 10; // aceito
  // let y: object = 10;
  //   // error TS2322: Type 'number' is not assignable to type 'object'.
  // O tipo {} significa "qualquer valor que não seja null nem undefined", então
  // aceita primitivos como number, string e boolean. Já "object" aceita apenas
  // valores não primitivos (objetos, arrays, funções), por isso 10 é rejeitado.
  // (Object, com O maiúsculo, é a interface do protótipo base e também aceita
  // primitivos; deve ser evitado.)
  console.log(x);
}

// ===========================================================================
// Exercício 04: Lista de compras do mês
// ===========================================================================
function ex04(): void {
  const itens: { nome: string; preco: number; quantidade: number }[] = [
    { nome: 'Arroz 5kg', preco: 28.9, quantidade: 1 },
    { nome: 'Feijão 1kg', preco: 8.49, quantidade: 2 },
    { nome: 'Leite 1L', preco: 4.99, quantidade: 6 },
    { nome: 'Café 500g', preco: 17.9, quantidade: 1 },
    { nome: 'Sabão em pó', preco: 12.5, quantidade: 1 },
  ];

  // Somente map, filter e reduce (sem for)
  const nomes: string[] = itens.map((item) => item.nome);
  const caros: { nome: string; preco: number; quantidade: number }[] = itens.filter(
    (item) => item.preco > 10,
  );
  const total: number = itens.reduce((soma: number, item) => soma + item.preco * item.quantidade, 0);

  // Array somente leitura
  const categorias: readonly string[] = ['Mercearia', 'Laticínios', 'Limpeza'];
  // categorias.push('Higiene');
  //   // error TS2339: Property 'push' does not exist on type 'readonly string[]'.

  // Matriz: quantidade de itens em cada posição de cada prateleira
  const despensa: number[][] = [[2, 0, 1], [4, 4], [1]];
  const itensNaDespensa: number = despensa.reduce(
    (soma: number, prateleira: number[]) =>
      soma + prateleira.reduce((s: number, qtd: number) => s + qtd, 0),
    0,
  );

  // Desestruturação e spread
  const [primeiro, segundo] = itens;
  const novaLista: { nome: string; preco: number; quantidade: number }[] = [
    ...itens,
    { nome: 'Macarrão 500g', preco: 5.2, quantidade: 3 },
  ];

  console.log(`Itens: ${nomes.join(', ')}`);
  console.log(`Acima de R$ 10: ${caros.map((item) => item.nome).join(', ')}`);
  console.log(`Total da compra: R$ ${total.toFixed(2)}`);
  console.log(`Itens na despensa: ${itensNaDespensa}`);

  // Extras (não fazem parte da saída esperada)
  console.log(`Primeiro e segundo: ${primeiro.nome}, ${segundo.nome}`);
  console.log(`Original: ${itens.length} itens | Nova lista: ${novaLista.length} itens`);
  console.log(`Categorias: ${categorias.join(', ')}`);
}

// ===========================================================================
// Exercício 05: Boletim do clima
// ===========================================================================
function ex05(): void {
  // Tupla nomeada
  type Leitura = [cidade: string, temperatura: number];

  const leituras: Leitura[] = [
    ['Porto Velho', 34],
    ['Curitiba', 12],
    ['Manaus', 31],
    ['Porto Alegre', 9],
    ['Natal', 29],
  ];

  function extremos(temps: number[]): [number, number] {
    return [Math.min(...temps), Math.max(...temps)];
  }

  const temperaturas: number[] = leituras.map(([, temp]) => temp);
  const [minima, maxima] = extremos(temperaturas);

  for (const [cidade, temp] of leituras) {
    console.log(`${cidade}: ${temp}°C`);
  }

  const media: number = temperaturas.reduce((soma: number, t: number) => soma + t, 0) / temperaturas.length;
  console.log(`Mínima: ${minima}°C | Máxima: ${maxima}°C | Média: ${media.toFixed(1)}°C`);

  // ---- Demonstrações das demais tuplas (saída extra) ----
  // Tupla com elemento opcional
  type ContatoImprensa = [nome: string, telefone: string, email?: string];

  const contato1: ContatoImprensa = ['Marta Alves', '(69) 98888-1111', 'marta@jornal.com'];
  const contato2: ContatoImprensa = ['João Reis', '(69) 97777-2222'];
  console.log(contato1, contato2);

  // Tupla com elemento rest
  type HistoricoSemanal = [cidade: string, ...temperaturas: number[]];

  const historico: HistoricoSemanal = ['Porto Velho', 33, 34, 35, 32, 34, 36, 33];
  const [, ...temposSemana] = historico;
  const mediaSemana: number =
    temposSemana.reduce((soma: number, t: number) => soma + t, 0) / temposSemana.length;
  console.log(`Média semanal de ${historico[0]}: ${mediaSemana.toFixed(1)}°C`);

  // Tupla somente leitura
  const capitalOficial: readonly [string, string] = ['RO', 'Porto Velho'];
  // capitalOficial[0] = 'AC';
  //   // error TS2540: Cannot assign to '0' because it is a read-only property.
  console.log(capitalOficial);
}

// ===========================================================================
// Exercício 06: Status do pedido no app de delivery
// ===========================================================================
function ex06(): void {
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
}

// ===========================================================================
// Exercício 07: Central de notificações
// ===========================================================================
function ex07(): void {
  type Notificador = (destinatario: string, mensagem: string) => void;

  const porEmail: Notificador = (destinatario, mensagem) => {
    console.log(`[E-MAIL] para ${destinatario}: ${mensagem}`);
  };

  const porSms: Notificador = (destinatario, mensagem) => {
    if (mensagem.length > 160) {
      console.log('SMS ignorado: mensagem longa');
      return; // return antecipado (vazio)
    }
    console.log(`[SMS] para ${destinatario}: ${mensagem}`);
  };

  const porApp: Notificador = (destinatario, mensagem) => {
    console.log(`[APP] para ${destinatario}: ${mensagem}`);
  };

  function notificarTodos(destinatarios: string[], mensagem: string, enviar: Notificador): void {
    destinatarios.forEach((destinatario: string): void => enviar(destinatario, mensagem));
  }

  const aviso: string = 'Reunião de pais sexta às 19h';
  notificarTodos(['ana@escola.com'], aviso, porEmail);
  notificarTodos(['joao.resp'], aviso, porApp);
  notificarTodos(['(69) 99999-0000'], aviso, porSms);

  // SMS com mensagem longa (mais de 160 caracteres)
  notificarTodos(['(69) 98888-1111'], 'Aviso importante! '.repeat(10), porSms);

  // Erro provocado:
  // function teste(): void { return 10; }
  //   // error TS2322: Type 'number' is not assignable to type 'void'.

  // Reflexão: um notificador que retorna número é aceito.
  const contar: Notificador = (_d, m) => m.length;
  console.log(contar('qualquer', 'abc')); // 3 (a chamada direta da função funciona)
  // Por quê: quando um tipo de função declara retorno void, o TypeScript entende
  // "o chamador não vai usar o retorno", e não "a função não pode retornar nada".
  // Por isso qualquer função é atribuível a esse tipo e o valor devolvido é
  // simplesmente ignorado. Isso permite, por exemplo, passar arr.push ou uma
  // arrow function de expressão a um forEach, que espera um callback void. O
  // erro do exemplo acima só aparece porque a função "teste" tem o retorno void
  // declarado diretamente na sua própria assinatura.
}

// ===========================================================================
// Exercício 08: Formulário de cadastro
// ===========================================================================
function ex08(): void {
  // 1. Union type com estreitamento por typeof
  const codigo: number | string = 42;

  function formatarCodigo(c: number | string): string {
    if (typeof c === 'number') {
      return `CLI-${String(c).padStart(4, '0')}`;
    }
    // aqui c é string
    const digitos: string = c.replace(/\D/g, '');
    return `CLI-${digitos.padStart(4, '0')}`;
  }

  // 2. Tipo literal
  type Tamanho = 'P' | 'M' | 'G' | 'GG';
  const camiseta: Tamanho = 'M';
  // const invalido: Tamanho = 'XG';
  //   // error TS2322: Type '"XG"' is not assignable to type 'Tamanho'.

  // 3. Frete por região
  type Regiao = 'norte' | 'nordeste' | 'centro-oeste' | 'sudeste' | 'sul';

  function calcularFrete(regiao: Regiao): number {
    switch (regiao) {
      case 'norte':
        return 25;
      case 'nordeste':
        return 20;
      case 'centro-oeste':
        return 18;
      case 'sudeste':
        return 12;
      case 'sul':
        return 15;
    }
  }

  // 4. string | null
  const endereco: { rua: string; numero: number; complemento: string | null } = {
    rua: 'Rua das Flores',
    numero: 100,
    complemento: null,
  };
  const complementoTexto: string = endereco.complemento ?? '(sem complemento)';

  // 5. Limpar telefone
  function limparTelefone(tel: string | number): string {
    return String(tel).replace(/\D/g, '');
  }

  // 6. Inferência de literais
  const r = 'sul'; // const: o tipo inferido é o literal 'sul'
  let r2 = 'sul'; // let: o tipo inferido é string (a variável pode mudar)
  const freteR: number = calcularFrete(r); // ok
  // calcularFrete(r2);
  //   // error TS2345: Argument of type 'string' is not assignable to parameter of type 'Regiao'.
  // Explicação: com const o valor nunca muda, então o TypeScript mantém o tipo
  // literal 'sul'. Com let o valor pode ser reatribuído, então o tipo é alargado
  // para string, que é mais amplo que a união de regiões.
  // Correção do caso do let, com as const:
  let r3 = 'sul' as const; // tipo literal 'sul'
  const freteR3: number = calcularFrete(r3); // ok
  console.assert(freteR === freteR3);
  r2 = 'qualquer';

  console.log(`Cliente: ${formatarCodigo(codigo)} | Camiseta: ${camiseta}`);
  console.log(`Entrega: ${endereco.rua}, ${endereco.numero} - ${complementoTexto}`);
  console.log(`Frete para o sul: R$ ${calcularFrete('sul').toFixed(2)}`);
  console.log(`Telefone: ${limparTelefone('(69) 99999-0000')}`);
  console.log(`Telefone (número): ${limparTelefone(69999990000)}`);
  console.log(formatarCodigo('CLI-0042'));
}

// ===========================================================================
// Exercício 09: Lendo a resposta de uma API de clima
// ===========================================================================
function ex09(): void {
  const respostaOk = '{"cidade":"Porto Velho","temperatura":34,"umidade":0.62}';
  const respostaQuebrada = '{"cidade":"Porto Velho","temperatura":"quente"}';
  const respostaInvalida = '{ cidade: Porto Velho ';

  // 1. Versão com any (para ver o problema)
  function lerComAny(json: string): void {
    const dados: any = JSON.parse(json);
    console.log(`${dados.cidade}: ${dados.temperatura.toFixed(1)}°C`);
  }
  // Rodando lerComAny(respostaQuebrada) o compilador não reclama, mas em execução:
  //   TypeError: dados.temperatura.toFixed is not a function
  // Com any o TypeScript desliga a checagem: o erro só aparece quando o código roda.

  // 3. Função never: nunca retorna, sempre lança um erro
  function falhar(mensagem: string): never {
    throw new Error(mensagem);
  }

  // 2. Versão segura com unknown
  function lerClima(json: string): { cidade: string; temperatura: number } {
    let dados: unknown;
    try {
      dados = JSON.parse(json);
    } catch (erro: unknown) {
      if (erro instanceof SyntaxError) {
        return falhar('JSON malformado');
      }
      throw erro;
    }

    if (typeof dados !== 'object' || dados === null) {
      return falhar('JSON não é um objeto');
    }
    // aqui dados é object (não nulo): dá para usar "in"
    if (!('cidade' in dados) || typeof dados.cidade !== 'string') {
      return falhar('campo "cidade" inválido');
    }
    if (!('temperatura' in dados) || typeof dados.temperatura !== 'number') {
      return falhar('campo "temperatura" inválido');
    }
    return { cidade: dados.cidade, temperatura: dados.temperatura };
  }

  // 4 e 5. try/catch com catch (erro: unknown) e três respostas
  for (const resposta of [respostaOk, respostaQuebrada, respostaInvalida]) {
    try {
      const clima = lerClima(resposta);
      console.log(`${clima.cidade}: ${clima.temperatura.toFixed(1)}°C`);
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        console.log(`Erro: ${erro.message}`);
      } else {
        console.log('Erro desconhecido');
      }
    }
  }

  // Demonstração do problema do any (saída extra)
  try {
    lerComAny(respostaQuebrada);
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      console.log(`[any] Erro só em execução: ${erro.message}`);
    }
  }
}

// ===========================================================================
// Exercício 10: Sistema de estacionamento (projeto integrador)
// ===========================================================================
function ex10(): void {
  // ---------------------------------------------------------------------------
  // Type aliases e literais
  // ---------------------------------------------------------------------------
  type Placa = string;
  type Periodo = [entrada: number, saida: number]; // horas cheias, ex.: [8, 11]

  // ---------------------------------------------------------------------------
  // União discriminada
  // ---------------------------------------------------------------------------
  type Carro = { readonly placa: Placa; tipo: 'carro'; portas: 2 | 4 };
  type Moto = { readonly placa: Placa; tipo: 'moto'; cilindradas: number };
  type Caminhao = { readonly placa: Placa; tipo: 'caminhao'; eixos: number };
  type Veiculo = Carro | Moto | Caminhao;

  // Passo de verificação exaustiva: se acrescentarmos a Van abaixo à união,
  // o switch de calcularTarifa deixa de compilar.
  // type Van = { readonly placa: Placa; tipo: 'van'; lugares: number };
  // type Veiculo = Carro | Moto | Caminhao | Van;
  //   // error TS2322: Type 'Van' is not assignable to type 'never'.
  //   // (a contagem por tipo também passa a reclamar, pois falta a chave 'van')
  //   //   (em _naoTratado: never = v, porque v ainda pode ser Van)
  // O que o never garantiu: o compilador nos obriga a tratar todos os membros da
  // união. Esquecer um tipo novo vira erro de compilação, e não bug em produção.

  // ---------------------------------------------------------------------------
  // Enum
  // ---------------------------------------------------------------------------
  enum SituacaoTicket {
    Aberto = 'ABERTO',
    Pago = 'PAGO',
  }

  // ---------------------------------------------------------------------------
  // Ticket
  // ---------------------------------------------------------------------------
  type Ticket = {
    veiculo: Veiculo;
    periodo: Periodo;
    selo: boolean;
    situacao: SituacaoTicket;
    valor?: number;
  };

  // ---------------------------------------------------------------------------
  // Tarifas
  // ---------------------------------------------------------------------------
  function calcularTarifa(v: Veiculo, horas: number): number {
    const adicionais: number = Math.max(horas - 1, 0);
    switch (v.tipo) {
      case 'carro':
        return 8 + adicionais * 5;
      case 'moto':
        return 4 + adicionais * 2;
      case 'caminhao':
        return 15 + adicionais * 10;
      default: {
        const _naoTratado: never = v;
        return _naoTratado;
      }
    }
  }

  function horasCobradas(periodo: Periodo): number {
    const [entrada, saida] = periodo;
    return Math.max(saida - entrada, 1); // todo veículo paga pelo menos 1 hora
  }

  function fecharTicket(t: Ticket): Ticket {
    const horas: number = horasCobradas(t.periodo);
    const bruto: number = calcularTarifa(t.veiculo, horas);
    const valor: number = t.selo ? bruto * 0.5 : bruto;
    // novo objeto com spread: o original não é alterado
    return { ...t, valor, situacao: SituacaoTicket.Pago };
  }

  function registrar(msg: string): void {
    console.log(msg);
  }

  function descrever(t: Ticket): string {
    const selo: string = t.selo ? ' (selo -50%)' : '';
    return `[${t.situacao}] ${t.veiculo.placa} (${t.veiculo.tipo}) - ${horasCobradas(t.periodo)}h - R$ ${(t.valor ?? 0).toFixed(2)}${selo}`;
  }

  // ---------------------------------------------------------------------------
  // Entrada externa com unknown
  // ---------------------------------------------------------------------------
  function falhar(mensagem: string): never {
    throw new Error(mensagem);
  }

  function lerVeiculo(json: string): Veiculo {
    let dados: unknown;
    try {
      dados = JSON.parse(json);
    } catch (erro: unknown) {
      return falhar('JSON malformado');
    }
    if (typeof dados !== 'object' || dados === null) {
      return falhar('JSON não é um objeto');
    }
    if (!('placa' in dados) || typeof dados.placa !== 'string') {
      return falhar('campo "placa" inválido');
    }
    if (!('tipo' in dados) || typeof dados.tipo !== 'string') {
      return falhar('campo "tipo" inválido');
    }
    const placa: Placa = dados.placa;

    switch (dados.tipo) {
      case 'carro':
        if (!('portas' in dados) || (dados.portas !== 2 && dados.portas !== 4)) {
          return falhar('campo "portas" inválido');
        }
        return { placa, tipo: 'carro', portas: dados.portas };
      case 'moto':
        if (!('cilindradas' in dados) || typeof dados.cilindradas !== 'number') {
          return falhar('campo "cilindradas" inválido');
        }
        return { placa, tipo: 'moto', cilindradas: dados.cilindradas };
      case 'caminhao':
        if (!('eixos' in dados) || typeof dados.eixos !== 'number') {
          return falhar('campo "eixos" inválido');
        }
        return { placa, tipo: 'caminhao', eixos: dados.eixos };
      default:
        return falhar(`tipo "${dados.tipo}" desconhecido`);
    }
  }

  // ---------------------------------------------------------------------------
  // Dados de teste (os veículos chegam da cancela como JSON)
  // ---------------------------------------------------------------------------
  const entradas: { json: string; periodo: Periodo; selo: boolean }[] = [
    { json: '{"placa":"ABC1D23","tipo":"carro","portas":4}', periodo: [8, 11], selo: false },
    { json: '{"placa":"MOT0A12","tipo":"moto","cilindradas":160}', periodo: [9, 10], selo: false },
    { json: '{"placa":"CAM9Z99","tipo":"caminhao","eixos":3}', periodo: [7, 12], selo: false },
    { json: '{"placa":"XYZ4E56","tipo":"carro","portas":2}', periodo: [14, 16], selo: true },
  ];

  const ticketsAbertos: Ticket[] = entradas.map(
    (e): Ticket => ({
      veiculo: lerVeiculo(e.json),
      periodo: e.periodo,
      selo: e.selo,
      situacao: SituacaoTicket.Aberto,
    }),
  );

  // ---------------------------------------------------------------------------
  // Relatório
  // ---------------------------------------------------------------------------
  const ticketsFechados: Ticket[] = ticketsAbertos.map(fecharTicket);

  ticketsFechados
    .filter((t: Ticket): boolean => t.situacao === SituacaoTicket.Pago)
    .map(descrever)
    .forEach(registrar);

  const faturamento: number = ticketsFechados.reduce(
    (soma: number, t: Ticket): number => soma + (t.valor ?? 0),
    0,
  );
  registrar(`Faturamento: R$ ${faturamento.toFixed(2)}`);

  const contagem: { carro: number; moto: number; caminhao: number } = ticketsFechados.reduce(
    (acc: { carro: number; moto: number; caminhao: number }, t: Ticket) => {
      acc[t.veiculo.tipo] += 1;
      return acc;
    },
    { carro: 0, moto: 0, caminhao: 0 },
  );
  registrar(`Entradas: carro=${contagem.carro}, moto=${contagem.moto}, caminhao=${contagem.caminhao}`);

  // Erro de leitura
  try {
    lerVeiculo('{"placa":"BIC0001","tipo":"bicicleta"}');
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      registrar(`Erro ao ler veículo: ${erro.message}`);
    }
  }
}

// Execução de todos os exercícios, em ordem
for (const [i, exercicio] of [ex01, ex02, ex03, ex04, ex05, ex06, ex07, ex08, ex09, ex10].entries()) {
  console.log(`\n===== Exercício ${String(i + 1).padStart(2, '0')} =====`);
  exercicio();
}
