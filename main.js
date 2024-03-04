var linha = 1;
var coluna = 0;
var posicao = 0;
const tokens = [];

// Definindo os tipos de tokens
const TIPO_TOKEN = {
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
    return { tipo, lexema, atributo, posicao };
}

function trata_lockhead(lexema) {
    coluna = coluna - 1;
    posicao = posicao - 1;

    if (lexema.length == 1) {
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
                } else if (char === '>') {
                    estadoAtual = 'V';
                } else if (char === '=') {
                    estadoAtual = 'X';
                } else if (char === ',') {
                    estadoAtual = 'DB';
                }
                else if (char === '%') {
                    estadoAtual = 'AH';
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
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
                if (/[a-zA-Z]/.test(char)) {
                    estadoAtual = 'AG';
                } else {
                    //erro - transição não definida
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
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
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
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
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'N':
                return gerar_token(TIPO_TOKEN.ATRIBUICAO, lexema, null, { linha, coluna });

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
                } else if (char === '>') {
                    estadoAtual = 'AJ';
                } else if (char === '=') {
                    estadoAtual = 'AJ';
                } else if (char === '%') {
                    estadoAtual = 'AJ';
                } else if (char === '.') {
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'P':
                return gerar_token(TIPO_TOKEN.INICIO_PARENTESES, lexema, null, { linha, coluna });

            case 'Q':
                lexema = trata_lockhead(lexema);
                return gerar_token(TIPO_TOKEN.OPERADOR_DIVISAO, lexema, null, { linha, coluna });

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
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
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
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
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
                } else if (/[a-zA-Z0-9_]/.test(char)) {
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
                } else if (/[a-zA-Z0-9_]/.test(char)) {
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
                } else if (/[a-zA-Z0-9_]/.test(char)) {
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
                } else if (/[a-zA-Z0-9_]/.test(char)) {
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
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'AG':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (/[\s\t\n]/.test(char)) {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === '<') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === '+') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === '/') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === ';') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === '\'') {
                    estadoAtual = 'AV';
                } else if (char === '-') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === '^') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === '*') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === '(') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === '>') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === '=') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === '%') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === '.') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (/[0-9]/.test(char)) {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === '_') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'a') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'c') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'e') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'E') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'f') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'g') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'h') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'i') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'l') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'm') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'n') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'o') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'p') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'q') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'r') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 's') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 't') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (char === 'u') {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else if (/[a-zA-Z]/.test(char)) {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
                } else {
                    //erro - transição não definida
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "'" esperado.`, { linha, coluna });
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
                return gerar_token(TIPO_TOKEN.FIM_BLOCO, lexema, null, { linha, coluna });

            case 'AJ':
                return gerar_token(TIPO_TOKEN.OPERADOR_MULTIPLICACAO, lexema, null, { linha, coluna });

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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "[0-9]" esperado.`, { linha, coluna });
                }
                break;

            case 'AN':
                lexema = trata_lockhead(lexema);
                return gerar_token(TIPO_TOKEN.SE, lexema, null, { linha, coluna });

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
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
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
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
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
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
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
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
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
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
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
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
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
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'AY':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
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
                } else if (char === '>') {
                    estadoAtual = 'BH';
                } else if (char === '=') {
                    estadoAtual = 'BH';
                } else if (char === '%') {
                    estadoAtual = 'BH';
                } else if (char === '.') {
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
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
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
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
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
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
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'BE':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
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
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'BG':
                lexema = trata_lockhead(lexema);
                return gerar_token(TIPO_TOKEN.ATE, lexema, null, { linha, coluna });

            case 'BH':
                lexema = trata_lockhead(lexema);
                return gerar_token(TIPO_TOKEN.NUM, lexema, lexema, { linha, coluna });

            case 'BI':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char === '+' || char === '-') {
                    estadoAtual = 'CW';
                } else if (/[0-9]/.test(char)) {
                    estadoAtual = 'CX';
                } else {
                    gerar_token(TIPO_TOKEN.ERRO, lexema, `Erro: "[0-9]" ou "[+-]" esperado.`, { linha, coluna });
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
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
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
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
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
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'BM':
                lexema = trata_lockhead(lexema);
                return gerar_token(TIPO_TOKEN.SENAO, lexema, null, { linha, coluna });
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
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
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
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
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
                } else if (char === '>') {
                    estadoAtual = 'BN';
                } else if (char === '=') {
                    estadoAtual = 'BN';
                } else if (char === '%') {
                    estadoAtual = 'BN';
                } else if (char === '.') {
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'BR':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
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
                    gerar_token(TIPO_TOKEN.ERRO, lexema, undefined, { linha, coluna });
                }
                break;

            case 'BS':
                lexema = trata_lockhead(lexema);
                return gerar_token(TIPO_TOKEN.ENQUANTO, lexema, null, { linha, coluna });

            case 'BT':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (char === 'a') {
                    estadoAtual = 'BU';
                } else if (/[a-zA-Z0-9_]/.test(char)) {
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
                } else if (/[a-zA-Z0-9_]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'BN';
                }
                break;

            case 'BW':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (/[a-zA-Z0-9_]/.test(char)) {
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
                } else if (/[a-zA-Z0-9_]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'BN';
                }
                break;

            case 'BY':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (/[a-zA-Z0-9_]/.test(char)) {
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
                } else if (/[a-zA-Z0-9_]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'BN';
                }
                break;

            case 'CC':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (/[a-zA-Z0-9_]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'CF';
                }
                break;

            case 'CD':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (/[a-zA-Z0-9_]/.test(char)) {
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
                } else if (/[a-zA-Z0-9_]/.test(char)) {
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
                } else if (/[a-zA-Z0-9_]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'BN';
                }
                break;

            case 'CI':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (/[a-zA-Z0-9_]/.test(char)) {
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
                } else if (/[a-zA-Z0-9_]/.test(char)) {
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
                } else if (/[a-zA-Z0-9_]/.test(char)) {
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
                } else if (/[a-zA-Z0-9_]/.test(char)) {
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
                } else if (/[a-zA-Z0-9_]/.test(char)) {
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
                } else if (/[a-zA-Z0-9_]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'BN';
                }
                break;

            case 'CQ':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (/[a-zA-Z0-9_]/.test(char)) {
                    estadoAtual = 'AK';
                } else {
                    estadoAtual = 'CT';
                }
                break;

            case 'CR':
                char = input[posicao];
                lexema += char == undefined ? '' : char;
                if (/[a-zA-Z0-9_]/.test(char)) {
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



// Exemplo de uso
//let codigo = "  int a = 10;char c = 'd'; %Comentário%\nfloat b = 20;-->-";

let codigo = "enquanto a >= b faca a <- a - 1;"

let token = analisador_lexico(codigo, linha, coluna);

while (token) {
    if (token.tipo != TIPO_TOKEN.COMENTARIO && token.tipo != TIPO_TOKEN.SEPARADOR) {
        tokens.push(token);
    }
    token = analisador_lexico(codigo, linha, coluna);
}

console.log('Tokens encontrados: ');
console.log(tokens);

console.log('Tabela de símbolos: ');
console.log(tabelaSimbolos);
