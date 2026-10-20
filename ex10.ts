// Atividade: Tipos em TypeScript
// Aluno: Carlos Vitor Camara Gomes | Ciência da Computação | Centro Universitário São Lucas
// Exercício 10: Sistema de estacionamento (projeto integrador)

export {};

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
