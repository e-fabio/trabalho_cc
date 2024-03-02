
// Definindo os tipos de tokens
const TOKEN_TYPES = {
  PROGRAMA: 'PROGRAMA',
  INICIO_BLOCO: 'INICIO_BLOCO',
  FIM_BLOCO: 'FIM_BLOCO',
  TIPO: 'TIPO',
  SE: 'SE',
  INICIO_PARENTESES: 'INICIO_PARENTESES',
  FIM_PARENTESES: 'FIM_PARENTESES',
  ENTAO: 'ENTAO',
  SENAO: 'SENAO',
  COMENTARIO: 'COMENTARIO',
  ENQUANTO: 'ENQUANTO',
  FACA: 'FACA',
  REPITA: 'REPITA',
  ATE: 'ATE',
  ID: 'ID',
  OPERADOR_RELACIONAL: 'OPERADOR_RELACIONAL',
  OPERADOR_SOMA: 'OPERADOR_SOMA',
  OPERADOR_SUBTRACAO: 'OPERADOR_SUBTRACAO',
  OPERADOR_MULTIPLICACAO: 'OPERADOR_MULTIPLICACAO',
  OPERADOR_DIVISAO: 'OPERADOR_DIVISAO',
  OPERADOR_POTENCIACAO: 'OPERADOR_POTENCIACAO',
  DECLARACAO: 'DECLARACAO',
  ATRIBUICAO: 'ATRIBUICAO',
  PONTO_VIRGULA: 'PONTO_VIRGULA',
  NUM: 'NUM',
  SEPARADOR: 'SEPARADOR',
  VIRGULA: 'VIRGULA',
  CARACTERE: 'CARACTERE',
  ERRO: 'ERRO'
};

// Tabela de Símbolos
const symbolTable = {};

// Função para adicionar identificadores à tabela de símbolos
function addIdentifier(identifier, value) {
  symbolTable[identifier] = { type: TOKEN_TYPES.IDENTIFIER, lexeme: identifier, value };
}

// Função para gerar um token
function generateToken(type, lexeme, value, position) {
  return { type, lexeme, value, position };
}

// Função principal do analisador léxico
function lexicalAnalyzer(input) {
  let position = 0;
  let line = 1;
  let column = 1;

  let estadoInicial = 'A';
  let estadoAtual = estadoInicial;

  let lexema = '';

  while (true) {

    let char = '';

    switch (estadoAtual) {
      case 'A':
        char = input[position];
        lexema += char;
        if (/[\s\t\n]/.test(char)) {
          estadoAtual = 'B';
        } else if (char === '<') {
          estadoAtual = 'C';
        } else if (char === '+') {
          estadoAtual = 'D';
        } else if (char === '/') {
          estadoAtual = 'E';
        } else if (char === ';') {
          estadoAtual = 'F';
        } else if (char === '\'') {
          estadoAtual = 'G';
        } else if (char === '-') {
          estadoAtual = 'I';
        } else if (char === '^') {
          estadoAtual = 'J';
        } else if (char === '*') {
          estadoAtual = 'O';
        } else if (char === '(') {
          estadoAtual = 'P';
        } else if (char === '>') {
          estadoAtual = 'V';
        } else if (char === '=') {
          estadoAtual = 'X';
        } else if (char === '%') {
          estadoAtual = 'AH';
        } else if (char === '.') {
          //erro
          return false;
        } else if (/[0-9]/.test(char)) { //numero
          estadoAtual = 'H';
        } else if (char === '_') {
          estadoAtual = 'AK';
        } else if (char === 'a') {
          estadoAtual = 'S';
        } else if (char === 'c') {
          estadoAtual = 'AC';
        } else if (char === 'e') {
          estadoAtual = 'R';
        } else if (char === 'E') {
          estadoAtual = 'AK';
        } else if (char === 'f') {
          estadoAtual = 'L';
        } else if (char === 'g') {
          estadoAtual = 'AK';
        } else if (char === 'h') {
          estadoAtual = 'AK';
        } else if (char === 'i') {
          estadoAtual = 'AB';
        } else if (char === 'l') {
          estadoAtual = 'AK';
        } else if (char === 'm') {
          estadoAtual = 'AK';
        } else if (char === 'n') {
          estadoAtual = 'AK';
        } else if (char === 'o') {
          estadoAtual = 'AK';
        } else if (char === 'p') {
          estadoAtual = 'AF';
        } else if (char === 'q') {
          estadoAtual = 'AK';
        } else if (char === 'r') {
          estadoAtual = 'AA';
        } else if (char === 's') {
          estadoAtual = 'M';
        } else if (char === 't') {
          estadoAtual = 'AK';
        } else if (char === 'u') {
          estadoAtual = 'AK';
        } else if (/[a-zA-Z]/.test(char)) { //demais letras
          estadoAtual = 'AK';
        } else {
          //erro - transição não definida
          return false;
        }
        break;

      default:
        return generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
    }

    // Atualizando a posição e as coordenadas
    if (char == '\n') {
      line++;
      column = 1;
    }
    position++;
    column++;

    // se for estado final retornar o token 
    // return generateToken(TOKEN_TYPES.IDENTIFIER, identifier, undefined, { line, column });

    // se for identificador ou num tem que adicionar na tabela de símbolos
    // addIdentifier(identifier, undefined); // Valor será definido posteriormente
  }
}

// Exemplo de uso
const input = "int a = 10; // Comentário\nconst b = 20;";
const tokens = [];
let token = lexicalAnalyzer(input);
while (token) {
  tokens.push(token);
  token = lexicalAnalyzer(input.slice(token.position.column - 1));
}
console.log(tokens);


