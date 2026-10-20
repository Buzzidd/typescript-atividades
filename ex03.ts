// Atividade: Tipos em TypeScript
// Aluno: Carlos Vitor Camara Gomes | Ciência da Computação | Centro Universitário São Lucas
// Exercício 03: Ficha de paciente

export {};

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
