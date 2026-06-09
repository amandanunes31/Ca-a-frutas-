function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}// Variáveis do Jogo
let cestaX;
let cestaY;
let cestaLargura = 80;
let cestaAltura = 20;
let cestaVelocidade = 8;

let itemX;
let itemY;
let itemTamanho = 20;
let itemVelocidade = 4;
let itemTipo; // 'bom' ou 'ruim'

let pontos = 0;
let vidas = 3;
let jogoAcabou = false;

function setup() {
  createCanvas(600, 400);
  resetarItem();
  cestaX = width / 2 - cestaLargura / 2;
  cestaY = height - 40;
}

function draw() {
  background(135, 206, 235); // Céu azul

  // Desenha o gramado (chão)
  fill(34, 139, 34);
  noStroke();
  rect(0, height - 20, width, 20);

  if (!jogoAcabou) {
    jogar();
  } else {
    telaGameOver();
  }
}

// Lógica principal do jogo
function jogar() {
  // --- TELA DE INFORMAÇÕES ---
  fill(0);
  textSize(18);
  textAlign(LEFT);
  text("Pontos: " + pontos, 20, 30);
  text("Vidas: " + vidas, width - 100, 30);
  
  // Mensagem educativa do Agrinho
  textSize(14);
  fill(50);
  text("Ajude o Agrinho a colher alimentos saudáveis e evitar pragas!", 20, 60);

  // --- CONTROLE DA CESTA ---
  if (keyIsDown(LEFT_ARROW)) {
    cestaX -= cestaVelocidade;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    cestaX += cestaVelocidade;
  }
  
  // Limita a cesta dentro da tela
  cestaX = constrain(cestaX, 0, width - cestaLargura);

  // Desenha a Cesta (Marrom)
  fill(139, 69, 19);
  rect(cestaX, cestaY, cestaLargura, cestaAltura, 5);

  // --- MOVIMENTO DO ITEM ---
  itemY += itemVelocidade;

  // Desenha o item baseado no tipo
  if (itemTipo === 'bom') {
    fill(255, 0, 0); // Maçã Vermelha (Alimento Saudável)
    ellipse(itemX, itemY, itemTamanho, itemTamanho);
    // Detalhe da folhinha verde
    fill(0, 200, 0);
    ellipse(itemX + 5, itemY - 10, 5, 8);
  } else {
    fill(100, 30, 220); // Praga/Poluição (Roxo)
    triangle(itemX, itemY - 10, itemX - 10, itemY + 10, itemX + 10, itemY + 10);
  }

  // --- DETECÇÃO DE COLISÃO ---
  // Verifica se o item tocou na cesta
  if (itemY + itemTamanho/2 >= cestaY && itemY - itemTamanho/2 <= cestaY + cestaAltura) {
    if (itemX >= cestaX && itemX <= cestaX + cestaLargura) {
      if (itemTipo === 'bom') {
        pontos += 10;
        itemVelocidade += 0.2; // Aumenta a dificuldade gradualmente
      } else {
        vidas -= 1;
        if (vidas <= 0) {
          jogoAcabou = true;
        }
      }
      resetarItem();
    }
  }

  // Verifica se o item caiu no chão
  if (itemY > height - 20) {
    if (itemTipo === 'bom') {
      vidas -= 1; // Perder alimento saudável tira vida
      if (vidas <= 0) {
        jogoAcabou = true;
      }
    }
    resetarItem();
  }
}

// Sorteia um novo item no topo da tela
function resetarItem() {
  itemX = random(20, width - 20);
  itemY = 0;
  
  // 70% de chance de ser alimento bom, 30% de ser praga/poluição
  if (random(1) < 0.7) {
    itemTipo = 'bom';
  } else {
    itemTipo = 'ruim';
  }
}

// Tela de Fim de Jogo
function telaGameOver() {
  textAlign(CENTER);
  fill(0);
  textSize(32);
  text("Fim de Jogo!", width / 2, height / 2 - 20);
  
  textSize(20);
  fill(50);
  text("Você fez " + pontos + " pontos defendendo a natureza!", width / 2, height / 2 + 20);
  
  textSize(16);
  fill(100);
  text("Pressione ESPAÇO para jogar novamente", width / 2, height / 2 + 60);
}

// Reiniciar o jogo com a barra de espaço
function keyPressed() {
  if (jogoAcabou && key === ' ') {
    pontos = 0;
    vidas = 3;
    itemVelocidade = 4;
    jogoAcabou = false;
    resetarItem();
    cestaX = width / 2 - cestaLargura / 2;
  }
}
