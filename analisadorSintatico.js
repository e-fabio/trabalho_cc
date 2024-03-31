class Token {
  constructor(tipo, lexema, atributo, posicao) {
    this.tipo = tipo;
    this.lexema = lexema;
    this.atributo = atributo;
    this.posicao = posicao;
  }
}

const tabelaAnalisePreditiva = {
  'E': {
    'id': '1',
    '(': '1'
  },
  'E\'': {
    '+': '2',
    ')': '3',
    '$': '3'
  },
  'T': {
    'id': '4',
    '(': '4'
  },
  'T\'': {
    '*': '5',
    '+': '6',
    ')': '6',
    '$': '6'
  },
  'F': {
    'id': '8',
    '(': '7'
  }
};

class AnalisadorSintatico {
  constructor(tabelaAnalisePreditiva) {
    this.tabelaAnalisePreditiva = tabelaAnalisePreditiva;
    this.pilhaEstados = [];
  }

  inicializar_pilha() {
    this.pilhaEstados = ['E'];
  }

  analisar(tokens) {
    let indiceToken = 0;
    let proximoToken = tokens[indiceToken];
    let simbolosTerminais = ['+', '*', '(', ')', 'id', '$']

    this.inicializar_pilha();

    while (this.pilhaEstados.length > 0 && proximoToken != undefined) {
      let topoPilha = this.pilhaEstados[this.pilhaEstados.length - 1];

      // console.log(this.pilhaEstados);
      // console.log(topoPilha);
      // console.log(proximoToken);

      if (simbolosTerminais.includes(topoPilha)) {
        if (topoPilha == proximoToken.tipo) {
          this.pilhaEstados.pop();
          indiceToken++;
          proximoToken = tokens[indiceToken];
        } else {
          break;
        }
      } else {

        let producao = this.tabelaAnalisePreditiva[topoPilha][proximoToken.tipo];

        if (producao == undefined) {
          break;
        } else {
          // construir arvore aqui

          if (producao === '1') { // E → TE'
            this.pilhaEstados.pop();
            this.pilhaEstados.push('E\'');
            this.pilhaEstados.push('T');
          } else if (producao === '2') { // E' → +TE'
            this.pilhaEstados.pop();
            this.pilhaEstados.push('E\'');
            this.pilhaEstados.push('T');
            this.pilhaEstados.push('+');
          } else if (producao === '3') { // E' → ε
            this.pilhaEstados.pop();
          } else if (producao === '4') { // T → FT'
            this.pilhaEstados.pop();
            this.pilhaEstados.push('T\'');
            this.pilhaEstados.push('F');
          } else if (producao === '5') { // T' → *FT'
            this.pilhaEstados.pop();
            this.pilhaEstados.push('T\'');
            this.pilhaEstados.push('F');
            this.pilhaEstados.push('*');
          } else if (producao === '6') { // T' → ε
            this.pilhaEstados.pop();
          } else if (producao === '7') { // F → ( E )
            this.pilhaEstados.pop();
            this.pilhaEstados.push(')');
            this.pilhaEstados.push('E');
            this.pilhaEstados.push('(');
          } else if (producao === '8') { // F → id
            this.pilhaEstados.pop();
            this.pilhaEstados.push('id');
          }

        }
      }

    }

    if (proximoToken == undefined) {
      console.log('Erro sintático encontrado -> Fim inesperado');
      return;
    }

    if (proximoToken.tipo == '$' && this.pilhaEstados.length == 0) {
      console.log('Aceita!');
    } else {
      console.log('Erro sintático encontrado -> TOKEN = ' + proximoToken.tipo + ' -> PILHA = ' + (this.pilhaEstados.length == 0 ? 'VAZIA' : this.pilhaEstados));
    }
  }
}

const tokens = [
  new Token('id', '3', null, 1),
  new Token('+', '+', null, 2),
  new Token('id', '2', null, 3),
  new Token('$', '', null, 4)
];
const tokensInvalidos = [
  new Token('id', '3', null, 1),
  new Token('+', '+', null, 2)
];
const tokensInvalidos2 = [
  new Token('id', '3', null, 1),
  new Token('id', '2', null, 3),
  new Token('$', '', null, 4)
];

const analisador = new AnalisadorSintatico(tabelaAnalisePreditiva);
analisador.analisar(tokens);
analisador.analisar(tokensInvalidos);
analisador.analisar(tokensInvalidos2);


