
// Definindo as palavras reservadas
const palavrasReservadas = ['programa', 'se', 'senao', 'entao', 'enquanto', 'faca', 'repita', 'ate', 'int', 'char', 'float'];

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
function addIdentifier(identifier) {
    let numRegex = /[0-9][0-9]*(\.[0-9][0-9]*)?(E[+-]?[0-9][0-9]*)?/;
    let charRegex = /^'.'$/;

    if (numRegex.test(identifier)) {
        symbolTable[identifier] = { type: TOKEN_TYPES.NUM, value: identifier };
    } else if (charRegex.test(identifier)) {
        symbolTable[identifier] = { type: TOKEN_TYPES.CARACTERE, value: identifier };
    }
    else {
        symbolTable[identifier] = { type: TOKEN_TYPES.IDENTIFIER, lexeme: identifier };
    }
}

// Função para gerar um token
function generateToken(type, lexeme, value, position) {
    if (type == TOKEN_TYPES.ERRO) {
        return {
            type: type,
            lexeme: lexeme,
            value: value,
            position: position
        }
    }
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

            case 'J':
                return generateToken(TOKEN_TYPES.OPERADOR_POTENCIACAO, lexema, undefined, { line, column });

            case 'K':
                return generateToken(TOKEN_TYPES.OPERADOR_RELACIONAL, lexema, 'LT', { line, column });

            case 'L':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BN';
                } else if (char === '<') {
                    estadoAtual = 'BN';
                } else if (char === '+') {
                    estadoAtual = 'BN';
                } else if (char === '/') {
                    estadoAtual = 'BN';
                } else if (char === ';') {
                    estadoAtual = 'BN';
                } else if (char === '\'') {
                    estadoAtual = 'BN';
                } else if (char === '-') {
                    estadoAtual = 'BN';
                } else if (char === '^') {
                    estadoAtual = 'BN';
                } else if (char === '*') {
                    estadoAtual = 'BN';
                } else if (char === '(') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'CL';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'AK';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'AK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'AK';
                } else if (char === 'l') {
                    estadoAtual = 'CM';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'AK';
                } else if (char === 'o') {
                    estadoAtual = 'AK';
                } else if (char === 'p') {
                    estadoAtual = 'AK';
                } else if (char === 'q') {
                    estadoAtual = 'AK';
                } else if (char === 'r') {
                    estadoAtual = 'AK';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'AK';
                } else if (char === 'u') {
                    estadoAtual = 'AK';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'M':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BN';
                } else if (char === '<') {
                    estadoAtual = 'BN';
                } else if (char === '+') {
                    estadoAtual = 'BN';
                } else if (char === '/') {
                    estadoAtual = 'BN';
                } else if (char === ';') {
                    estadoAtual = 'BN';
                } else if (char === '\'') {
                    estadoAtual = 'BN';
                } else if (char === '-') {
                    estadoAtual = 'BN';
                } else if (char === '^') {
                    estadoAtual = 'BN';
                } else if (char === '*') {
                    estadoAtual = 'BN';
                } else if (char === '(') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'CL';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'W';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'AK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'AK';
                } else if (char === 'l') {
                    estadoAtual = 'AK';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'AK';
                } else if (char === 'o') {
                    estadoAtual = 'AK';
                } else if (char === 'p') {
                    estadoAtual = 'AK';
                } else if (char === 'q') {
                    estadoAtual = 'AK';
                } else if (char === 'r') {
                    estadoAtual = 'AK';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'AK';
                } else if (char === 'u') {
                    estadoAtual = 'AK';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'N':
                return generateToken(TOKEN_TYPES.OPERADOR_SUBTRACAO, lexema, null, { line, column });

            case 'O':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'AJ';
                } else if (char === '<') {
                    estadoAtual = 'AJ';
                } else if (char === '+') {
                    estadoAtual = 'AJ';
                } else if (char === '/') {
                    estadoAtual = 'AI';
                } else if (char === ';') {
                    estadoAtual = 'AJ';
                } else if (char === '\'') {
                    estadoAtual = 'AJ';
                } else if (char === '-') {
                    estadoAtual = 'AJ';
                } else if (char === '^') {
                    estadoAtual = 'AJ';
                } else if (char === '*') {
                    estadoAtual = 'AJ';
                } else if (char === '(') {
                    estadoAtual = 'AJ';
                } else if (char === '>') {
                    estadoAtual = 'AJ';
                } else if (char === '=') {
                    estadoAtual = 'AJ';
                } else if (char === '%') {
                    estadoAtual = 'AJ';
                } else if (char === '.') {
                    estadoAtual = 'AJ';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AJ';
                } else if (char === '_') {
                    estadoAtual = 'AJ';
                } else if (char === 'a') {
                    estadoAtual = 'AJ';
                } else if (char === 'c') {
                    estadoAtual = 'AJ';
                } else if (char === 'e') {
                    estadoAtual = 'AJ';
                } else if (char === 'E') {
                    estadoAtual = 'AJ';
                } else if (char === 'f') {
                    estadoAtual = 'AJ';
                } else if (char === 'g') {
                    estadoAtual = 'AJ';
                } else if (char === 'h') {
                    estadoAtual = 'AJ';
                } else if (char === 'i') {
                    estadoAtual = 'AJ';
                } else if (char === 'l') {
                    estadoAtual = 'AJ';
                } else if (char === 'm') {
                    estadoAtual = 'AJ';
                } else if (char === 'n') {
                    estadoAtual = 'AJ';
                } else if (char === 'o') {
                    estadoAtual = 'AJ';
                } else if (char === 'p') {
                    estadoAtual = 'AJ';
                } else if (char === 'q') {
                    estadoAtual = 'AJ';
                } else if (char === 'r') {
                    estadoAtual = 'AJ';
                } else if (char === 's') {
                    estadoAtual = 'AJ';
                } else if (char === 't') {
                    estadoAtual = 'AJ';
                } else if (char === 'u') {
                    estadoAtual = 'AJ';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AJ';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'P':
                return generateToken(TOKEN_TYPES.INICIO_PARENTESES, lexema, null, { line, column });

            case 'Q':
                trata_lockhead();
                return generateToken(TOKEN_TYPES.OPERADOR_DIVISAO, lexema, null, { line, column });

            case 'R':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BN';
                } else if (char === '<') {
                    estadoAtual = 'BN';
                } else if (char === '+') {
                    estadoAtual = 'BN';
                } else if (char === '/') {
                    estadoAtual = 'BN';
                } else if (char === ';') {
                    estadoAtual = 'BN';
                } else if (char === '\'') {
                    estadoAtual = 'BN';
                } else if (char === '-') {
                    estadoAtual = 'BN';
                } else if (char === '^') {
                    estadoAtual = 'BN';
                } else if (char === '*') {
                    estadoAtual = 'BN';
                } else if (char === '(') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'AK';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'AK';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'AK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'AK';
                } else if (char === 'l') {
                    estadoAtual = 'AK';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'AT';
                } else if (char === 'o') {
                    estadoAtual = 'AK';
                } else if (char === 'p') {
                    estadoAtual = 'AK';
                } else if (char === 'q') {
                    estadoAtual = 'AK';
                } else if (char === 'r') {
                    estadoAtual = 'AK';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'AK';
                } else if (char === 'u') {
                    estadoAtual = 'AK';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'S':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BN';
                } else if (char === '<') {
                    estadoAtual = 'BN';
                } else if (char === '+') {
                    estadoAtual = 'BN';
                } else if (char === '/') {
                    estadoAtual = 'BN';
                } else if (char === ';') {
                    estadoAtual = 'BN';
                } else if (char === '\'') {
                    estadoAtual = 'BN';
                } else if (char === '-') {
                    estadoAtual = 'BN';
                } else if (char === '^') {
                    estadoAtual = 'BN';
                } else if (char === '*') {
                    estadoAtual = 'BN';
                } else if (char === '(') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'AK';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'AK';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'AK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'AK';
                } else if (char === 'l') {
                    estadoAtual = 'AK';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'AK';
                } else if (char === 'o') {
                    estadoAtual = 'AK';
                } else if (char === 'p') {
                    estadoAtual = 'AK';
                } else if (char === 'q') {
                    estadoAtual = 'AK';
                } else if (char === 'r') {
                    estadoAtual = 'AK';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'AL';
                } else if (char === 'u') {
                    estadoAtual = 'AK';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'AD':
                return generateToken(TOKEN_TYPES.OPERADOR_RELACIONAL, lexema, 'LE', { line, column });

            case 'AE':
                return generateToken(TOKEN_TYPES.OPERADOR_RELACIONAL, lexema, 'NE', { line, column });

            case 'AF':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BN';
                } else if (char === '<') {
                    estadoAtual = 'BN';
                } else if (char === '+') {
                    estadoAtual = 'BN';
                } else if (char === '/') {
                    estadoAtual = 'BN';
                } else if (char === ';') {
                    estadoAtual = 'BN';
                } else if (char === '\'') {
                    estadoAtual = 'BN';
                } else if (char === '-') {
                    estadoAtual = 'BN';
                } else if (char === '^') {
                    estadoAtual = 'BN';
                } else if (char === '*') {
                    estadoAtual = 'BN';
                } else if (char === '(') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'AK';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'AK';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'AK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'AK';
                } else if (char === 'l') {
                    estadoAtual = 'AK';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'AK';
                } else if (char === 'o') {
                    estadoAtual = 'AK';
                } else if (char === 'p') {
                    estadoAtual = 'AK';
                } else if (char === 'q') {
                    estadoAtual = 'AK';
                } else if (char === 'r') {
                    estadoAtual = 'AU';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'AK';
                } else if (char === 'u') {
                    estadoAtual = 'AK';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'AG':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === '<') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === '+') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === '/') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === ';') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === '\'') {
                    estadoAtual = 'AV';
                } else if (char === '-') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === '^') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === '*') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === '(') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === '>') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === '=') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === '%') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === '.') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (/[0-9]/.test(char)) { //numero
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === '_') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === 'a') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === 'c') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === 'e') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === 'E') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === 'f') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === 'g') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === 'h') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === 'i') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === 'l') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === 'm') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === 'n') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === 'o') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === 'p') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === 'q') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === 'r') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === 's') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === 't') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (char === 'u') {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "'" esperado.`, { line, column });
                }
                break;

            case 'AH':
                char = input[position];
                lexema += char;
                if (char === '%') {
                    estadoAtual = 'AW';
                    break
                }
                break

            case 'AI':
                return generateToken(TOKEN_TYPES.FIM_BLOCO, lexema, null, { line, column });

            case 'AJ':
                return generateToken(TOKEN_TYPES.OPERADOR_MULTIPLICACAO, lexema, null, { line, column });

            case 'AK':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BN';
                } else if (char === '<') {
                    estadoAtual = 'BN';
                } else if (char === '+') {
                    estadoAtual = 'BN';
                } else if (char === '/') {
                    estadoAtual = 'BN';
                } else if (char === ';') {
                    estadoAtual = 'BN';
                } else if (char === '\'') {
                    estadoAtual = 'BN';
                } else if (char === '-') {
                    estadoAtual = 'BN';
                } else if (char === '^') {
                    estadoAtual = 'BN';
                } else if (char === '*') {
                    estadoAtual = 'BN';
                } else if (char === '(') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                }
                break;

            case 'AL':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BN';
                } else if (char === '<') {
                    estadoAtual = 'BN';
                } else if (char === '+') {
                    estadoAtual = 'BN';
                } else if (char === '/') {
                    estadoAtual = 'BN';
                } else if (char === ';') {
                    estadoAtual = 'BN';
                } else if (char === '\'') {
                    estadoAtual = 'BN';
                } else if (char === '-') {
                    estadoAtual = 'BN';
                } else if (char === '^') {
                    estadoAtual = 'BN';
                } else if (char === '*') {
                    estadoAtual = 'BN';
                } else if (char === '(') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (char === 'e') {
                    estadoAtual = 'AY';
                }
                break;

            case 'AM':
                char = input[position];
                lexema += char;
                if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AZ';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "[0-9]" esperado.`, { line, column });
                }
                break;

            // case 'AN':
            //     trata_lockhead();
            //     if (palavrasReservadas.includes(lexema)) {
            //         if (lexema == 'int' || lexema == 'float' || lexema == 'char') {
            //             return generateToken(TOKEN_TYPES.TIPO, lexema, lexema, { line, column });
            //         }

            //         const palavraReservada = palavrasReservadas[palavrasReservadas.indexOf(lexema)].toUpperCase();
            //         return generateToken(TOKEN_TYPES[palavraReservada], lexema, null, { line, column });
            //     }

            //     addIdentifier(lexema);
            //     return generateToken(TOKEN_TYPES.ID, lexema, lexema, { line, column });

            case 'AN':
                trata_lockhead();
                return generateToken(TOKEN_TYPES.SE, lexema, null, { line, column });

            case 'AO':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BN';
                } else if (char === '<') {
                    estadoAtual = 'BN';
                } else if (char === '+') {
                    estadoAtual = 'BN';
                } else if (char === '/') {
                    estadoAtual = 'BN';
                } else if (char === ';') {
                    estadoAtual = 'BN';
                } else if (char === '\'') {
                    estadoAtual = 'BN';
                } else if (char === '-') {
                    estadoAtual = 'BN';
                } else if (char === '^') {
                    estadoAtual = 'BN';
                } else if (char === '*') {
                    estadoAtual = 'BN';
                } else if (char === '(') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'AX';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'AK';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'AK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'AK';
                } else if (char === 'l') {
                    estadoAtual = 'AK';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'AK';
                } else if (char === 'o') {
                    estadoAtual = 'AK';
                } else if (char === 'p') {
                    estadoAtual = 'AK';
                } else if (char === 'q') {
                    estadoAtual = 'AK';
                } else if (char === 'r') {
                    estadoAtual = 'AK';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'AK';
                } else if (char === 'u') {
                    estadoAtual = 'AK';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'AQ':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BN';
                } else if (char === '<') {
                    estadoAtual = 'BN';
                } else if (char === '+') {
                    estadoAtual = 'BN';
                } else if (char === '/') {
                    estadoAtual = 'BN';
                } else if (char === ';') {
                    estadoAtual = 'BN';
                } else if (char === '\'') {
                    estadoAtual = 'BN';
                } else if (char === '-') {
                    estadoAtual = 'BN';
                } else if (char === '^') {
                    estadoAtual = 'BN';
                } else if (char === '*') {
                    estadoAtual = 'BN';
                } else if (char === '(') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'AK';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'AK';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'AK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'AK';
                } else if (char === 'l') {
                    estadoAtual = 'AK';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'AK';
                } else if (char === 'o') {
                    estadoAtual = 'AK';
                } else if (char === 'p') {
                    estadoAtual = 'BA';
                } else if (char === 'q') {
                    estadoAtual = 'AK';
                } else if (char === 'r') {
                    estadoAtual = 'AK';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'AK';
                } else if (char === 'u') {
                    estadoAtual = 'AK';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'AR':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BN';
                } else if (char === '<') {
                    estadoAtual = 'BN';
                } else if (char === '+') {
                    estadoAtual = 'BN';
                } else if (char === '/') {
                    estadoAtual = 'BN';
                } else if (char === ';') {
                    estadoAtual = 'BN';
                } else if (char === '\'') {
                    estadoAtual = 'BN';
                } else if (char === '-') {
                    estadoAtual = 'BN';
                } else if (char === '^') {
                    estadoAtual = 'BN';
                } else if (char === '*') {
                    estadoAtual = 'BN';
                } else if (char === '(') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'AK';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'AK';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'AK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'AK';
                } else if (char === 'l') {
                    estadoAtual = 'AK';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'AK';
                } else if (char === 'o') {
                    estadoAtual = 'AK';
                } else if (char === 'p') {
                    estadoAtual = 'AK';
                } else if (char === 'q') {
                    estadoAtual = 'AK';
                } else if (char === 'r') {
                    estadoAtual = 'AK';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'CD';
                } else if (char === 'u') {
                    estadoAtual = 'AK';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'AS':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BN';
                } else if (char === '<') {
                    estadoAtual = 'BN';
                } else if (char === '+') {
                    estadoAtual = 'BN';
                } else if (char === '/') {
                    estadoAtual = 'BN';
                } else if (char === ';') {
                    estadoAtual = 'BN';
                } else if (char === '\'') {
                    estadoAtual = 'BN';
                } else if (char === '-') {
                    estadoAtual = 'BN';
                } else if (char === '^') {
                    estadoAtual = 'BN';
                } else if (char === '*') {
                    estadoAtual = 'BN';
                } else if (char === '(') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'CB';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'AK';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'AK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'AK';
                } else if (char === 'l') {
                    estadoAtual = 'AK';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'AK';
                } else if (char === 'o') {
                    estadoAtual = 'AK';
                } else if (char === 'p') {
                    estadoAtual = 'AK';
                } else if (char === 'q') {
                    estadoAtual = 'AK';
                } else if (char === 'r') {
                    estadoAtual = 'AK';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'AK';
                } else if (char === 'u') {
                    estadoAtual = 'AK';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'AT':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BN';
                } else if (char === '<') {
                    estadoAtual = 'BN';
                } else if (char === '+') {
                    estadoAtual = 'BN';
                } else if (char === '/') {
                    estadoAtual = 'BN';
                } else if (char === ';') {
                    estadoAtual = 'BN';
                } else if (char === '\'') {
                    estadoAtual = 'BN';
                } else if (char === '-') {
                    estadoAtual = 'BN';
                } else if (char === '^') {
                    estadoAtual = 'BN';
                } else if (char === '*') {
                    estadoAtual = 'BN';
                } else if (char === '(') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'AK';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'AK';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'AK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'AK';
                } else if (char === 'l') {
                    estadoAtual = 'AK';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'AK';
                } else if (char === 'o') {
                    estadoAtual = 'AK';
                } else if (char === 'p') {
                    estadoAtual = 'AK';
                } else if (char === 'q') {
                    estadoAtual = 'BD';
                } else if (char === 'r') {
                    estadoAtual = 'AK';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'BC';
                } else if (char === 'u') {
                    estadoAtual = 'AK';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'AU':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BN';
                } else if (char === '<') {
                    estadoAtual = 'BN';
                } else if (char === '+') {
                    estadoAtual = 'BN';
                } else if (char === '/') {
                    estadoAtual = 'BN';
                } else if (char === ';') {
                    estadoAtual = 'BN';
                } else if (char === '\'') {
                    estadoAtual = 'BN';
                } else if (char === '-') {
                    estadoAtual = 'BN';
                } else if (char === '^') {
                    estadoAtual = 'BN';
                } else if (char === '*') {
                    estadoAtual = 'BN';
                } else if (char === '(') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'AK';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'AK';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'AK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'AK';
                } else if (char === 'l') {
                    estadoAtual = 'AK';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'AK';
                } else if (char === 'o') {
                    estadoAtual = 'BF';
                } else if (char === 'p') {
                    estadoAtual = 'AK';
                } else if (char === 'q') {
                    estadoAtual = 'AK';
                } else if (char === 'r') {
                    estadoAtual = 'AK';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'AK';
                } else if (char === 'u') {
                    estadoAtual = 'AK';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'AV':
                return generateToken(TOKEN_TYPES.CARACTERE, lexema, lexema, { line, column });

            case 'AW':
                return

            case 'AX':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BN';
                } else if (char === '<') {
                    estadoAtual = 'BN';
                } else if (char === '+') {
                    estadoAtual = 'BN';
                } else if (char === '/') {
                    estadoAtual = 'BN';
                } else if (char === ';') {
                    estadoAtual = 'BN';
                } else if (char === '\'') {
                    estadoAtual = 'BN';
                } else if (char === '-') {
                    estadoAtual = 'BN';
                } else if (char === '^') {
                    estadoAtual = 'BN';
                } else if (char === '*') {
                    estadoAtual = 'BN';
                } else if (char === '(') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'AK';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'AK';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'AK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'AK';
                } else if (char === 'l') {
                    estadoAtual = 'AK';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'AK';
                } else if (char === 'o') {
                    estadoAtual = 'BE';
                } else if (char === 'p') {
                    estadoAtual = 'AK';
                } else if (char === 'q') {
                    estadoAtual = 'AK';
                } else if (char === 'r') {
                    estadoAtual = 'AK';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'AK';
                } else if (char === 'u') {
                    estadoAtual = 'AK';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'AY':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BG';
                } else if (char === '<') {
                    estadoAtual = 'BG';
                } else if (char === '+') {
                    estadoAtual = 'BG';
                } else if (char === '/') {
                    estadoAtual = 'BG';
                } else if (char === ';') {
                    estadoAtual = 'BG';
                } else if (char === '\'') {
                    estadoAtual = 'BG';
                } else if (char === '-') {
                    estadoAtual = 'BG';
                } else if (char === '^') {
                    estadoAtual = 'BG';
                } else if (char === '*') {
                    estadoAtual = 'BG';
                } else if (char === '(') {
                    estadoAtual = 'BG';
                } else if (char === '>') {
                    estadoAtual = 'BG';
                } else if (char === '=') {
                    estadoAtual = 'BG';
                } else if (char === '%') {
                    estadoAtual = 'BG';
                } else if (char === '.') {
                    estadoAtual = 'BG';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'AK';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'AK';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'AK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'AK';
                } else if (char === 'l') {
                    estadoAtual = 'AK';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'AK';
                } else if (char === 'o') {
                    estadoAtual = 'AK';
                } else if (char === 'p') {
                    estadoAtual = 'AK';
                } else if (char === 'q') {
                    estadoAtual = 'AK';
                } else if (char === 'r') {
                    estadoAtual = 'AK';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'AK';
                } else if (char === 'u') {
                    estadoAtual = 'AK';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'AZ':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BH';
                } else if (char === '<') {
                    estadoAtual = 'BH';
                } else if (char === '+') {
                    estadoAtual = 'BH';
                } else if (char === '/') {
                    estadoAtual = 'BH';
                } else if (char === ';') {
                    estadoAtual = 'BH';
                } else if (char === '\'') {
                    estadoAtual = 'BH';
                } else if (char === '-') {
                    estadoAtual = 'BH';
                } else if (char === '^') {
                    estadoAtual = 'BH';
                } else if (char === '*') {
                    estadoAtual = 'BH';
                } else if (char === '(') {
                    estadoAtual = 'BH';
                } else if (char === '>') {
                    estadoAtual = 'BH';
                } else if (char === '=') {
                    estadoAtual = 'BH';
                } else if (char === '%') {
                    estadoAtual = 'BH';
                } else if (char === '.') {
                    estadoAtual = 'BH';
                } else if (/[0-9]/.test(char)) { //numero
                    break;
                } else if (char === '_') {
                    estadoAtual = 'BH';
                } else if (char === 'a') {
                    estadoAtual = 'BH';
                } else if (char === 'c') {
                    estadoAtual = 'BH';
                } else if (char === 'e') {
                    estadoAtual = 'BH';
                } else if (char === 'E') {
                    estadoAtual = 'BI';
                } else if (char === 'f') {
                    estadoAtual = 'BH';
                } else if (char === 'g') {
                    estadoAtual = 'BH';
                } else if (char === 'h') {
                    estadoAtual = 'BH';
                } else if (char === 'i') {
                    estadoAtual = 'BH';
                } else if (char === 'l') {
                    estadoAtual = 'BH';
                } else if (char === 'm') {
                    estadoAtual = 'BH';
                } else if (char === 'n') {
                    estadoAtual = 'BH';
                } else if (char === 'o') {
                    estadoAtual = 'BH';
                } else if (char === 'p') {
                    estadoAtual = 'BH';
                } else if (char === 'q') {
                    estadoAtual = 'BH';
                } else if (char === 'r') {
                    estadoAtual = 'BH';
                } else if (char === 's') {
                    estadoAtual = 'BH';
                } else if (char === 't') {
                    estadoAtual = 'BH';
                } else if (char === 'u') {
                    estadoAtual = 'BH';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'BH';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'BA':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BN';
                } else if (char === '<') {
                    estadoAtual = 'BN';
                } else if (char === '+') {
                    estadoAtual = 'BN';
                } else if (char === '/') {
                    estadoAtual = 'BN';
                } else if (char === ';') {
                    estadoAtual = 'BN';
                } else if (char === '\'') {
                    estadoAtual = 'BN';
                } else if (char === '-') {
                    estadoAtual = 'BN';
                } else if (char === '^') {
                    estadoAtual = 'BN';
                } else if (char === '*') {
                    estadoAtual = 'BN';
                } else if (char === '(') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'AK';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'AK';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'AK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'CG';
                } else if (char === 'l') {
                    estadoAtual = 'AK';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'AK';
                } else if (char === 'o') {
                    estadoAtual = 'AK';
                } else if (char === 'p') {
                    estadoAtual = 'AK';
                } else if (char === 'q') {
                    estadoAtual = 'AK';
                } else if (char === 'r') {
                    estadoAtual = 'AK';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'AK';
                } else if (char === 'u') {
                    estadoAtual = 'AK';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'BC':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BN';
                } else if (char === '<') {
                    estadoAtual = 'BN';
                } else if (char === '+') {
                    estadoAtual = 'BN';
                } else if (char === '/') {
                    estadoAtual = 'BN';
                } else if (char === ';') {
                    estadoAtual = 'BN';
                } else if (char === '\'') {
                    estadoAtual = 'BN';
                } else if (char === '-') {
                    estadoAtual = 'BN';
                } else if (char === '^') {
                    estadoAtual = 'BN';
                } else if (char === '*') {
                    estadoAtual = 'BN';
                } else if (char === '(') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'BL';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'AK';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'AK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'AK';
                } else if (char === 'l') {
                    estadoAtual = 'AK';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'AK';
                } else if (char === 'o') {
                    estadoAtual = 'AK';
                } else if (char === 'p') {
                    estadoAtual = 'AK';
                } else if (char === 'q') {
                    estadoAtual = 'AK';
                } else if (char === 'r') {
                    estadoAtual = 'AK';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'AK';
                } else if (char === 'u') {
                    estadoAtual = 'AK';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'BD':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BN';
                } else if (char === '<') {
                    estadoAtual = 'BN';
                } else if (char === '+') {
                    estadoAtual = 'BN';
                } else if (char === '/') {
                    estadoAtual = 'BN';
                } else if (char === ';') {
                    estadoAtual = 'BN';
                } else if (char === '\'') {
                    estadoAtual = 'BN';
                } else if (char === '-') {
                    estadoAtual = 'BN';
                } else if (char === '^') {
                    estadoAtual = 'BN';
                } else if (char === '*') {
                    estadoAtual = 'BN';
                } else if (char === '(') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'AK';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'AK';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'AK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'AK';
                } else if (char === 'l') {
                    estadoAtual = 'AK';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'AK';
                } else if (char === 'o') {
                    estadoAtual = 'AK';
                } else if (char === 'p') {
                    estadoAtual = 'AK';
                } else if (char === 'q') {
                    estadoAtual = 'AK';
                } else if (char === 'r') {
                    estadoAtual = 'AK';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'AK';
                } else if (char === 'u') {
                    estadoAtual = 'BJ';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'BE':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BM';
                } else if (char === '<') {
                    estadoAtual = 'BM';
                } else if (char === '+') {
                    estadoAtual = 'BM';
                } else if (char === '/') {
                    estadoAtual = 'BM';
                } else if (char === ';') {
                    estadoAtual = 'BM';
                } else if (char === '\'') {
                    estadoAtual = 'BM';
                } else if (char === '-') {
                    estadoAtual = 'BM';
                } else if (char === '^') {
                    estadoAtual = 'BM';
                } else if (char === '*') {
                    estadoAtual = 'BM';
                } else if (char === '(') {
                    estadoAtual = 'BM';
                } else if (char === '>') {
                    estadoAtual = 'BM';
                } else if (char === '=') {
                    estadoAtual = 'BM';
                } else if (char === '%') {
                    estadoAtual = 'BM';
                } else if (char === '.') {
                    estadoAtual = 'BM';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'AK';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'AK';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'AK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'AK';
                } else if (char === 'l') {
                    estadoAtual = 'AK';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'AK';
                } else if (char === 'o') {
                    estadoAtual = 'AK';
                } else if (char === 'p') {
                    estadoAtual = 'AK';
                } else if (char === 'q') {
                    estadoAtual = 'AK';
                } else if (char === 'r') {
                    estadoAtual = 'AK';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'AK';
                } else if (char === 'u') {
                    estadoAtual = 'AK';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'BF':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BN';
                } else if (char === '<') {
                    estadoAtual = 'BN';
                } else if (char === '+') {
                    estadoAtual = 'BN';
                } else if (char === '/') {
                    estadoAtual = 'BN';
                } else if (char === ';') {
                    estadoAtual = 'BN';
                } else if (char === '\'') {
                    estadoAtual = 'BN';
                } else if (char === '-') {
                    estadoAtual = 'BN';
                } else if (char === '^') {
                    estadoAtual = 'BN';
                } else if (char === '*') {
                    estadoAtual = 'BN';
                } else if (char === '(') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'AK';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'AK';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'BK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'AK';
                } else if (char === 'l') {
                    estadoAtual = 'AK';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'AK';
                } else if (char === 'o') {
                    estadoAtual = 'AK';
                } else if (char === 'p') {
                    estadoAtual = 'AK';
                } else if (char === 'q') {
                    estadoAtual = 'AK';
                } else if (char === 'r') {
                    estadoAtual = 'AK';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'AK';
                } else if (char === 'u') {
                    estadoAtual = 'AK';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'BG':
                trata_lockhead();
                return generateToken(TOKEN_TYPES.ATE, lexema, null, { line, column });

            case 'BH':
                trata_lockhead();
                return generateToken(TOKEN_TYPES.NUM, lexema, lexema, { line, column });

            case 'BI':
                char = input[position];
                lexema += char;
                if (char === '+' || char === '-') {
                    estadoAtual = 'CW';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'CX';
                } else {
                    generateToken(TOKEN_TYPES.ERRO, lexema, `Erro: "[0-9]" ou "[+-]" esperado.`, { line, column });
                }
                break;

            case 'BJ':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BN';
                } else if (char === '<') {
                    estadoAtual = 'BN';
                } else if (char === '+') {
                    estadoAtual = 'BN';
                } else if (char === '/') {
                    estadoAtual = 'BN';
                } else if (char === ';') {
                    estadoAtual = 'BN';
                } else if (char === '\'') {
                    estadoAtual = 'BN';
                } else if (char === '-') {
                    estadoAtual = 'BN';
                } else if (char === '^') {
                    estadoAtual = 'BN';
                } else if (char === '*') {
                    estadoAtual = 'BN';
                } else if (char === '(') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'BO';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'AK';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'AK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'AK';
                } else if (char === 'l') {
                    estadoAtual = 'AK';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'AK';
                } else if (char === 'o') {
                    estadoAtual = 'AK';
                } else if (char === 'p') {
                    estadoAtual = 'AK';
                } else if (char === 'q') {
                    estadoAtual = 'AK';
                } else if (char === 'r') {
                    estadoAtual = 'AK';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'AK';
                } else if (char === 'u') {
                    estadoAtual = 'AK';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'BK':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BN';
                } else if (char === '<') {
                    estadoAtual = 'BN';
                } else if (char === '+') {
                    estadoAtual = 'BN';
                } else if (char === '/') {
                    estadoAtual = 'BN';
                } else if (char === ';') {
                    estadoAtual = 'BN';
                } else if (char === '\'') {
                    estadoAtual = 'BN';
                } else if (char === '-') {
                    estadoAtual = 'BN';
                } else if (char === '^') {
                    estadoAtual = 'BN';
                } else if (char === '*') {
                    estadoAtual = 'BN';
                } else if (char === '(') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'AK';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'AK';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'AK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'AK';
                } else if (char === 'l') {
                    estadoAtual = 'AK';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'AK';
                } else if (char === 'o') {
                    estadoAtual = 'AK';
                } else if (char === 'p') {
                    estadoAtual = 'AK';
                } else if (char === 'q') {
                    estadoAtual = 'AK';
                } else if (char === 'r') {
                    estadoAtual = 'BT';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'AK';
                } else if (char === 'u') {
                    estadoAtual = 'AK';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'BL':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BN';
                } else if (char === '<') {
                    estadoAtual = 'BN';
                } else if (char === '+') {
                    estadoAtual = 'BN';
                } else if (char === '/') {
                    estadoAtual = 'BN';
                } else if (char === ';') {
                    estadoAtual = 'BN';
                } else if (char === '\'') {
                    estadoAtual = 'BN';
                } else if (char === '-') {
                    estadoAtual = 'BN';
                } else if (char === '^') {
                    estadoAtual = 'BN';
                } else if (char === '*') {
                    estadoAtual = 'BN';
                } else if (char === '(') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'AK';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'AK';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'AK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'AK';
                } else if (char === 'l') {
                    estadoAtual = 'AK';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'AK';
                } else if (char === 'o') {
                    estadoAtual = 'BW';
                } else if (char === 'p') {
                    estadoAtual = 'AK';
                } else if (char === 'q') {
                    estadoAtual = 'AK';
                } else if (char === 'r') {
                    estadoAtual = 'AK';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'AK';
                } else if (char === 'u') {
                    estadoAtual = 'AK';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'BM':
                trata_lockhead();
                return generateToken(TOKEN_TYPES.SENAO, lexema, null, { line, column });
            case 'BN':
                trata_lockhead();
                return generateToken(TOKEN_TYPES.ID, lexema, lexema, { line, column });

            case 'BO':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BN';
                } else if (char === '<') {
                    estadoAtual = 'BN';
                } else if (char === '+') {
                    estadoAtual = 'BN';
                } else if (char === '/') {
                    estadoAtual = 'BN';
                } else if (char === ';') {
                    estadoAtual = 'BN';
                } else if (char === '\'') {
                    estadoAtual = 'BN';
                } else if (char === '-') {
                    estadoAtual = 'BN';
                } else if (char === '^') {
                    estadoAtual = 'BN';
                } else if (char === '*') {
                    estadoAtual = 'BN';
                } else if (char === '(') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'AK';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'AK';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'AK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'AK';
                } else if (char === 'l') {
                    estadoAtual = 'AK';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'BP';
                } else if (char === 'o') {
                    estadoAtual = 'AK';
                } else if (char === 'p') {
                    estadoAtual = 'AK';
                } else if (char === 'q') {
                    estadoAtual = 'AK';
                } else if (char === 'r') {
                    estadoAtual = 'AK';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'AK';
                } else if (char === 'u') {
                    estadoAtual = 'AK';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'BP':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BN';
                } else if (char === '<') {
                    estadoAtual = 'BN';
                } else if (char === '+') {
                    estadoAtual = 'BN';
                } else if (char === '/') {
                    estadoAtual = 'BN';
                } else if (char === ';') {
                    estadoAtual = 'BN';
                } else if (char === '\'') {
                    estadoAtual = 'BN';
                } else if (char === '-') {
                    estadoAtual = 'BN';
                } else if (char === '^') {
                    estadoAtual = 'BN';
                } else if (char === '*') {
                    estadoAtual = 'BN';
                } else if (char === '(') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'AK';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'AK';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'AK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'AK';
                } else if (char === 'l') {
                    estadoAtual = 'AK';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'AK';
                } else if (char === 'o') {
                    estadoAtual = 'AK';
                } else if (char === 'p') {
                    estadoAtual = 'AK';
                } else if (char === 'q') {
                    estadoAtual = 'AK';
                } else if (char === 'r') {
                    estadoAtual = 'AK';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'BQ';
                } else if (char === 'u') {
                    estadoAtual = 'AK';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'BQ':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BN';
                } else if (char === '<') {
                    estadoAtual = 'BN';
                } else if (char === '+') {
                    estadoAtual = 'BN';
                } else if (char === '/') {
                    estadoAtual = 'BN';
                } else if (char === ';') {
                    estadoAtual = 'BN';
                } else if (char === '\'') {
                    estadoAtual = 'BN';
                } else if (char === '-') {
                    estadoAtual = 'BN';
                } else if (char === '^') {
                    estadoAtual = 'BN';
                } else if (char === '*') {
                    estadoAtual = 'BN';
                } else if (char === '(') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'AK';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'AK';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'AK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'AK';
                } else if (char === 'l') {
                    estadoAtual = 'AK';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'AK';
                } else if (char === 'o') {
                    estadoAtual = 'BR';
                } else if (char === 'p') {
                    estadoAtual = 'AK';
                } else if (char === 'q') {
                    estadoAtual = 'AK';
                } else if (char === 'r') {
                    estadoAtual = 'AK';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'AK';
                } else if (char === 'u') {
                    estadoAtual = 'AK';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'BR':
                char = input[position];
                lexema += char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'BS';
                } else if (char === '<') {
                    estadoAtual = 'BS';
                } else if (char === '+') {
                    estadoAtual = 'BS';
                } else if (char === '/') {
                    estadoAtual = 'BS';
                } else if (char === ';') {
                    estadoAtual = 'BS';
                } else if (char === '\'') {
                    estadoAtual = 'BS';
                } else if (char === '-') {
                    estadoAtual = 'BS';
                } else if (char === '^') {
                    estadoAtual = 'BS';
                } else if (char === '*') {
                    estadoAtual = 'BS';
                } else if (char === '(') {
                    estadoAtual = 'BS';
                } else if (char === '>') {
                    estadoAtual = 'BS';
                } else if (char === '=') {
                    estadoAtual = 'BS';
                } else if (char === '%') {
                    estadoAtual = 'BS';
                } else if (char === '.') {
                    estadoAtual = 'BS';
                } else if (/[0-9]/.test(char)) { //numero
                    estadoAtual = 'AK';
                } else if (char === '_') {
                    estadoAtual = 'AK';
                } else if (char === 'a') {
                    estadoAtual = 'AK';
                } else if (char === 'c') {
                    estadoAtual = 'AK';
                } else if (char === 'e') {
                    estadoAtual = 'AK';
                } else if (char === 'E') {
                    estadoAtual = 'AK';
                } else if (char === 'f') {
                    estadoAtual = 'AK';
                } else if (char === 'g') {
                    estadoAtual = 'AK';
                } else if (char === 'h') {
                    estadoAtual = 'AK';
                } else if (char === 'i') {
                    estadoAtual = 'AK';
                } else if (char === 'l') {
                    estadoAtual = 'AK';
                } else if (char === 'm') {
                    estadoAtual = 'AK';
                } else if (char === 'n') {
                    estadoAtual = 'AK';
                } else if (char === 'o') {
                    estadoAtual = 'AK';
                } else if (char === 'p') {
                    estadoAtual = 'AK';
                } else if (char === 'q') {
                    estadoAtual = 'AK';
                } else if (char === 'r') {
                    estadoAtual = 'AK';
                } else if (char === 's') {
                    estadoAtual = 'AK';
                } else if (char === 't') {
                    estadoAtual = 'AK';
                } else if (char === 'u') {
                    estadoAtual = 'AK';
                } else if (/[a-zA-Z]/.test(char)) { //demais letras
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    generateToken(TOKEN_TYPES.ERRO, lexema, undefined, { line, column });
                }
                break;

            case 'BS':
                trata_lockhead();
                return generateToken(TOKEN_TYPES.ENQUANTO, lexema, null, { line, column });

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


