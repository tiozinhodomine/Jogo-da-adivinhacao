const palavras = [
    { palavra: 'teclado', dica: 'Ferramenta de digitação' },
    { palavra: 'astronauta', dica: 'Profissão fora da Terra' },
    { palavra: 'oxigenio', dica: 'Elemento essencial para respirar' },
    { palavra: 'monitor", dica: "Exibe imagens do computador' },
    { palavra: 'filme', dica: 'Produção cinematográfica' },
    { palavra: 'biblioteca', dica: 'Local para pegar livros' },
    { palavra: 'esqueleto', dica: 'Estrutura óssea' },
    { palavra: 'javascript', dica: 'Linguagem de programação'},
    { palavra: 'esqueleto', dica: 'Estrutura óssea' },
    { palavra: 'vulcao', dica: 'Montanha explosiva' },
    { palavra: 'oceano', dica: 'Grande corpo de água salgada' },
    { palavra: 'programador', dica: 'Profissional que cria códigos' },
    { palavra: 'software', dica: 'Programa de computador' },
    { palavra: "carrossel", dica: "Brinquedo de parque que gira"  },
    { palavra: 'biologia', dica: 'Estudo da vida' },
    { palavra: "martelo", dica: "Ferramenta para pregar"  },
    { palavra: 'gravidade', dica: 'Força que atrai para o centro da Terra' },
    { palavra: 'radar', dica: 'Instrumento de detecção' },
    { palavra: 'bussola', dica: "Indica direção" },
    { palavra: "travesseiro", dica: "Apoio macio para a cabeça" }
  ];
  
  let indice = 0;
  let acertadas = 0;
  let tempo = 120;
  let timer;
  
  let palavraAtual = '';
  let dicaAtual = '';
  let letrasUsadas = [];
  let tentativasErradas = 0;
  const maxTentativas = 5;
  
  const telaInicial = document.getElementById('tela-inicial');
  const btnIniciar = document.getElementById('btn-iniciar');
  const jogo = document.getElementById('jogo');
  const dica = document.getElementById('dica');
  const contador = document.getElementById('contador');
  const timerEl = document.getElementById('timer');
  const palavraDiv = document.getElementById('palavra');
  const errosDiv = document.getElementById('erros');
  const avisosDiv = document.getElementById('avisos');
  const mensagemDiv = document.getElementById('mensagem');
  const jogarNovamenteBtn = document.getElementById('jogar-novamente');
  
  btnIniciar.addEventListener('click', iniciarJogo);
  jogarNovamenteBtn.addEventListener('click', reiniciarJogo);
  
  function iniciarJogo() {
    telaInicial.style.display = 'none';
    jogo.style.display = 'block';
    acertadas = 0;
    indice = 0;
    tempo = 120;
    letrasUsadas = [];
    tentativasErradas = 0;
    mensagemDiv.style.display = 'none';
    jogarNovamenteBtn.style.display = 'none';
    iniciarPalavra();
    atualizarContador();
  
    timer = setInterval(() => {
      tempo--;
      timerEl.textContent = `Tempo: ${tempo}s`;
      if (tempo <= 0) {
        finalizarJogo();
      }
    }, 1000);
  }
  
  function iniciarPalavra() {
    if (indice >= palavras.length) {
      finalizarJogo();
      return;
    }
    palavraAtual = removerAcentos(palavras[indice].palavra).toUpperCase();
    dicaAtual = palavras[indice].dica;
    letrasUsadas = [];
    tentativasErradas = 0;
    avisosDiv.textContent = '';
    dica.textContent = `Dica: ${dicaAtual}`;
    atualizarContador();
    palavraDiv.innerHTML = '';
    errosDiv.textContent = `Erros: ${tentativasErradas}/${maxTentativas}`;
  
    palavraAtual.split('').forEach(() => {
      const letra = document.createElement('div');
      letra.classList.add('letra');
      letra.textContent = '_';
      palavraDiv.appendChild(letra);
    });
  }
  
  function atualizarContador() {
    contador.textContent = `Acertos: ${acertadas}/20`;
  }
  
  document.addEventListener('keydown', e => {
    if (jogo.style.display === 'none' || tempo <= 0) return;
  
    const letra = e.key.toUpperCase();
    if (!/^[A-Z]$/.test(letra)) return;
  
    if (letrasUsadas.includes(letra)) {
      avisosDiv.textContent = `Letra "${letra}" já foi escolhida!`;
      return;
    }
  
    letrasUsadas.push(letra);
    avisosDiv.textContent = '';
  
    if (palavraAtual.includes(letra)) {
      revelarLetra(letra);
      if (verificarVitoria()) {
        acertadas++;
        indice++;
        if (acertadas === 20) {
          finalizarJogo();
        } else {
          iniciarPalavra();
        }
      }
    } else {
      tentativasErradas++;
      mostrarErros();
      if (tentativasErradas >= maxTentativas) {
        indice++;
        if (indice >= palavras.length) {
          finalizarJogo();
        } else {
          iniciarPalavra();
        }
      }
    }
  });
  
  function revelarLetra(letra) {
    const letrasDiv = document.querySelectorAll('.letra');
    for (let i = 0; i < palavraAtual.length; i++) {
      if (palavraAtual[i] === letra) {
        letrasDiv[i].textContent = palavras[indice].palavra[i]; // Mantém acento original
      }
    }
  }
  
  function verificarVitoria() {
    const letrasDiv = document.querySelectorAll('.letra');
    return Array.from(letrasDiv).every(div => div.textContent !== '_');
  }
  
  function mostrarErros() {
    const letrasErradas = letrasUsadas.filter(l => !palavraAtual.includes(l));
    errosDiv.textContent = `Erros: ${tentativasErradas}/${maxTentativas} | Letras erradas: ${letrasErradas.join(', ')}`;
  }
  
  function finalizarJogo() {
    clearInterval(timer);
    jogo.style.display = 'none';
    mensagemDiv.style.display = 'block';
  
    let mensagemFinal = '';
    let cor = '';
  
    if (acertadas === 0) {
      mensagemFinal = 'Como é que tu tá vivo ainda?';
      cor = 'red';
    } else if (acertadas <= 5) {
      mensagemFinal = 'KKKKK MUITO BURRO';
      cor = 'red';
    } else if (acertadas <= 10) {
      mensagemFinal = 'Dá pra melhorar isso aí seu fracassado';
      cor = 'yellow';
    } else if (acertadas <= 15) {
      mensagemFinal = 'Parabéns, não fez mais do que a sua obrigação';
      cor = 'yellow';
    } else {
      mensagemFinal = 'AI SIM MANO, JOGOU MUITO!';
      cor = 'green';
    }
  
    mensagemDiv.textContent = mensagemFinal;
    mensagemDiv.style.color = cor;
    jogarNovamenteBtn.style.display = 'inline-block';
  }
  
  function reiniciarJogo() {
    acertadas = 0;
    indice = 0;
    tempo = 120;
    letrasUsadas = [];
    tentativasErradas = 0;
    mensagemDiv.style.display = 'none';
    jogarNovamenteBtn.style.display = 'none';
    jogo.style.display = 'block';
    iniciarPalavra();
    atualizarContador();
  
    clearInterval(timer);
    timer = setInterval(() => {
      tempo--;
      timerEl.textContent = `Tempo: ${tempo}s`;
      if (tempo <= 0) finalizarJogo();
    }, 1000);
  }
  
  // Função para remover acentos para facilitar a comparação
  function removerAcentos(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  