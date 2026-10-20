// Atividade: Tipos em TypeScript
// Aluno: Carlos Vitor Camara Gomes | Ciência da Computação | Centro Universitário São Lucas
// Exercício 07: Central de notificações

export {};

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
