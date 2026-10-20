// Atividade: Tipos em TypeScript
// Aluno: Carlos Vitor Camara Gomes | Ciência da Computação | Centro Universitário São Lucas
// Exercício 04: Lista de compras do mês

export {};

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
