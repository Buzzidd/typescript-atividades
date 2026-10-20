// Atividade: Tipos em TypeScript
// Aluno: Carlos Vitor Camara Gomes | Ciência da Computação | Centro Universitário São Lucas
// Exercício 02: Cupom fiscal

export {};

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
