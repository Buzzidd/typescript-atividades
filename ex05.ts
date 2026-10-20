// Atividade: Tipos em TypeScript
// Aluno: Carlos Vitor Camara Gomes | Ciência da Computação | Centro Universitário São Lucas
// Exercício 05: Boletim do clima

export {};

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
