
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
  CARACTERE: 'CARACTERE'
};

// Tabela de Símbolos
const symbolTable = {
  identifiers: {},
  constants: {},
};

// Função para adicionar identificadores à tabela de símbolos
function addIdentifier(identifier, value) {
  symbolTable.identifiers[identifier] = { type: TOKEN_TYPES.IDENTIFIER, lexeme: identifier, value };
}

// Função para adicionar constantes à tabela de símbolos
function addConstant(constant, value) {
  symbolTable.constants[constant] = { type: TOKEN_TYPES.CONSTANT, lexeme: constant, value };
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

  while (position < input.length) {
    let char = input[position];

    // Implementação da máquina de estados aqui
    // Exemplo simplificado para identificadores
    if (char.match(/[a-zA-Z]/)) {
      let identifier = '';
      while (position < input.length && char.match(/[a-zA-Z0-9]/)) {
        identifier += char;
        position++;
        column++;
        char = input[position];
      }
      // Adicionando o identificador à tabela de símbolos
      addIdentifier(identifier, undefined); // Valor será definido posteriormente
      return generateToken(TOKEN_TYPES.IDENTIFIER, identifier, undefined, { line, column });
    }

    // Implementação para outros tipos de tokens (comentários, separadores, etc.)
    // Exemplo para separadores
    else if (char === ' ') {
      position++;
      column++;
    }
    // Exemplo para erros léxicos
    else {
      return generateToken(TOKEN_TYPES.ERROR, char, undefined, { line, column });
    }

    // Atualizando a posição e as coordenadas
    if (char === '\n') {
      line++;
      column = 1;
    }
    position++;
    column++;
  }

  // Retorna null quando a entrada é completamente analisada
  return null;
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