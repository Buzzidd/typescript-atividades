// Atividade: Tipos em TypeScript
// Aluno: Carlos Vitor Camara Gomes | Ciência da Computação | Centro Universitário São Lucas
// Exercício 09: Lendo a resposta de uma API de clima

export {};

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
