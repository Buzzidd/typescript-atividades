// Atividade: Tipos em TypeScript
// Aluno: Carlos Vitor Camara Gomes | Ciência da Computação | Centro Universitário São Lucas
// Exercício 08: Formulário de cadastro

export {};

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
