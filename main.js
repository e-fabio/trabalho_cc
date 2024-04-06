
class Token {
    constructor(tipo, lexema, atributo, posicao) {
        this.tipo = tipo;
        this.lexema = lexema;
        this.atributo = atributo;
        this.posicao = posicao;
    }
}

// adicionar apenas no léxico ???
var linha = 1;
var coluna = 0;
var posicao = 0;
// const tokens = [];

// Definindo os tipos de tokens
const TIPO_TOKEN = {
    PROGRAMA: 'programa',
    INICIO_BLOCO: '/*',
    FIM_BLOCO: '*/',
    TIPO: 'tipo',
    SE: 'se',
    INICIO_PARENTESES: '(',
    FIM_PARENTESES: ')',
    ENTAO: 'entao',
    SENAO: 'senao',
    COMENTARIO: '%',
    ENQUANTO: 'enquanto',
    FACA: 'faca',
    REPITA: 'repita',
    ATE: 'ate',
    ID: 'id',
    OPERADOR_RELACIONAL: 'opRelacional',
    OPERADOR_SOMA: '+',
    OPERADOR_SUBTRACAO: '-',
    OPERADOR_MULTIPLICACAO: '*',
    OPERADOR_DIVISAO: '/',
    OPERADOR_POTENCIACAO: '^',
    DECLARACAO: '->',
    ATRIBUICAO: '<-',
    PONTO_VIRGULA: ';',
    NUM: 'num',
    SEPARADOR: 'ws',
    VIRGULA: ',',
    CARACTERE: 'CARACTERE',
    ERRO: 'ERRO'
};

// Tabela de Símbolos
const tabelaSimbolos = {};

// Função para adicionar identificadores, números ou caracteres na tabela de símbolos
function adicionar_tabelaSimbolos(tipo, lexema) {
    tabelaSimbolos[lexema] = { tipo: tipo, lexema: lexema };
}

// Função para buscar na tabela de símbolos
function buscar_tabelaSimbolos(lexema) {
    return tabelaSimbolos[lexema];
}

// Função para gerar um token
function gerar_token(tipo, lexema, atributo, posicao) {
    posicao.coluna = posicao.coluna - lexema.length + 1;
    return new Token(tipo, lexema, atributo, posicao);
}

function trata_lockhead(lexema) {
    coluna = coluna - 1;
    posicao = posicao - 1;

    if (posicao == codigo.length) {
        return lexema.slice(0, lexema.length);
    } else {
        return lexema.slice(0, lexema.length - 1);
    }
}

// Função principal do analisador léxico
function analisador_lexico(input) {

    let estadoInicial = 'A';
    let estadoAtual = estadoInicial;

    let lexema = '';
    let char = '';

    while (posicao <= input.length + 1) {

        char = '';

        switch (estadoAtual) {
            case 'A':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'CZ';
                } else if (char === '>') {
                    estadoAtual = 'V';
                } else if (char === '=') {
                    estadoAtual = 'X';
                } else if (char === '%') {
                    estadoAtual = 'AH';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (char === ',') {
                    estadoAtual = 'DB';
                } else if (/[0-9]/.test(char)) {
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
                } else if (char == 'i') {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'B':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (/[\s\t\n]/.test(char)) {
                    estadoAtual = 'B';
                } else {
                    estadoAtual = 'K';
                }
                break;

            case 'C':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char == '-') {
                    estadoAtual = 'N';
                } else if (char == '=') {
                    estadoAtual = 'AD';
                } else if (char == '>') {
                    estadoAtual = 'AE';
                } else {
                    estadoAtual = 'CK';
                }
                break;

            case 'D':
                return gerar_token(TIPO_TOKEN.OPERADOR_SOMA, lexema, undefined, { linha, coluna });

            case 'E':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char === '*') {
                    estadoAtual = 'CV';
                } else {
                    estadoAtual = 'Q';
                }
                break;

            case 'F':
                return gerar_token(TIPO_TOKEN.PONTO_VIRGULA, lexema, undefined, { linha, coluna });

            case 'G':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (/[^']/.test('' + char + '')) {
                    estadoAtual = 'AG';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'H':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char === '.') {
                    estadoAtual = 'AM';
                } else if (char === 'E') {
                    estadoAtual = 'BI';
                } else if (/[0-9]/.test(char)) {
                    estadoAtual = 'H';
                } else {
                    estadoAtual = 'U';
                }
                break;

            case 'I':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char === '>') {
                    estadoAtual = 'T';
                } else {
                    estadoAtual = 'CU';
                }
                break;

            case 'J':
                return gerar_token(TIPO_TOKEN.OPERADOR_POTENCIACAO, lexema, undefined, { linha, coluna });

            case 'K':
                lexema = trata_lockhead(lexema);
                return gerar_token(TIPO_TOKEN.SEPARADOR, lexema, undefined, { linha, coluna });

            case 'L':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (char === ',') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'M':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (char === ',') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'N':
                return gerar_token(TIPO_TOKEN.ATRIBUICAO, lexema, undefined, { linha, coluna });

            case 'O':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'AJ';
                } else if (char === '>') {
                    estadoAtual = 'AJ';
                } else if (char === '=') {
                    estadoAtual = 'AJ';
                } else if (char === '%') {
                    estadoAtual = 'AJ';
                } else if (char === '.') {
                    estadoAtual = 'AJ';
                } else if (char === ',') {
                    estadoAtual = 'AJ';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AJ';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'P':
                return gerar_token(TIPO_TOKEN.INICIO_PARENTESES, lexema, undefined, { linha, coluna });

            case 'Q':
                lexema = trata_lockhead(lexema);
                return gerar_token(TIPO_TOKEN.OPERADOR_DIVISAO, lexema, undefined, { linha, coluna });

            case 'R':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (char === ',') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'S':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (char === ',') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'T':
                return gerar_token(TIPO_TOKEN.DECLARACAO, lexema, undefined, { linha, coluna });

            case 'U':
                lexema = trata_lockhead(lexema);
                if (buscar_tabelaSimbolos(lexema) == undefined) {
                    adicionar_tabelaSimbolos(TIPO_TOKEN.NUM, lexema);
                }
                return gerar_token(TIPO_TOKEN.NUM, lexema, lexema, { linha, coluna });

            case 'V':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char === '=') {
                    estadoAtual = 'Z';
                } else {
                    estadoAtual = 'Y';
                }
                break;

            case 'W':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char === 'n') {
                    estadoAtual = 'AO';
                } else if (/[a-zA-Z0-9_]/.test(char) && char != undefined) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'AN';
                }
                break;

            case 'X':
                return gerar_token(TIPO_TOKEN.OPERADOR_RELACIONAL, lexema, 'EQ', { linha, coluna });

            case 'Y':
                lexema = trata_lockhead(lexema);
                return gerar_token(TIPO_TOKEN.OPERADOR_RELACIONAL, lexema, 'GT', { linha, coluna });

            case 'Z':
                return gerar_token(TIPO_TOKEN.OPERADOR_RELACIONAL, lexema, 'GE', { linha, coluna });

            case 'AA':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char === 'e') {
                    estadoAtual = 'AQ';
                } else if (/[a-zA-Z0-9_]/.test(char) && char != undefined) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'BN';
                }
                break;

            case 'AB':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char === 'n') {
                    estadoAtual = 'AR';
                } else if (/[a-zA-Z0-9_]/.test(char) && char != undefined) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'BN';
                }
                break;

            case 'AC':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char === 'h') {
                    estadoAtual = 'AS';
                } else if (/[a-zA-Z0-9_]/.test(char) && char != undefined) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'BN';
                }
                break;

            case 'AD':
                return gerar_token(TIPO_TOKEN.OPERADOR_RELACIONAL, lexema, 'LE', { linha, coluna });

            case 'AE':
                return gerar_token(TIPO_TOKEN.OPERADOR_RELACIONAL, lexema, 'NE', { linha, coluna });

            case 'AF':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (char === ',') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'AG':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (/[\s\t\n]/.test(char)) {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === '<') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === '+') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === '/') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === ';') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === '\'') {
                    estadoAtual = 'AV';
                } else if (char === '-') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === '^') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === '*') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === '(') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === ')') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === '>') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === '=') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === '%') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === '.') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === ',') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                } else if (/[0-9]/.test(char)) {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === '_') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'a') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'c') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'e') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'E') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'f') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'g') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'h') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'i') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'l') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'm') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'n') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'o') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'p') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'q') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'r') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 's') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 't') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'u') {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (/[a-zA-Z]/.test(char)) {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                }
                break;

            case 'AH':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char == '%') {
                    estadoAtual = 'AW';
                }
                break;

            case 'AI':
                return gerar_token(TIPO_TOKEN.FIM_BLOCO, lexema, undefined, { linha, coluna });

            case 'AJ':
                return gerar_token(TIPO_TOKEN.OPERADOR_MULTIPLICACAO, lexema, undefined, { linha, coluna });

            case 'AK':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
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
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
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
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (/[0-9]/.test(char)) {
                    estadoAtual = 'AZ';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "[0-9]" esperado.`, { linha, coluna });
                }
                break;

            case 'AN':
                lexema = trata_lockhead(lexema);
                return gerar_token(TIPO_TOKEN.SE, lexema, undefined, { linha, coluna });

            case 'AO':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (char === ',') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'AQ':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (char === ',') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'AR':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (char === ',') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'AS':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (char === ',') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'AT':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (char === ',') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'AU':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (char === ',') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'AV':
                if (buscar_tabelaSimbolos(lexema) == undefined) {
                    adicionar_tabelaSimbolos(TIPO_TOKEN.CARACTERE, lexema);
                }
                return gerar_token(TIPO_TOKEN.CARACTERE, lexema, lexema, { linha, coluna });

            case 'AW':
                return gerar_token(TIPO_TOKEN.COMENTARIO, lexema, lexema, { linha, coluna });

            case 'AX':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (char === ',') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'AY':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char == undefined) {
                    estadoAtual = 'BG';
                } else if (/[\s\t\n]/.test(char)) {
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
                } else if (char === ')') {
                    estadoAtual = 'BG';
                } else if (char === '>') {
                    estadoAtual = 'BG';
                } else if (char === '=') {
                    estadoAtual = 'BG';
                } else if (char === '%') {
                    estadoAtual = 'BG';
                } else if (char === '.') {
                    estadoAtual = 'BG';
                } else if (char === ',') {
                    estadoAtual = 'BG';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'AZ':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'BH';
                } else if (char === '>') {
                    estadoAtual = 'BH';
                } else if (char === '=') {
                    estadoAtual = 'BH';
                } else if (char === '%') {
                    estadoAtual = 'BH';
                } else if (char === '.') {
                    estadoAtual = 'BH';
                } else if (char === ',') {
                    estadoAtual = 'BH';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'BH';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'BA':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (char === ',') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'BC':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (char === ',') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'BD':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (char === ',') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'BE':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char == undefined) {
                    estadoAtual = 'BM';
                } else if (/[\s\t\n]/.test(char)) {
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
                } else if (char === ')') {
                    estadoAtual = 'BM';
                } else if (char === '>') {
                    estadoAtual = 'BM';
                } else if (char === '=') {
                    estadoAtual = 'BM';
                } else if (char === '%') {
                    estadoAtual = 'BM';
                } else if (char === '.') {
                    estadoAtual = 'BM';
                } else if (char === ',') {
                    estadoAtual = 'BM';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'BF':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (char === ',') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'BG':
                lexema = trata_lockhead(lexema);
                return gerar_token(TIPO_TOKEN.ATE, lexema, undefined, { linha, coluna });

            case 'BH':
                lexema = trata_lockhead(lexema);
                if (buscar_tabelaSimbolos(lexema) == undefined) {
                    adicionar_tabelaSimbolos(TIPO_TOKEN.NUM, lexema);
                }
                return gerar_token(TIPO_TOKEN.NUM, lexema, lexema, { linha, coluna });

            case 'BI':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char === '+') {
                    estadoAtual = 'CW';
                } else if (char === '-') {
                    estadoAtual = 'CW';
                } else if (/[0-9]/.test(char)) {
                    estadoAtual = 'CX';
                } else {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "[0-9]" ou "[+-]" esperado.`, { linha, coluna });
                }
                break;

            case 'BJ':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (char === ',') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'BK':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (char === ',') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'BL':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (char === ',') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'BM':
                lexema = trata_lockhead(lexema);
                return gerar_token(TIPO_TOKEN.SENAO, lexema, undefined, { linha, coluna });

            case 'BN':
                lexema = trata_lockhead(lexema);
                if (buscar_tabelaSimbolos(lexema) == undefined) {
                    adicionar_tabelaSimbolos(TIPO_TOKEN.ID, lexema);
                }
                return gerar_token(TIPO_TOKEN.ID, lexema, lexema, { linha, coluna });

            case 'BO':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (char === ',') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'BP':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (char === ',') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'BQ':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                } else if (char === ')') {
                    estadoAtual = 'BN';
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
                    estadoAtual = 'BN';
                } else if (char === ',') {
                    estadoAtual = 'BN';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'BR':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char == undefined) {
                    estadoAtual = 'BS';
                } else if (/[\s\t\n]/.test(char)) {
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
                } else if (char === ')') {
                    estadoAtual = 'BS';
                } else if (char === '>') {
                    estadoAtual = 'BS';
                } else if (char === '=') {
                    estadoAtual = 'BS';
                } else if (char === '%') {
                    estadoAtual = 'BS';
                } else if (char === '.') {
                    estadoAtual = 'BS';
                } else if (char === ',') {
                    estadoAtual = 'BS';
                } else if (/[0-9]/.test(char)) {
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
                } else if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    //erro - transição não definida
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'BS':
                lexema = trata_lockhead(lexema);
                return gerar_token(TIPO_TOKEN.ENQUANTO, lexema, undefined, { linha, coluna });

            case 'BT':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char === 'a') {
                    estadoAtual = 'BU';
                } else if (/[a-zA-Z0-9_]/.test(char) && char != undefined) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'BN';
                }
                break;

            case 'BU':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char === 'm') {
                    estadoAtual = 'BX';
                } else if (/[a-zA-Z0-9_]/.test(char) && char != undefined) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'BN';
                }
                break;

            case 'BW':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (/[a-zA-Z0-9_]/.test(char) && char != undefined) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'DA';
                }
                break;

            case 'BX':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char === 'a') {
                    estadoAtual = 'BY';
                } else if (/[a-zA-Z0-9_]/.test(char) && char != undefined) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'BN';
                }
                break;

            case 'BY':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (/[a-zA-Z0-9_]/.test(char) && char != undefined) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'BZ';
                }
                break;

            case 'BZ':
                lexema = trata_lockhead(lexema);
                return gerar_token(TIPO_TOKEN.PROGRAMA, lexema, undefined, { linha, coluna });

            case 'CB':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char === 'r') {
                    estadoAtual = 'CC';
                } else if (/[a-zA-Z0-9_]/.test(char) && char != undefined) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'BN';
                }
                break;

            case 'CC':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (/[a-zA-Z0-9_]/.test(char) && char != undefined) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'CF';
                }
                break;

            case 'CD':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (/[a-zA-Z0-9_]/.test(char) && char != undefined) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'CE';
                }
                break;

            case 'CE':
                lexema = trata_lockhead(lexema);
                return gerar_token(TIPO_TOKEN.TIPO, lexema, 'int', { linha, coluna });

            case 'CF':
                lexema = trata_lockhead(lexema);
                return gerar_token(TIPO_TOKEN.TIPO, lexema, 'char', { linha, coluna });

            case 'CG':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char === 't') {
                    estadoAtual = 'CH';
                } else if (/[a-zA-Z0-9_]/.test(char) && char != undefined) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'BN';
                }
                break;

            case 'CH':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char === 'a') {
                    estadoAtual = 'CI';
                } else if (/[a-zA-Z0-9_]/.test(char) && char != undefined) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'BN';
                }
                break;

            case 'CI':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (/[a-zA-Z0-9_]/.test(char) && char != undefined) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'CJ';
                }
                break;

            case 'CJ':
                lexema = trata_lockhead(lexema);
                return gerar_token(TIPO_TOKEN.REPITA, lexema, undefined, { linha, coluna });

            case 'CK':
                lexema = trata_lockhead(lexema);
                return gerar_token(TIPO_TOKEN.OPERADOR_RELACIONAL, lexema, 'LT', { linha, coluna });

            case 'CL':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char === 'c') {
                    estadoAtual = 'CO';
                } else if (/[a-zA-Z0-9_]/.test(char) && char != undefined) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'BN';
                }
                break;

            case 'CM':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char === 'o') {
                    estadoAtual = 'CN';
                } else if (/[a-zA-Z0-9_]/.test(char) && char != undefined) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'BN';
                }
                break;

            case 'CN':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char === 'a') {
                    estadoAtual = 'CP';
                } else if (/[a-zA-Z0-9_]/.test(char) && char != undefined) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'BN';
                }
                break;

            case 'CO':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char === 'a') {
                    estadoAtual = 'CQ';
                } else if (/[a-zA-Z0-9_]/.test(char) && char != undefined) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'BN';
                }
                break;

            case 'CP':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char === 't') {
                    estadoAtual = 'CR';
                } else if (/[a-zA-Z0-9_]/.test(char) && char != undefined) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'BN';
                }
                break;

            case 'CQ':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (/[a-zA-Z0-9_]/.test(char) && char != undefined) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'CT';
                }
                break;

            case 'CR':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (/[a-zA-Z0-9_]/.test(char) && char != undefined) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'CS';
                }
                break;

            case 'CS':
                lexema = trata_lockhead(lexema);
                return gerar_token(TIPO_TOKEN.TIPO, lexema, 'float', { linha, coluna });

            case 'CT':
                lexema = trata_lockhead(lexema);
                return gerar_token(TIPO_TOKEN.FACA, lexema, undefined, { linha, coluna });

            case 'CU':
                lexema = trata_lockhead(lexema);
                return gerar_token(TIPO_TOKEN.OPERADOR_SUBTRACAO, lexema, undefined, { linha, coluna });

            case 'CV':
                return gerar_token(TIPO_TOKEN.INICIO_BLOCO, lexema, undefined, { linha, coluna });

            case 'CW':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (/[0-9]/.test(char)) {
                    estadoAtual = 'CX';
                } else {
                    return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'CX':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (/[0-9]/.test(char)) {
                    estadoAtual = 'CX';
                } else {
                    estadoAtual = 'CY';
                }
                break;

            case 'CY':
                lexema = trata_lockhead(lexema);
                if (buscar_tabelaSimbolos(lexema) == undefined) {
                    adicionar_tabelaSimbolos(TIPO_TOKEN.NUM, lexema);
                }
                return gerar_token(TIPO_TOKEN.NUM, lexema, lexema, { linha, coluna });

            case 'CZ':
                return gerar_token(TIPO_TOKEN.FIM_PARENTESES, lexema, lexema, { linha, coluna });

            case 'DA':
                lexema = trata_lockhead(lexema);
                return gerar_token(TIPO_TOKEN.ENTAO, lexema, undefined, { linha, coluna });

            case 'DB':
                return gerar_token(TIPO_TOKEN.VIRGULA, lexema, undefined, { linha, coluna });

            default:
                return gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
        }

        // Atualizando a posição e as coordenadas
        if (char == '\n') {
            linha++;
            coluna = 1;
        }
        if (char != '') {
            posicao++;
            coluna++;
        }
    }
}

// Análise sintática

const tabelaAnalisePreditiva = {
    'codigo': {
        'programa': '1'
    }, 'bloco': {
        '/*': '2',
        '*/': '3',
        'senao': '3',
        'ate': '3',
        '$': '3'
    }, 'declaracao': {
        '*/': '5',
        'tipo': '4',
        'se': '5',
        'senao': '5',
        'enquanto': '5',
        'repita': '5',
        'ate': '5',
        'id': '5',
        '$': '5'
    }, 'declaracoes': {
        'tipo': '50',
        'se': '50',
        'enquanto': '50',
        'repita': '50',
        'id': '50'
    },
    'declaracoes\'': {
        'tipo': '57',
        'se': '58',
        'enquanto': '58',
        'repita': '58',
        'id': '58'
    },
    'lista_ids': {
        'id': '6'
    }, 'lista_ids\'': {
        ';': '44',
        ',': '7'
    }, 'comando': {
        '*/': '11',
        'se': '8',
        'senao': '11',
        'enquanto': '9',
        'repita': '9',
        'ate': '11',
        'id': '10'
    },
    'comandos': {
        'se': '48',
        'enquanto': '48',
        'repita': '48',
        'id': '48',
        '*/': '48'
    },
    'comandos\'': {
        'se': '54',
        'enquanto': '54',
        'repita': '54',
        'id': '54',
        '*/': '55'
    },
    'comandoSel': {
        'se': '12'
    }, 'comandoSel\'': {
        '*/': '15',
        'se': '14',
        'senao': '15',
        'enquanto': '14',
        'repita': '14',
        'ate': '15',
        'id': '14',
        '/*': '13',
    }, 'comandoSel\'\'': {
        '*/': '17',
        'senao': '16',
        'ate': '17'
    }, 'comandoSel\'\'\'': {
        '/*': '19',
        '*/': '18',
        'se': '18',
        'senao': '18',
        'enquanto': '18',
        'repita': '18',
        'ate': '18',
        'id': '18'
    }, 'comandoRep': {
        'enquanto': '20',
        'repita': '21'
    }, 'comandoRep\'': {
        '/*': '23',
        '*/': '22',
        'se': '22',
        'senao': '22',
        'enquanto': '22',
        'repita': '22',
        'ate': '22',
        'id': '22'
    }, 'comandoRep\'\'': {
        '/*': '24',
        '*/': '24',
        'se': '24',
        'senao': '24',
        'enquanto': '24',
        'repita': '24',
        'ate': '24',
        'id': '24'
    }, 'comandoAtr': {
        'id': '25'
    }, 'cond': {
        'id': '26',
        'num': '26'
    }, 'cond\'': {
        'entao': '45',
        'faca': '45',
        'opRelacional': '27',
        ';': '45'
    }, 'termo': {
        'id': '28',
        'num': '29'
    }, 'expressao': {
        '(': '30',
        'id': '30',
        'num': '30'
    }, 'expressao\'': {
        ')': '33',
        '+': '31',
        '-': '32',
        ';': '33'
    }, 'expressao2': {
        '(': '34',
        'id': '34',
        'num': '34',
        'caractere': '34'
    }, 'expressao2\'': {
        ')': '37',
        '+': '37',
        '-': '37',
        '*': '36',
        '/': '35',
        ';': '37'
    }, 'expressao3': {
        '(': '38',
        'id': '38',
        'num': '38',
        'caractere': '38'
    }, 'expressao3\'': {
        ')': '40',
        '+': '40',
        '-': '40',
        '*': '40',
        '/': '40',
        '^': '39',
        ';': '40'
    }, 'expressao4': {
        '(': '41',
        'id': '42',
        'num': '42',
        'caractere': '52'
    },
    'comandoAtr\'': {
        '*/': '46',
        '(': '46',
        'senao': '46',
        'ate': '46',
        'id': '46',
        'num': '46',
        'caractere': '46'
    }
};

const producoes = {
    '1': ['programa', 'id', '(', ')'],
    '2': ['/*', 'declaracoes', 'comandos', '*/'],
    '4': ['tipo', '->', 'lista_ids', ';'],
    '6': ['id', 'lista_ids\''],
    '44': ['ε'],
    '10': ['comandoAtr'],
    '25': ['id', '<-', 'comandoAtr\''],
    '30': ['expressao2', 'expressao\''],
    '34': ['expressao3', 'expressao2\''],
    '38': ['expressao4', 'expressao3\''],
    '42': ['termo'],
    '29': ['num'],
    '40': ['ε'],
    '37': ['ε'],
    '33': ['ε'],
    '48': ['comando', 'comandos\''],
    '50': ['declaracao', 'declaracoes\''],
    '54': ['comandos'],
    '55': ['ε'],
    '57': ['declaracoes'],
    '58': ['ε'],
    '46': ['expressao', ';']
}

class Node {
    constructor(valor) {
        this.valor = valor;
        this.fihos = [];
    }
}

class AnalisadorSintatico {
    constructor(tabelaAnalisePreditiva) {
        this.tabelaAnalisePreditiva = tabelaAnalisePreditiva;
        this.pilhaEstados = [];
    }

    inicializar_pilha() {
        this.pilhaEstados = ['codigo'];
    }

    proximo_token(codigo) {
        let proximoToken = analisador_lexico(codigo);
        while (proximoToken != undefined && (proximoToken.tipo == TIPO_TOKEN.COMENTARIO || proximoToken.tipo == TIPO_TOKEN.SEPARADOR)) {
            // Ignora e lê o próximo
            proximoToken = analisador_lexico(codigo);
        }
        return proximoToken;
    }

    atualizar_pilha(producao) {
        switch (producao) {
            case '1':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('bloco');
                this.pilhaEstados.push(')');
                this.pilhaEstados.push('(');
                this.pilhaEstados.push('id');
                this.pilhaEstados.push('programa');
                break;
            case '2':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('*/');
                this.pilhaEstados.push('comandos');
                this.pilhaEstados.push('declaracoes');
                this.pilhaEstados.push('/*');
                break;
            case '3':
                this.pilhaEstados.pop();
                break;
            case '4':
                this.pilhaEstados.pop();
                this.pilhaEstados.push(';');
                this.pilhaEstados.push('lista_ids');
                this.pilhaEstados.push('->');
                this.pilhaEstados.push('tipo');
                break;
            case '5':
                this.pilhaEstados.pop();
                break;
            case '6':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('lista_ids\'');
                this.pilhaEstados.push('id');
                break;
            case '7':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('lista_ids');
                this.pilhaEstados.push(',');
                break;
            case '8':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('comandoSel');
                break;
            case '9':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('comandoRep');
                break;
            case '10':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('comandoAtr');
                break;
            case '11':
                this.pilhaEstados.pop();
                break;
            case '12':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('comandoSel\'');
                this.pilhaEstados.push('entao');
                this.pilhaEstados.push('cond');
                this.pilhaEstados.push('se');
                break;
            case '13':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('comandoSel\'\'');
                this.pilhaEstados.push('bloco');
                break;
            case '14':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('comandoSel\'\'');
                this.pilhaEstados.push('comando');
                break;
            case '15':
                this.pilhaEstados.pop();
                break;
            case '16':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('comandoSel\'\'\'');
                this.pilhaEstados.push('senao');
                break;
            case '17':
                this.pilhaEstados.pop();
                break;
            case '18':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('comando');
                break;
            case '19':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('bloco');
                break;
            case '20':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('comandoRep\'');
                this.pilhaEstados.push('faca');
                this.pilhaEstados.push('cond');
                this.pilhaEstados.push('enquanto');
                break;
            case '21':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('comandoRep\'\'');
                this.pilhaEstados.push('repita');
                break;
            case '22':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('comando');
                break;
            case '23':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('bloco');
                break;
            case '24':
                this.pilhaEstados.pop();
                this.pilhaEstados.push(';');
                this.pilhaEstados.push('cond');
                this.pilhaEstados.push('ate');
                this.pilhaEstados.push('comandoRep\'');
                break;
            case '25':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('comandoAtr\'');
                this.pilhaEstados.push('<-');
                this.pilhaEstados.push('id');
                break;
            case '26':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('cond\'');
                this.pilhaEstados.push('termo');
                break;
            case '27':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('termo');
                this.pilhaEstados.push('opRelacional');
                break;
            case '28':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('id');
                break;
            case '29':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('num');
                break;
            case '30':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('expressao\'');
                this.pilhaEstados.push('expressao2');
                break;
            case '31':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('expressao\'');
                this.pilhaEstados.push('expressao2');
                this.pilhaEstados.push('+');
                break;
            case '32':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('expressao\'');
                this.pilhaEstados.push('expressao2');
                this.pilhaEstados.push('-');
                break;
            case '33':
                this.pilhaEstados.pop();
                break;
            case '34':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('expressao2\'');
                this.pilhaEstados.push('expressao3');
                break;
            case '35':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('expressao2\'');
                this.pilhaEstados.push('expressao3');
                this.pilhaEstados.push('/');
                break;
            case '36':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('expressao2\'');
                this.pilhaEstados.push('expressao3');
                this.pilhaEstados.push('*');
                break;
            case '37':
                this.pilhaEstados.pop();
                break;
            case '38':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('expressao3\'');
                this.pilhaEstados.push('expressao4');
                break;
            case '39':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('expressao4');
                this.pilhaEstados.push('^');
                break;
            case '40':
                this.pilhaEstados.pop();
                break;
            case '41':
                this.pilhaEstados.pop();
                this.pilhaEstados.push(')');
                this.pilhaEstados.push('expressao');
                this.pilhaEstados.push('(');
                break;
            case '42':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('termo');
                break;
            case '44':
                this.pilhaEstados.pop();
                break;
            case '45':
                this.pilhaEstados.pop();
                break;
            case '46':
                this.pilhaEstados.pop();
                this.pilhaEstados.push(';')
                this.pilhaEstados.push('expressao');
                break;
            case '48':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('comandos\'')
                this.pilhaEstados.push('comando');
                break;
            case '50':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('declaracoes\'')
                this.pilhaEstados.push('declaracao');
                break;
            case '52':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('caractere')
                break;
            case '57':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('declaracoes')
                break;
            case '58':
                this.pilhaEstados.pop();
                break;
            case '54':
                this.pilhaEstados.pop();
                this.pilhaEstados.push('comandos')
                break;
            case '55':
                this.pilhaEstados.pop();
                break;
        }
    }

    analisar(codigo) {
        let proximoToken = this.proximo_token(codigo);

        this.inicializar_pilha();

        let raizAST = new Node('codigo'); // Nó raiz da AST
        let pilhaAST = []; // Pilha para construção da AST

        let noAtual = raizAST;

        while (this.pilhaEstados.length > 0 && proximoToken != undefined) {
            let topoPilha = this.pilhaEstados[this.pilhaEstados.length - 1];

            console.log('\n\n');
            console.log('Pilha: ');
            console.log(this.pilhaEstados);
            console.log('Topo Pilha: ' + topoPilha);
            console.log('Próximo Token: ' + proximoToken.tipo);

            let novoNo = new Node(topoPilha);

            if (Object.values(TIPO_TOKEN).includes(topoPilha)) {
                if (topoPilha == proximoToken.tipo) {
                    this.pilhaEstados.pop();
                    proximoToken = this.proximo_token(codigo);

                    pilhaAST.pop();
                } else {
                    console.log('Erro sintático - Linha ' + proximoToken.posicao.linha + ', Coluna ' + proximoToken.posicao.coluna + ': Token \'' + proximoToken.tipo + '\' esperado.');
                    break;
                }
            } else {
                let producao = this.tabelaAnalisePreditiva[topoPilha][proximoToken.tipo];

                if (producao == undefined) {
                    console.log('Erro sintático - Linha ' + proximoToken.posicao.linha + ', Coluna ' + proximoToken.posicao.coluna + ': Produção não definida.');
                    break;
                } else {

                    pilhaAST.pop();

                    producoes[producao].forEach(simbolo => {
                        if (simbolo != 'ε') {
                            let novoFilho = new Node(simbolo);
                            novoNo.fihos.push(novoFilho);
                            pilhaAST.push(novoFilho);
                        }
                    });

                    noAtual.fihos.push(novoNo);
                    noAtual = novoNo;

                    this.atualizar_pilha(producao);
                }
            }
        }

        if (proximoToken != undefined) {
            console.log('Erro sintático - Fim de arquivo prematuro.');
            return;
        }

        if (this.pilhaEstados.length == 0) {
            console.log('Aceita!');
            return raizAST;
        } else {
            console.log('Erro sintático - Linha ' + proximoToken.posicao.linha + ', Coluna ' + proximoToken.posicao.coluna + ': Código incompleto.');
            return null;
        }
    }
}

// Exemplo de uso
//let codigo = "  int a = 10;char c = 'd'; %Comentário%\nfloat b = 20;-->-";
// let codigo = "enquanto 'a'';', a, >=, b faca, a <-, a -, 1;,,12.1,(,ate,),";
let codigo = "programa funcao() /*\nint -> var1;\nvar1 <- 2;\n\n*/"

const analisador = new AnalisadorSintatico(tabelaAnalisePreditiva);
let resultado_ast = analisador.analisar(codigo);


function exibir_arvore(no, ordem, nivel = 0) {
    if (no !== null) {
        if (ordem == 'pre') {
            console.log(' '.repeat(nivel) + no.valor);
            for (let filho of no.fihos) {
                exibir_arvore(filho, 'pre', nivel + 1);
            }
        } else if (ordem == 'pos') {
            no.fihos.forEach(child => {
                exibir_arvore(child, 'pos', nivel + 1);
            });
            console.log(' '.repeat(nivel) + no.valor);
        } else if (ordem == 'em') {
            if (no.fihos.length > 0) {
                exibir_arvore(no.fihos[0], 'em', nivel + 1); // Imprime o primeiro filho
            }
            console.log(' '.repeat(nivel) + no.valor); // Imprime o valor do nó atual
            if (no.fihos.length > 1) {
                for (let i = 1; i < no.fihos.length; i++) {
                    exibir_arvore(no.fihos[i], 'em', nivel + 1); // Imprime os outros filhos
                }
            }
        }
    }
}

if (resultado_ast != null) {
    exibir_arvore(resultado_ast, 'pre');
    console.log('-----------------------------------------------------------');
    exibir_arvore(resultado_ast, 'em');
    console.log('-----------------------------------------------------------');
    exibir_arvore(resultado_ast, 'pos');
}
