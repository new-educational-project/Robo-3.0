"use strict";

/* =========================================================
   ROBÔ LÉO — VERSÃO 3.0
   ARQUIVOS DE IMAGEM

   CONSCIÊNCIA+ / FASE 1
   • As imagens novas ficam na RAIZ do GitHub.
   • Nomes obrigatórios: 01.jpg ... 40.jpg.
   • A coluna 1 da tabela define o arquivo físico.
   • A coluna 2 (código) é usada SOMENTE internamente.
   • A coluna 3 define o nome mostrado ao ampliar a imagem.

   ECOTECH+ / HUMANO+
   • Para evitar colisão com os novos arquivos 01.jpg ... 40.jpg,
     as imagens antigas 01 ... 54 devem ficar em /legacy/.
========================================================= */
const GAME_VERSION = "3.0";
const padAssetNumber = number => String(Number(number)).padStart(2, "0");

function consciousImage(number, code = "") {
  return Object.freeze({ number: Number(number), code: String(code || ""), consciousV3: true });
}

function imageCandidates(ref) {
  if (ref && typeof ref === "object" && ref.consciousV3) {
    const n = padAssetNumber(ref.number);
    return [`${n}.jpg`, `${n}.JPG`, `${n}.jpeg`, `${n}.png`];
  }
  if (typeof ref === "string") return [ref];
  const n = padAssetNumber(ref);
  const candidates = [`legacy/${n}.jpg`, `legacy/${n}.JPG`, `legacy/${n}.png`];
  // As imagens antigas 41–54 não colidem com a nova série 01–40.
  // Mantemos um fallback para a raiz para facilitar a migração.
  if (Number(ref) > 40) candidates.push(`${n}.jpg`, `${n}.JPG`, `${n}.png`);
  return candidates;
}

const asset = ref => imageCandidates(ref)[0];
const assetFileName = ref => imageCandidates(ref)[0];
const POS = (x, y) => ({ x, y });
const SPECIAL_PASSWORD = "#gostodeestudar";

function expectedBoardSize(levelKey) {
  return levelKey === "conscious" ? 5 : 6;
}

/* =========================================================
   CATÁLOGO INTERNO — CONSCIÊNCIA+ / FASE 1
   O jogador NÃO vê os códigos. Eles ficam guardados para a
   lógica de sexo, bloco, destino, pontuação e evolução.
========================================================= */
const CONSCIOUS_IMAGE_CATALOG = Object.freeze({
  1:{code:"MCF1.1",name:"Sono que restaura"},
  2:{code:"MCF1.2",name:"Higiene e alimentação"},
  3:{code:"MCF1.3",name:"Dedicação aos estudos"},
  4:{code:"MCF1.4",name:"Trabalho e Lazer"},
  5:{code:"MT1",name:"Organizar o material"},
  6:{code:"MSPC",name:"Desacelerando o pensamento"},
  7:{code:"MT2",name:"Higiene pessoal"},
  8:{code:"MT3",name:"Organizar a cama"},
  9:{code:"MT4",name:"Cafe da manha"},
  10:{code:"MT5",name:"Higiene pessoal"},
  11:{code:"MT6",name:"Atenção ao trajeto até a escola"},
  12:{code:"MT7",name:"Aguardar na escola o início das aulas"},
  13:{code:"MT8",name:"Aguardar o professor com o material necessário"},
  14:{code:"MT9",name:"Trabalhar em equipe"},
  15:{code:"MT10",name:"Entregar as atividades"},
  16:{code:"MT11",name:"Atenção ao retornar para casa"},
  17:{code:"MT12",name:"Ajudar com as tarefas após o almoço"},
  18:{code:"MT13",name:"Tempo de lazer e tarefas escolares"},
  19:{code:"MT14",name:"Lanche da tarde"},
  20:{code:"MT15",name:"Tarefas concluídas"},
  21:{code:"FCF1.1",name:"Sono que restaura"},
  22:{code:"FCF1.2",name:"Higiene e alimentação"},
  23:{code:"FCF1.3",name:"Dedicação aos estudos"},
  24:{code:"FCF1.4",name:"Trabalho e Lazer"},
  25:{code:"FSPC",name:"Desacelerando o pensamento"},
  26:{code:"FT1",name:"Organizar o material"},
  27:{code:"FT2",name:"Higiene pessoal"},
  28:{code:"FT3",name:"Organizar a cama"},
  29:{code:"FT4",name:"Cafe da manha"},
  30:{code:"FT5",name:"Higiene pessoal"},
  31:{code:"FT6",name:"Atenção ao trajeto até a escola"},
  32:{code:"FT7",name:"Aguardar na escola o início das aulas"},
  33:{code:"FT8",name:"Aguardar o professor com o material necessário"},
  34:{code:"FT9",name:"Trabalhar em equipe"},
  35:{code:"FT10",name:"Entregar as atividades"},
  36:{code:"FT11",name:"Atenção ao retornar para casa"},
  37:{code:"FT12",name:"Ajudar com as tarefas após o almoço"},
  38:{code:"FT13",name:"Tempo de lazer e tarefas escolares"},
  39:{code:"FT14",name:"Lanche da tarde"},
  40:{code:"FT15",name:"Tarefas concluídas"}
});

const LEGACY_IMAGE_NAMES = Object.freeze({
  1:"Papelão",2:"Garrafa PET",3:"Garrafa de vidro",4:"Fralda",5:"Papel higiênico",6:"Frasco de medicamento",
  7:"Ponto de reciclagem",8:"Lixeira marrom — rejeitos",9:"Lixeira azul — papel",10:"Lixeira verde — vidro",
  11:"Lixeira amarela — metal",12:"Lixeira vermelha — plástico",13:"Barreira: Pedra",14:"Barreira: Lama",
  15:"Barreira: Entulho",16:"Metal",17:"Indígena",18:"Indígena",19:"Imigrante asiático",20:"Imigrante asiática",
  21:"Imigrante árabe",22:"Imigrante árabe",23:"Imigrante sul-americano",24:"Imigrante sul-americana",25:"Judeu",
  26:"Judia",27:"Cigano",28:"Cigana",29:"Eslavo",30:"Eslava",31:"Pessoa negra",32:"Pessoa negra",33:"Mulher",
  34:"Mulher",35:"Idoso",36:"Idosa",37:"Criança",38:"Criança",39:"Criança",40:"Doméstica",
  41:"Operador de produção - alimentos",42:"Agricultor",43:"Salão do acolhimento: crianças",44:"Salão do acolhimento: mulheres",
  45:"Salão do acolhimento: idosos",46:"Salão do acolhimento: trabalhadores",47:"Salão do acolhimento: indígenas",
  48:"Salão do acolhimento: asiáticos",49:"Salão do acolhimento: árabes",50:"Salão do acolhimento: Imigrante sul-americanos",
  51:"Salão do acolhimento: judeus",52:"Salão do acolhimento: Pessoas negras",53:"Salão do acolhimento: ciganos",
  54:"Salão do acolhimento: eslavos"
});

function imageName(ref) {
  if (ref && typeof ref === "object" && ref.consciousV3) {
    return CONSCIOUS_IMAGE_CATALOG[Number(ref.number)]?.name || `Imagem ${padAssetNumber(ref.number)}`;
  }
  const number = Number(ref);
  return LEGACY_IMAGE_NAMES[number] || `Imagem ${padAssetNumber(number)}`;
}

const COMMANDS = {
  MOVE_UP:    { symbol: "▲", dx: 0, dy: -1 },
  MOVE_DOWN:  { symbol: "▼", dx: 0, dy: 1 },
  MOVE_LEFT:  { symbol: "◀", dx: -1, dy: 0 },
  MOVE_RIGHT: { symbol: "▶", dx: 1, dy: 0 },
  ACTION:     { symbol: "✓", dx: 0, dy: 0 }
};

const HUMAN_GROUP_LABELS = {
  children: "crianças",
  women: "mulheres",
  elderly: "pessoas idosas",
  workers: "trabalhadores",
  indigenous: "indígenas",
  southamerican: "imigrantes sul-americanos",
  arab: "árabes",
  asian: "asiáticos",
  jewish: "judeus",
  black: "pessoas negras",
  roma: "ciganos",
  slavic: "eslavos"
};

function humanGroupLabel(group) {
  return HUMAN_GROUP_LABELS[group] || "grupo atual";
}

function humanGroupMembers(group) {
  return items.filter(person => person.type === group && !person.delivered);
}

function humanGroupCarried(group) {
  return carriedEntries().filter(person => person.type === group);
}

function humanGroupPending(group) {
  const carryingIds = new Set(carrying);
  return items.filter(person =>
    person.type === group &&
    !person.delivered &&
    !carryingIds.has(person.id)
  );
}


/* =========================================================
   NÍVEL 1 — CONSCIÊNCIA+ • VERSÃO 3.0
   FASE 1 = QUATRO BLOCOS DE ATIVIDADES

   • Tabuleiro fixo 5×5.
   • Quatro estações permanecem nos quatro cantos.
   • A pista correta ativa um canto por vez.
   • Todas as tarefas daquele bloco aparecem simultaneamente.
   • O jogador pode coletá-las em qualquer ordem e deve
     entregá-las ao canto ativo.
   • As imagens são escolhidas pelo sexo registrado no perfil.
   • Códigos M/F permanecem apenas na lógica interna.
========================================================= */
const PENTAGON_AXES = Object.freeze({
  hygiene:{label:"Higiene e cuidado pessoal",system:"Escudo de proteção",stages:["básico","reforçado","avançado"]},
  food:{label:"Alimentação",system:"Núcleo de energia",stages:["instável","estável","potente"]},
  sleep:{label:"Sono",system:"Sistema de recarga",stages:["parcial","eficiente","sustentável"]},
  study:{label:"Estudos e organização",system:"Visor do conhecimento",stages:["observação inicial","reconhecimento consciente","leitura ética avançada"]},
  balance:{label:"Lazer e bem-estar",system:"Módulo de equilíbrio",stages:["oscilante","regulado","harmonizado"]}
});

const CONSCIOUS_SEX_ASSETS = Object.freeze({
  masculino:{stations:[1,2,3,4],tasks:[[6,5,7],[8,9,10],[11,12,13,14,15],[16,17,18,19]],complete:20},
  feminino:{stations:[21,22,23,24],tasks:[[25,26,27],[28,29,30],[31,32,33,34,35],[36,37,38,39]],complete:40}
});

const CONSCIOUS_CLUES = Object.freeze([
  {icon:"🌙",lead:"Antes que o novo dia comece...",text:"É hora de preparar o descanso e organizar o que ajuda o corpo e a mente a desacelerar.",stage:"SONO QUE RESTAURA"},
  {icon:"☀️",lead:"Um novo dia começou...",text:"Antes de sair, higiene, alimentação e organização ajudam a começar bem o dia.",stage:"HIGIENE E ALIMENTAÇÃO"},
  {icon:"🏫",lead:"O destino da manhã foi alcançado...",text:"Agora é hora de estudar, organizar materiais, participar e cumprir responsabilidades.",stage:"DEDICAÇÃO AOS ESTUDOS"},
  {icon:"🏠",lead:"As aulas terminaram...",text:"É hora de voltar com segurança, colaborar, alimentar-se e equilibrar tarefas e lazer.",stage:"TRABALHO E LAZER"}
]);

const CONSCIOUS_BLOCKS = Object.freeze([
  {id:"sleep",stationIndex:0,title:"Bloco 1 • Sono que restaura",missionTitle:"Prepare o descanso e o dia seguinte",mission:"Observe as três tarefas espalhadas pelo tabuleiro. Colete todas e entregue-as no canto ativo.",tip:"Clique nas imagens para ampliá-las. O nome da ação aparece acima da imagem.",axes:["sleep"]},
  {id:"care",stationIndex:1,title:"Bloco 2 • Higiene e alimentação",missionTitle:"Comece o dia cuidando de si",mission:"Colete as três tarefas deste bloco e entregue-as no canto ativo de Higiene e alimentação.",tip:"As tarefas deste bloco fortalecem dois eixos: higiene e alimentação.",axes:["hygiene","food"]},
  {id:"study",stationIndex:2,title:"Bloco 3 • Dedicação aos estudos",missionTitle:"Organize a vida escolar",mission:"As cinco tarefas do bloco aparecem ao mesmo tempo. Planeje a rota, colete-as e entregue-as no canto ativo.",tip:"Você pode observar todas as imagens antes de montar o algoritmo.",axes:["study"]},
  {id:"balance",stationIndex:3,title:"Bloco 4 • Trabalho e Lazer",missionTitle:"Equilibre responsabilidades e bem-estar",mission:"Colete as quatro tarefas finais e entregue-as no canto ativo para concluir a Fase 1.",tip:"Responsabilidade e lazer fazem parte de uma rotina consciente e possível.",axes:["balance"]}
]);

const CONSCIOUS_CORNERS = Object.freeze([
  POS(0,0), POS(4,0), POS(0,4), POS(4,4)
]);

// Três fases são mantidas na estrutura geral do CONSCIÊNCIA+.
// Nesta versão, a Fase 1 está completa; Fases 2 e 3 ficam preparadas
// para receber os próximos conteúdos sem alterar a arquitetura.
const CONSCIOUS_PHASES = [
  {title:"Fase 1 • Rotina Consciente",missionTitle:"Quatro blocos, uma jornada",mission:"Complete os quatro blocos de atividades e acompanhe a evolução dos cinco sistemas do robô.",tip:"Cada bloco termina com um quiz e atualiza o Pentágono da Evolução.",size:5,start:POS(2,2),destinations:[],items:[],obstacles:[]},
  {title:"Fase 2 • Em preparação",missionTitle:"Próxima etapa da jornada",mission:"A estrutura da Fase 2 está reservada para a próxima atualização.",tip:"Seu progresso da Fase 1 está salvo no perfil.",positiveMessage:"Fase 2 preparada para expansão.",previewOnly:true,size:5,start:POS(2,2),destinations:[],items:[],obstacles:[]},
  {title:"Fase 3 • Em preparação",missionTitle:"Etapa final do CONSCIÊNCIA+",mission:"A estrutura da Fase 3 está reservada para a próxima atualização.",tip:"Ao final das três fases, cada eixo poderá alcançar até 5,0 pontos.",positiveMessage:"Fase 3 preparada para expansão.",previewOnly:true,size:5,start:POS(2,2),destinations:[],items:[],obstacles:[]}
];

function consciousSexKey(){
  return activeProfileSex === "feminino" ? "feminino" : "masculino";
}

function consciousAssetData(){
  return CONSCIOUS_SEX_ASSETS[consciousSexKey()];
}

function consciousCatalogEntry(number){
  return CONSCIOUS_IMAGE_CATALOG[Number(number)] || {code:"",name:`Imagem ${padAssetNumber(number)}`};
}

function buildConsciousBlockPhase(){
  const block = CONSCIOUS_BLOCKS[consciousBlockIndex] || CONSCIOUS_BLOCKS[0];
  const sexAssets = consciousAssetData();
  const phase = clonePhase(CONSCIOUS_PHASES[0]);
  phase.title = `Fase 1 • Bloco ${consciousBlockIndex + 1}/4 • ${block.title.replace(/^Bloco \d+ • /, "")}`;
  phase.missionTitle = block.missionTitle;
  phase.mission = block.mission;
  phase.tip = block.tip;
  phase.targetType = block.id;
  phase.activeBlockIndex = consciousBlockIndex;

  phase.destinations = sexAssets.stations.map((number,index)=>{
    const meta = consciousCatalogEntry(number);
    return {
      ...CONSCIOUS_CORNERS[index],
      image:consciousImage(number,meta.code),
      code:meta.code,
      accepts:[CONSCIOUS_BLOCKS[index].id],
      stationId:CONSCIOUS_BLOCKS[index].id,
      blockIndex:index,
      label:meta.name
    };
  });

  const taskNumbers = sexAssets.tasks[consciousBlockIndex];
  phase.items = taskNumbers.map((number,index)=>{
    const meta = consciousCatalogEntry(number);
    return {
      id:`c3-b${consciousBlockIndex+1}-${meta.code || number}-${index}`,
      x:0,y:0,
      image:consciousImage(number,meta.code),
      code:meta.code,
      type:block.id,
      label:meta.name
    };
  });
  phase.obstacles = [];
  return randomizeConsciousPhase(phase);
}

/* =========================================================
   NÍVEL 2 — ECOTECH+
========================================================= */
const ECOTECH_PHASES = [
  {
    title: "Fase 1 • Recicláveis e rejeitos",
    missionTitle: "Classifique antes de descartar",
    mission: "Colete uma unidade das imagens 01 a 06. Leve 01, 02 e 03 ao destino 07 e 04, 05 e 06 ao destino 08.",
    tip: "Observe a categoria de cada item antes de usar o ponto de destino. Os obstáculos 13 e 14 exigem planejamento de rota.",
    size: 6,
    start: POS(2, 3),
    destinations: [
      { x: 0, y: 0, image: 7, accepts: ["recycle"], label: "Imagem 07 • Ponto de reciclagem" },
      { x: 5, y: 5, image: 8, accepts: ["reject"], label: "Imagem 08 • Rejeitos" }
    ],
    items: [
      { id: "e1-01", x: 1, y: 0, image: 1, type: "recycle", label: "Imagem 01" },
      { id: "e1-02", x: 4, y: 0, image: 2, type: "recycle", label: "Imagem 02" },
      { id: "e1-03", x: 5, y: 2, image: 3, type: "recycle", label: "Imagem 03" },
      { id: "e1-04", x: 0, y: 4, image: 4, type: "reject", label: "Imagem 04" },
      { id: "e1-05", x: 2, y: 5, image: 5, type: "reject", label: "Imagem 05" },
      { id: "e1-06", x: 4, y: 4, image: 6, type: "reject", label: "Imagem 06" }
    ],
    obstacles: [
      { x: 2, y: 1, image: 13, label: "Imagem 13 • Obstáculo" },
      { x: 3, y: 3, image: 14, label: "Imagem 14 • Obstáculo" }
    ]
  },
  {
    title: "Fase 2 • Coleta seletiva",
    missionTitle: "Cada material no destino correto",
    mission: "Colete duas unidades de cada material e utilize as quatro lixeiras corretas nos cantos do tabuleiro.",
    tip: "09 recebe 01; 10 recebe 03; 11 recebe 16; 12 recebe 02. Os obstáculos 13, 15 e 14 ficam na região central.",
    size: 6,
    start: POS(1, 3),
    destinations: [
      { x: 0, y: 0, image: 9, accepts: ["paper"], label: "Imagem 09 • Papel" },
      { x: 5, y: 0, image: 10, accepts: ["glass"], label: "Imagem 10 • Vidro" },
      { x: 0, y: 5, image: 11, accepts: ["metal"], label: "Imagem 11 • Metal" },
      { x: 5, y: 5, image: 12, accepts: ["plastic"], label: "Imagem 12 • Plástico" }
    ],
    items: [
      { id: "e2-01a", x: 1, y: 0, image: 1, type: "paper", label: "Imagem 01" },
      { id: "e2-01b", x: 2, y: 1, image: 1, type: "paper", label: "Imagem 01" },
      { id: "e2-02a", x: 5, y: 1, image: 2, type: "plastic", label: "Imagem 02" },
      { id: "e2-02b", x: 4, y: 2, image: 2, type: "plastic", label: "Imagem 02" },
      { id: "e2-03a", x: 4, y: 0, image: 3, type: "glass", label: "Imagem 03" },
      { id: "e2-03b", x: 3, y: 1, image: 3, type: "glass", label: "Imagem 03" },
      { id: "e2-16a", x: 0, y: 3, image: 16, type: "metal", label: "Imagem 16" },
      { id: "e2-16b", x: 1, y: 4, image: 16, type: "metal", label: "Imagem 16" }
    ],
    obstacles: [
      { x: 2, y: 2, image: 13, label: "Imagem 13 • Obstáculo" },
      { x: 3, y: 2, image: 15, label: "Imagem 15 • Obstáculo" },
      { x: 2, y: 3, image: 14, label: "Imagem 14 • Obstáculo" },
      { x: 3, y: 3, image: 14, label: "Imagem 14 • Obstáculo" }
    ]
  }
];

/* =========================================================
   NÍVEL 3 — HUMANO+
========================================================= */
const HUMAN_PHASES = [
  {
    title: "Fase 1 • Cuidado e dignidade",
    missionTitle: "Acolher com respeito",
    mission: "Conduza crianças, mulheres, pessoas idosas e trabalhadores aos Salões do Acolhimento correspondentes.",
    tip: "Os salões representam identidade e proteção. Eles não isolam as pessoas: todos continuam integrados à mesma comunidade.",
    positiveMessage: "Todos chegaram aos seus Salões do Acolhimento. Crianças, mulheres, pessoas idosas e trabalhadores podem ter suas necessidades reconhecidas sem perder a convivência, a participação e o pertencimento à comunidade.",
    size: 6,
    start: POS(2, 2),
    destinations: [
      { x: 0, y: 0, image: 43, accepts: ["children"], label: "Imagem 43 • Salão das crianças" },
      { x: 5, y: 0, image: 44, accepts: ["women"], label: "Imagem 44 • Salão das mulheres" },
      { x: 0, y: 5, image: 45, accepts: ["elderly"], label: "Imagem 45 • Salão dos idosos" },
      { x: 5, y: 5, image: 46, accepts: ["workers"], label: "Imagem 46 • Salão dos trabalhadores" }
    ],
    items: [
      { id: "h1-33", x: 1, y: 0, image: 33, type: "women", label: "Imagem 33" },
      { id: "h1-34", x: 4, y: 1, image: 34, type: "women", label: "Imagem 34" },
      { id: "h1-35", x: 0, y: 2, image: 35, type: "elderly", label: "Imagem 35" },
      { id: "h1-36", x: 1, y: 4, image: 36, type: "elderly", label: "Imagem 36" },
      { id: "h1-37", x: 3, y: 0, image: 37, type: "children", label: "Imagem 37" },
      { id: "h1-38", x: 5, y: 2, image: 38, type: "children", label: "Imagem 38" },
      { id: "h1-39", x: 4, y: 3, image: 39, type: "children", label: "Imagem 39" },
      { id: "h1-40", x: 0, y: 3, image: 40, type: "workers", label: "Imagem 40" },
      { id: "h1-41", x: 2, y: 5, image: 41, type: "workers", label: "Imagem 41" },
      { id: "h1-42", x: 4, y: 5, image: 42, type: "workers", label: "Imagem 42" }
    ],
    obstacles: []
  },
  {
    title: "Fase 2 • Cultura e pertencimento",
    missionTitle: "Preservar identidades sem separar",
    mission: "Conduza indígenas, sul-americanos, árabes e asiáticos aos Salões do Acolhimento indicados.",
    tip: "Acolher significa respeitar histórias e culturas, mantendo diálogo, participação e convivência entre todos.",
    positiveMessage: "Você conduziu os grupos aos Salões do Acolhimento respeitando suas identidades. Cada grupo pode preservar e compartilhar sua cultura e seus costumes sem se isolar do convívio com os demais.",
    size: 6,
    start: POS(2, 2),
    destinations: [
      { x: 0, y: 0, image: 47, accepts: ["indigenous"], label: "Imagem 47 • Salão indígena" },
      { x: 5, y: 0, image: 50, accepts: ["southamerican"], label: "Imagem 50 • Salão sul-americano" },
      { x: 0, y: 5, image: 49, accepts: ["arab"], label: "Imagem 49 • Salão árabe" },
      { x: 5, y: 5, image: 48, accepts: ["asian"], label: "Imagem 48 • Salão asiático" }
    ],
    items: [
      { id: "h2-17", x: 1, y: 0, image: 17, type: "indigenous", label: "Imagem 17" },
      { id: "h2-18", x: 1, y: 3, image: 18, type: "indigenous", label: "Imagem 18" },
      { id: "h2-19", x: 4, y: 1, image: 19, type: "asian", label: "Imagem 19" },
      { id: "h2-20", x: 5, y: 2, image: 20, type: "asian", label: "Imagem 20" },
      { id: "h2-21", x: 0, y: 3, image: 21, type: "arab", label: "Imagem 21" },
      { id: "h2-22", x: 2, y: 5, image: 22, type: "arab", label: "Imagem 22" },
      { id: "h2-23", x: 5, y: 3, image: 23, type: "southamerican", label: "Imagem 23" },
      { id: "h2-24", x: 3, y: 5, image: 24, type: "southamerican", label: "Imagem 24" }
    ],
    obstacles: []
  },
  {
    title: "Fase 3 • Memória, respeito e convivência",
    missionTitle: "Reconhecer, acolher e conviver",
    mission: "Conduza judeus, pessoas negras, ciganos e eslavos aos Salões do Acolhimento correspondentes.",
    tip: "O objetivo não é separar. É reconhecer identidades, preservar culturas e fortalecer a convivência em uma sociedade compartilhada.",
    positiveMessage: "Missão concluída. Os grupos foram acolhidos em espaços que valorizam memória, identidade e cultura. A diversidade permanece conectada pela convivência, pelo diálogo e pela igualdade de direitos.",
    size: 6,
    start: POS(2, 2),
    destinations: [
      { x: 0, y: 0, image: 51, accepts: ["jewish"], label: "Imagem 51 • Salão judeu" },
      { x: 5, y: 0, image: 52, accepts: ["black"], label: "Imagem 52 • Salão das pessoas negras" },
      { x: 0, y: 5, image: 53, accepts: ["roma"], label: "Imagem 53 • Salão cigano" },
      { x: 5, y: 5, image: 54, accepts: ["slavic"], label: "Imagem 54 • Salão eslavo" }
    ],
    items: [
      { id: "h3-25", x: 1, y: 0, image: 25, type: "jewish", label: "Imagem 25" },
      { id: "h3-26", x: 2, y: 1, image: 26, type: "jewish", label: "Imagem 26" },
      { id: "h3-27", x: 0, y: 3, image: 27, type: "roma", label: "Imagem 27" },
      { id: "h3-28", x: 1, y: 4, image: 28, type: "roma", label: "Imagem 28" },
      { id: "h3-29", x: 4, y: 1, image: 29, type: "slavic", label: "Imagem 29" },
      { id: "h3-30", x: 5, y: 2, image: 30, type: "slavic", label: "Imagem 30" },
      { id: "h3-31", x: 4, y: 3, image: 31, type: "black", label: "Imagem 31" },
      { id: "h3-32", x: 3, y: 5, image: 32, type: "black", label: "Imagem 32" }
    ],
    obstacles: []
  }
];


/* =========================================================
   NÍVEL 4 — CONTINUIDADE+
   Estrutura inicial preparada para receber novas imagens,
   objetivos e regras em uma atualização posterior.
========================================================= */
const LEVEL4_PHASES = [
  {
    title: "Fase de preparação",
    missionTitle: "Nova missão em preparação",
    mission: "Este tabuleiro 6×6 está preparado para receber a próxima etapa da jornada do seu robô. As imagens, objetos, personagens e novos desafios serão adicionados posteriormente.",
    tip: "Observe a estrutura do tabuleiro. Esta fase serve como base para a próxima atualização do jogo.",
    positiveMessage: "Estrutura do Nível 4 preparada.",
    previewOnly: true,
    size: 6,
    start: POS(2, 2),
    destinations: [],
    items: [],
    obstacles: []
  }
];

const LEVELS = {
  conscious: { name: "CONSCIÊNCIA+", phases: CONSCIOUS_PHASES, theme: "Organize sua rotina. Cuide de si.", quiz: true },
  eco: { name: "ECOTECH+", phases: ECOTECH_PHASES, theme: "Planeje, programe e recicle.", quiz: true },
  human: { name: "HUMANO+", phases: HUMAN_PHASES, theme: "Acolha, respeite e conviva.", quiz: true },
  future: { name: "CONTINUIDADE+", phases: LEVEL4_PHASES, theme: "A próxima missão começa aqui.", quiz: false }
};

const QUIZ_BANK = {
  conscious: [
    {
      theme:"Bloco 1 — Sono que restaura",
      questions:[
        {category:"SONO",axisPoints:{sleep:0.25},question:"Guardar o celular longe da cama antes de dormir pode ajudar a diminuir distrações?",options:["SIM","NÃO"],correct:0,feedback:"✅ Correto! Reduzir estímulos e distrações ajuda a preparar uma rotina de descanso."},
        {category:"SONO",axisPoints:{sleep:0.25},question:"Dormir e descansar fazem parte dos cuidados necessários para recuperar energia e atenção?",options:["SIM","NÃO"],correct:0,feedback:"✅ Correto! O descanso faz parte do cuidado com o corpo e com a aprendizagem."}
      ]
    },
    {
      theme:"Bloco 2 — Higiene e alimentação",
      questions:[
        {category:"HIGIENE",axisPoints:{hygiene:0.25},question:"Cuidar da higiene pessoal diariamente ajuda a proteger o corpo e prevenir problemas de saúde?",options:["SIM","NÃO"],correct:0,feedback:"✅ Correto! Hábitos de higiene fazem parte do autocuidado e da prevenção."},
        {category:"ALIMENTAÇÃO",axisPoints:{food:0.25},question:"Fazer uma refeição adequada no início do dia pode contribuir para a energia necessária às atividades?",options:["SIM","NÃO"],correct:0,feedback:"✅ Correto! A alimentação fornece energia para as atividades do dia."},
        {category:"CUIDADO INTEGRADO",axisPoints:{hygiene:0.25,food:0.25},question:"Higiene e alimentação são cuidados diferentes, mas ambos colaboram para o funcionamento saudável do corpo?",options:["SIM","NÃO"],correct:0,feedback:"✅ Correto! Diferentes hábitos de autocuidado atuam juntos na rotina."}
      ]
    },
    {
      theme:"Bloco 3 — Dedicação aos estudos",
      questions:[
        {category:"ORGANIZAÇÃO",axisPoints:{study:0.25},question:"Organizar o material antes da aula pode ajudar a acompanhar melhor as atividades escolares?",options:["SIM","NÃO"],correct:0,feedback:"✅ Correto! Preparar os materiais reduz esquecimentos e favorece a participação."},
        {category:"RESPONSABILIDADE",axisPoints:{study:0.25},question:"Participar das atividades e entregá-las quando solicitado faz parte da responsabilidade com os estudos?",options:["SIM","NÃO"],correct:0,feedback:"✅ Correto! Participação e compromisso ajudam a construir hábitos de estudo."}
      ]
    },
    {
      theme:"Bloco 4 — Trabalho e Lazer",
      questions:[
        {category:"EQUILÍBRIO",axisPoints:{balance:0.25},question:"Depois das responsabilidades, reservar um momento de lazer pode fazer parte de uma rotina equilibrada?",options:["SIM","NÃO"],correct:0,feedback:"✅ Correto! O lazer também contribui para o bem-estar quando integrado às responsabilidades."},
        {category:"BEM-ESTAR",axisPoints:{balance:0.25},question:"Para ser responsável, uma pessoa precisa eliminar completamente os momentos de descanso e lazer?",options:["SIM","NÃO"],correct:1,feedback:"✅ Correto! Responsabilidade não significa viver sem descanso ou lazer; equilíbrio também é importante."}
      ]
    }
  ],
  eco: [
    {
      theme: "Fase 1 — Recicláveis e rejeitos",
      questions: [
        {
          category: "DESTINAÇÃO DE RESÍDUOS",
          question: "Todo material descartado pode ser colocado no mesmo recipiente?",
          options: ["SIM", "NÃO"],
          correct: 1,
          feedback: "✅ Correto! Materiais diferentes precisam receber destinos adequados. Separar os resíduos facilita o reaproveitamento e evita contaminação."
        },
        {
          category: "RECICLAGEM",
          question: "Papelão, garrafa PET e garrafa de vidro podem ser separados para reciclagem?",
          options: ["VERDADEIRO", "FALSO"],
          correct: 0,
          feedback: "✅ Correto! Papelão, plástico e vidro podem participar de processos de reciclagem quando separados adequadamente."
        },
        {
          category: "ATERROS SANITÁRIOS",
          question: "Separar corretamente recicláveis e rejeitos ajuda a reduzir o descarte inadequado?",
          options: ["VERDADEIRO", "FALSO"],
          correct: 0,
          feedback: "✅ Correto! A separação dos resíduos contribui para o reaproveitamento de materiais, evita a contaminação e ajuda a preservar o meio ambiente, pois reduz o volume de resíduos enviados aos aterros sanitários."
        }
      ]
    },
    {
      theme: "Fase 2 — Coleta seletiva",
      questions: [
        {
          category: "PAPEL E PAPELÃO",
          question: "Qual cor representa papel e papelão no jogo?",
          options: ["AZUL", "VERDE", "VERMELHO"],
          correct: 0,
          feedback: "✅ Correto! A lixeira azul é utilizada para papel e papelão."
        },
        {
          category: "PLÁSTICO",
          question: "Em qual lixeira deve ser colocada uma garrafa PET?",
          options: ["VERDE", "VERMELHA", "AMARELA"],
          correct: 1,
          feedback: "✅ Correto! No sistema de coleta seletiva trabalhado no jogo, o vermelho corresponde ao plástico."
        },
        {
          category: "VIDRO",
          question: "Qual associação está correta?",
          options: ["VERDE — VIDRO", "AMARELO — PAPEL", "AZUL — PLÁSTICO"],
          correct: 0,
          feedback: "✅ Correto! Verde corresponde ao vidro. Reconhecer as categorias facilita a separação correta dos materiais."
        }
      ]
    }
  ],

  human: [
    {
      theme: "Fase 1 — Crianças, mulheres, idosos e trabalhadores",
      questions: [
        {
          category: "DIGNIDADE E RESPEITO",
          question: "Crianças, mulheres, idosos e trabalhadores possuem os mesmos direitos fundamentais à dignidade e ao respeito?",
          options: ["VERDADEIRO", "FALSO"],
          correct: 0,
          feedback: "✅ Correto! Os direitos humanos pertencem a todas as pessoas. Idade, gênero ou atividade profissional não diminuem a dignidade de ninguém."
        },
        {
          category: "PARTICIPAÇÃO",
          question: "Uma pessoa idosa deve ser excluída das decisões da comunidade apenas por causa da idade?",
          options: ["SIM", "NÃO"],
          correct: 1,
          feedback: "✅ Correto! Envelhecer não elimina o direito de participar, opinar, conviver e ser respeitado."
        },
        {
          category: "TRABALHO E SOCIEDADE",
          question: "Valorizar trabalhadores significa reconhecer que diferentes profissões contribuem para a sociedade?",
          options: ["VERDADEIRO", "FALSO"],
          correct: 0,
          feedback: "✅ Correto! Todo trabalho digno merece respeito. Diferentes profissões desempenham funções importantes para a vida coletiva."
        }
      ]
    },
    {
      theme: "Fase 2 — Povos indígenas, imigrantes sul-americanos, árabes e asiáticos",
      questions: [
        {
          category: "CULTURA E PERTENCIMENTO",
          question: "Uma pessoa precisa abandonar sua cultura para participar plenamente da sociedade em que vive?",
          options: ["SIM", "NÃO"],
          correct: 1,
          feedback: "✅ Correto! Uma pessoa pode preservar sua identidade, seus costumes e suas tradições e, ao mesmo tempo, conviver e participar da sociedade."
        },
        {
          category: "SALÕES DO ACOLHIMENTO",
          question: "O Salão do Acolhimento foi criado no jogo para separar os grupos uns dos outros?",
          options: ["SIM", "NÃO"],
          correct: 1,
          feedback: "✅ Correto! O Salão do Acolhimento simboliza reconhecimento e valorização da identidade.\n\n⚠️ ALERTA PEDAGÓGICO: acolhimento não é separação; preservar culturas e costumes não significa impedir o convívio entre pessoas diferentes."
        },
        {
          category: "CONVIVÊNCIA INTERCULTURAL",
          question: "Conviver com pessoas de diferentes culturas pode ampliar conhecimentos e experiências?",
          options: ["VERDADEIRO", "FALSO"],
          correct: 0,
          feedback: "✅ Correto! A convivência intercultural permite compartilhar conhecimentos, histórias, tradições e diferentes formas de compreender o mundo."
        }
      ]
    },
    {
      theme: "Fase 3 — Judeus, negros, ciganos e eslavos",
      questions: [
        {
          category: "DIREITOS HUMANOS",
          question: "Perseguir uma pessoa por sua origem étnica, cultural ou religiosa viola os direitos humanos?",
          options: ["VERDADEIRO", "FALSO"],
          correct: 0,
          feedback: "✅ Correto! Ninguém deve ser perseguido ou discriminado por sua origem, cultura, religião ou pertencimento a determinado grupo."
        },
        {
          category: "RESPEITO À DIVERSIDADE",
          question: "Respeitar uma cultura diferente significa que precisamos abandonar a nossa própria cultura?",
          options: ["SIM", "NÃO"],
          correct: 1,
          feedback: "✅ Correto! Diferentes identidades podem coexistir. Respeitar a cultura do outro não exige abandonar a própria."
        },
        {
          category: "PARTICIPAÇÃO E CONVIVÊNCIA",
          question: "Qual atitude fortalece os direitos humanos?",
          options: ["IMPEDIR GRUPOS DIFERENTES DE CONVIVER", "RESPEITAR DIFERENÇAS E GARANTIR PARTICIPAÇÃO", "OBRIGAR TODAS AS PESSOAS A TER OS MESMOS COSTUMES"],
          correct: 1,
          feedback: "✅ Correto! Uma sociedade democrática permite diferenças e busca garantir dignidade, participação, respeito e convivência."
        }
      ]
    }
  ]
};

const PROFILE_STORAGE_KEY = "profLeiaProfilesV1";
const PROFILE_EXPORT_VERSION = 2;
const CONTRACT_VERSION = 1;
const CONTRACT_DOCX_FILE = "CONTRATO_DA_JORNADA_ROBO.docx";
const ROBOT_ASSETS = {
  masculino: {
    inicial: "assets/robo_m_inicial.png",
    intermediario: "assets/robo_m_intermediario.png",
    evoluido: "assets/robo_m_evoluido.png"
  },
  feminino: {
    inicial: "assets/robo_f_inicial.png",
    intermediario: "assets/robo_f_intermediario.png",
    evoluido: "assets/robo_f_evoluido.png"
  }
};
let activeProfileName = null;
let activeProfileSex = null;
let pendingLegacyProfile = null;
let contractListening = false;

function createDefaultProgress() {
  return {
    consciousUnlockedPhase: 0,
    consciousComplete: false,
    consciousJourneyVersion: 3,
    consciousPhase1Block: 0,
    consciousPhase1Complete: false,
    consciousPhase1Awards: {},
    pentagonScores: { hygiene:2, food:2, sleep:2, study:2, balance:2 },
    ecoUnlocked: false,
    ecoUnlockedPhase: 0,
    ecoComplete: false,
    humanUnlocked: false,
    humanUnlockedPhase: 0,
    humanComplete: false,
    level4Unlocked: false,
    level4UnlockedPhase: 0,
    level4Complete: false
  };
}

function normalizeProgress(raw = {}) {
  const base = createDefaultProgress();
  const merged = { ...base, ...(raw || {}) };
  merged.pentagonScores = { ...base.pentagonScores, ...((raw && raw.pentagonScores) || {}) };
  merged.consciousPhase1Awards = { ...((raw && raw.consciousPhase1Awards) || {}) };
  Object.keys(merged.pentagonScores).forEach(axis => {
    const value = Number(merged.pentagonScores[axis]);
    merged.pentagonScores[axis] = Number.isFinite(value) ? Math.max(2, Math.min(5, value)) : 2;
  });
  return merged;
}

let progress = createDefaultProgress();

let currentLevelKey = "conscious";
let currentPhaseIndex = 0;
let robot = { x: 0, y: 0 };
let items = [];
let carrying = [];
let delivered = new Set();
let queue = [];
let executions = 0;
let errors = 0;
let executing = false;
let phaseCompleted = false;
let pendingAdvance = false;
let currentQuizIndex = 0;
let quizAnswered = false;
let quizCorrect = 0;
let quizCorrectIndexes = [];
let boundaryTimer = null;
let passwordTarget = null;
let runtimePhase = null;

// Estado específico do CONSCIÊNCIA+ 3.0
let consciousConsecutiveErrors = 0;
let consciousBlockIndex = 0;
let consciousClueLocked = false;
let pendingConsciousEvolution = null;
let consciousCurrentTaskGains = {};

// Proteção de entrada: cada toque/clique deve gerar apenas UM comando.
// Filtra duplicações muito rápidas do mesmo comando sem alterar a lógica do algoritmo.
const COMMAND_INPUT_GUARD_MS = 140;
let lastCommandInput = { command: null, time: 0 };

const $ = id => document.getElementById(id);

window.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  showProfileScreen();
});

function bindEvents() {
  $("createProfileBtn").onclick = createProfileFromForm;
  $("loginProfileBtn").onclick = loginProfileFromForm;
  $("exportProfileBtn").onclick = exportProfileFromLanding;
  $("importProfileBtn").onclick = importProfileFromFile;
  $("headerExportProfileBtn").onclick = exportActiveProfile;
  $("headerContractBtn").onclick = () => { if (activeProfileName) showContractScreen(getProfiles()[activeProfileName], true); };
  $("switchProfileBtn").onclick = switchProfile;

  document.querySelectorAll("[data-legacy-sex]").forEach(button => {
    button.onclick = () => saveLegacyProfileSex(button.dataset.legacySex);
  });

  document.querySelectorAll(".contract-check").forEach(check => {
    check.addEventListener("change", updateContractProgress);
  });
  $("listenContractBtn").onclick = toggleContractAudio;
  $("contractMoreBtn").onclick = () => $("contractMoreModal").classList.remove("hidden");
  $("closeContractMoreBtn").onclick = () => $("contractMoreModal").classList.add("hidden");
  $("signContractBtn").onclick = registerContract;
  $("startJourneyAfterContractBtn").onclick = openHomeAfterContract;
  $("downloadContractBtn").onclick = downloadContractDocx;
  $("createProfilePinConfirm").addEventListener("keydown", event => { if (event.key === "Enter") createProfileFromForm(); });
  $("loginProfilePin").addEventListener("keydown", event => { if (event.key === "Enter") loginProfileFromForm(); });
  $("exportProfilePin").addEventListener("keydown", event => { if (event.key === "Enter") exportProfileFromLanding(); });

  $("startConsciousBtn").onclick = startConsciousFromHome;
  $("homeConsciousBtn").onclick = startConsciousFromHome;
  $("homeEcoBtn").onclick = tryOpenEco;
  $("homeHumanBtn").onclick = tryOpenHuman;
  $("homeLevel4Btn").onclick = tryOpenLevel4;

  $("helpBtn").onclick = openHelp;
  $("quickHelpBtn").onclick = openHelp;
  $("closeHelpBtn").onclick = closeHelp;
  $("closeHelpBottomBtn").onclick = closeHelp;
  $("backHomeBtn").onclick = goHome;

  document.querySelectorAll("[data-command]").forEach(button => {
    button.onclick = event => {
      event.preventDefault();
      addCommand(button.dataset.command, "button");
    };
  });

  $("executeBtn").onclick = runQueue;
  $("undoBtn").onclick = undoCommand;
  $("clearBtn").onclick = clearQueue;
  $("resetBtn").onclick = resetPhase;
  $("consciousClueRestartBtn").onclick = restartConsciousJourney;

  $("viewerCloseBtn").onclick = closeViewer;
  $("imageViewer").onclick = event => {
    if (event.target === $("imageViewer")) closeViewer();
  };

  $("passwordBtn").onclick = () => openPasswordModal(null);
  $("closePasswordBtn").onclick = () => $("passwordModal").classList.add("hidden");
  $("passwordConfirmBtn").onclick = confirmPassword;
  $("passwordInput").addEventListener("keydown", event => {
    if (event.key === "Enter") confirmPassword();
  });

  $("quizNextBtn").onclick = nextQuizStep;
  $("continueBtn").onclick = continueAfterResult;
  $("continueEvolutionBtn").onclick = advanceAfterPhase;
  $("phase1HomeBtn").onclick = () => { $("phase1CompleteModal").classList.add("hidden"); goHome(); };
  $("humanIntroStartBtn").onclick = () => {
    $("humanIntroModal").classList.add("hidden");
    startLevel("human", Math.min(progress.humanUnlockedPhase, 2));
  };
  $("finalHomeBtn").onclick = () => {
    $("finalModal").classList.add("hidden");
    goHome();
  };

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      if (!$("imageViewer").classList.contains("hidden")) return closeViewer();
      if (!$("helpModal").classList.contains("hidden")) return closeHelp();
      if (!$("passwordModal").classList.contains("hidden")) return $("passwordModal").classList.add("hidden");
      if (!$("contractMoreModal").classList.contains("hidden")) return $("contractMoreModal").classList.add("hidden");
      if (!$("evolutionModal").classList.contains("hidden")) return;
      if (!$("phase1CompleteModal").classList.contains("hidden")) return;
      return;
    }

    if ($("gameScreen").classList.contains("hidden") || executing) return;
    const keyMap = {
      ArrowUp: "MOVE_UP",
      ArrowDown: "MOVE_DOWN",
      ArrowLeft: "MOVE_LEFT",
      ArrowRight: "MOVE_RIGHT"
    };
    if (keyMap[event.key]) {
      event.preventDefault();
      // Evita que manter a tecla pressionada gere dois ou mais avanços.
      if (event.repeat) return;
      addCommand(keyMap[event.key], "keyboard");
    }
  });
}

function refreshHome() {
  if (!activeProfileName) return;
  const consciousDone = progress.consciousComplete;
  const phase1Done = !!progress.consciousPhase1Complete;
  const ecoAvailable = progress.ecoUnlocked || consciousDone;
  const humanAvailable = progress.humanUnlocked || progress.ecoComplete;
  const level4Available = progress.level4Unlocked || progress.humanComplete;

  $("consciousStatus").textContent = consciousDone
    ? "Concluído ✓"
    : phase1Done
      ? "Fase 1 concluída ✓ • Fase 2 em preparação"
      : `Fase 1 • Bloco ${Math.min(4, Number(progress.consciousPhase1Block || 0) + 1)} disponível`;
  $("ecoStatus").textContent = progress.ecoComplete ? "Concluído ✓" : ecoAvailable ? `Fase ${progress.ecoUnlockedPhase + 1} disponível` : "Bloqueado";
  $("humanStatus").textContent = progress.humanComplete ? "Concluído ✓" : humanAvailable ? `Fase ${progress.humanUnlockedPhase + 1} disponível` : "Bloqueado";
  $("level4Status").textContent = level4Available ? "Disponível" : "Bloqueado";

  $("homeEcoBtn").classList.toggle("available", ecoAvailable);
  $("homeHumanBtn").classList.toggle("available", humanAvailable);
  $("homeLevel4Btn").classList.toggle("available", level4Available);
  renderPentagon();
}

function tryOpenEco() {
  if (!(progress.ecoUnlocked || progress.consciousComplete)) {
    openPasswordModal("eco");
    return;
  }
  startLevel("eco", Math.min(progress.ecoUnlockedPhase, ECOTECH_PHASES.length - 1));
}

function tryOpenHuman() {
  if (!(progress.humanUnlocked || progress.ecoComplete)) {
    openPasswordModal("human");
    return;
  }
  $("humanIntroModal").classList.remove("hidden");
}

function tryOpenLevel4() {
  if (!(progress.level4Unlocked || progress.humanComplete)) {
    openPasswordModal("future");
    return;
  }
  startLevel("future", 0);
}

function openPasswordModal(target = null) {
  passwordTarget = target;
  $("passwordFeedback").textContent = "";
  $("passwordInput").value = "";
  $("passwordModal").classList.remove("hidden");
  setTimeout(() => $("passwordInput").focus(), 50);
}

function confirmPassword() {
  if ($("passwordInput").value.trim() === SPECIAL_PASSWORD) {
    progress.ecoUnlocked = true;
    progress.humanUnlocked = true;
    progress.level4Unlocked = true;
    saveProgress();
    refreshHome();
    $("passwordModal").classList.add("hidden");

    const target = passwordTarget;
    passwordTarget = null;

    if (target === "eco") {
      startLevel("eco", Math.min(progress.ecoUnlockedPhase, ECOTECH_PHASES.length - 1));
      return;
    }
    if (target === "human") {
      $("humanIntroModal").classList.remove("hidden");
      return;
    }
    if (target === "future") {
      startLevel("future", 0);
      return;
    }

    showHomeMessage("✅ ECOTECH+, HUMANO+ e CONTINUIDADE+ foram desbloqueados com a senha especial.");
    return;
  }
  $("passwordFeedback").textContent = "Senha incorreta. Tente novamente.";
}

function showHomeMessage(message) {
  alert(message);
}

function startConsciousFromHome() {
  consciousConsecutiveErrors = 0;
  if (progress.consciousPhase1Complete) {
    currentLevelKey = "conscious";
    currentPhaseIndex = 1;
    startLevel("conscious", 1);
    return;
  }
  consciousBlockIndex = Math.max(0, Math.min(3, Number(progress.consciousPhase1Block || 0)));
  startLevel("conscious", 0);
}

function updateConsciousErrorUI() {
  const value = $("consciousClueErrors");
  if (value) value.textContent = `${consciousConsecutiveErrors}/2`;
}

function showConsciousClueScreen() {
  consciousClueLocked = false;
  $("gameScreen").classList.add("hidden");
  $("consciousClueScreen").classList.remove("hidden");
  $("consciousClueRestartPanel").classList.add("hidden");
  $("consciousClueFeedback").textContent = "Escolha a pista que corresponde ao próximo bloco da rotina.";
  $("consciousClueFeedback").className = "clue-feedback info";
  updateConsciousErrorUI();

  const container = $("consciousClueCards");
  container.innerHTML = "";

  shuffle(CONSCIOUS_CLUES.map((clue, index) => ({ ...clue, index }))).forEach(clue => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "clue-card";
    button.innerHTML = `<span class="clue-icon">${clue.icon}</span><strong>${escapeHtml(clue.lead)}</strong><p>${escapeHtml(clue.text)}</p>`;
    button.onclick = () => chooseConsciousClue(clue.index, button);
    container.appendChild(button);
  });
}

function chooseConsciousClue(clueIndex, button) {
  if (consciousClueLocked) return;

  if (clueIndex === consciousBlockIndex) {
    button.classList.add("correct");
    consciousConsecutiveErrors = 0;
    updateConsciousErrorUI();
    consciousClueLocked = true;
    $("consciousClueFeedback").textContent = `✅ Boa escolha! Bloco liberado: ${CONSCIOUS_CLUES[consciousBlockIndex].stage}.`;
    $("consciousClueFeedback").className = "clue-feedback success";
    setTimeout(() => {
      $("consciousClueScreen").classList.add("hidden");
      $("gameScreen").classList.remove("hidden");
      loadPhase();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 650);
    return;
  }

  button.classList.add("wrong");
  setTimeout(() => button.classList.remove("wrong"), 500);
  consciousConsecutiveErrors += 1;
  updateConsciousErrorUI();

  if (consciousConsecutiveErrors >= 2) {
    triggerConsciousRestart("Duas escolhas consecutivas ficaram fora da sequência lógica.");
    return;
  }

  $("consciousClueFeedback").textContent = "⚠️ Ainda não. Pense no que acontece antes.";
  $("consciousClueFeedback").className = "clue-feedback warning";
}

function resetConsciousErrorStreak() {
  consciousConsecutiveErrors = 0;
  updateConsciousErrorUI();
}

function registerConsciousLogicalError(message) {
  consciousConsecutiveErrors += 1;
  updateConsciousErrorUI();
  if (consciousConsecutiveErrors >= 2) {
    triggerConsciousRestart(message || "Dois erros consecutivos interromperam a sequência.");
    return true;
  }
  return false;
}

function triggerConsciousRestart(reason) {
  executing = false;
  setControlsDisabled(false);
  $("gameScreen").classList.add("hidden");
  $("consciousClueScreen").classList.remove("hidden");
  $("consciousClueCards").innerHTML = "";
  $("consciousClueFeedback").textContent = "Sequência interrompida. A rotina perdeu sua ordem.";
  $("consciousClueFeedback").className = "clue-feedback error";
  $("consciousClueRestartReason").textContent = reason;
  $("consciousClueRestartPanel").classList.remove("hidden");
  consciousClueLocked = true;
}

function restartConsciousJourney() {
  consciousConsecutiveErrors = 0;
  currentLevelKey = "conscious";
  currentPhaseIndex = 0;
  consciousBlockIndex = Math.max(0, Math.min(3, Number(progress.consciousPhase1Block || 0)));
  queue = [];
  $("consciousClueRestartPanel").classList.add("hidden");
  showConsciousClueScreen();
}

function startLevel(levelKey, phaseIndex = 0) {
  const level = LEVELS[levelKey];
  if (!level) return;
  currentLevelKey = levelKey;
  currentPhaseIndex = Math.max(0, Math.min(phaseIndex, level.phases.length - 1));
  $("homeScreen").classList.add("hidden");

  if (currentLevelKey === "conscious" && currentPhaseIndex === 0) {
    showConsciousClueScreen();
    return;
  }

  $("gameScreen").classList.remove("hidden");
  loadPhase();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function loadPhase() {
  const level = LEVELS[currentLevelKey];
  const basePhase = level.phases[currentPhaseIndex];
  runtimePhase = buildRuntimePhase(basePhase);
  runtimePhase.size = expectedBoardSize(currentLevelKey);
  const phase = runtimePhase;

  robot = { ...phase.start };
  items = phase.items.map(item => ({ ...item, collected: false, delivered: false }));
  carrying = [];
  delivered = new Set();
  queue = [];
  executions = 0;
  errors = 0;
  executing = false;
  phaseCompleted = false;
  pendingAdvance = false;
  if (currentLevelKey === "conscious" && currentPhaseIndex === 0) consciousCurrentTaskGains = {};
  hideBoundaryAlert();

  $("levelEyebrow").textContent = `NÍVEL ${level.name} • V${GAME_VERSION}`;
  $("stageTitle").textContent = phase.title;
  $("missionTitle").textContent = phase.missionTitle;
  $("missionText").textContent = phase.mission;
  $("missionTip").textContent = phase.tip;
  $("boardSizeLabel").textContent = `${phase.size} × ${phase.size}`;
  $("board").className = `board grid-${phase.size}`;
  $("humanBanner").classList.toggle("hidden", currentLevelKey !== "human");
  $("carryLabel").textContent = currentLevelKey === "human" ? "Acompanhando" : "Carregando";

  const actionButton = $("actionCommandBtn");
  if (actionButton) {
    if (currentLevelKey === "human") {
      actionButton.title = "Acompanhar / Entregar no Salão";
      actionButton.setAttribute("aria-label", "Acompanhar pessoa ou entregar grupo no Salão do Acolhimento");
    } else if (currentLevelKey === "conscious" && currentPhaseIndex === 0) {
      actionButton.title = "Coletar / Entregar tarefa";
      actionButton.setAttribute("aria-label", "Coletar tarefa ou entregar no canto ativo");
    } else {
      actionButton.title = "Coletar / Entregar";
      actionButton.setAttribute("aria-label", "Coletar objeto ou entregar no destino correto");
    }
  }

  renderPhaseDots();
  renderBoard();
  renderQueue();
  updateStats();
  renderPentagon();
  setControlsDisabled(false);

  if (phase.previewOnly) {
    setFeedback("🧩", "Fase em preparação", phase.mission || "Esta etapa receberá os próximos desafios em uma atualização futura.", "info");
    setControlsDisabled(true);
  } else if (currentLevelKey === "conscious" && currentPhaseIndex === 0) {
    const block = CONSCIOUS_BLOCKS[consciousBlockIndex];
    setFeedback("🎯", "Canto ativo", `${block.title}: todas as tarefas do bloco estão visíveis. Observe, planeje, colete e entregue no canto iluminado.`, "info");
  } else {
    setFeedback("💬", "Observe antes de agir", currentLevelKey === "human"
      ? "Um grupo por vez: ✓ nas pessoas e ✓ no Salão correto."
      : "Observe o tabuleiro e planeje antes de executar.", "info");
  }
}

function renderPhaseDots() {
  const level = LEVELS[currentLevelKey];
  const container = $("phaseDots");
  container.innerHTML = "";
  level.phases.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = "phase-dot";
    if (index === currentPhaseIndex) dot.classList.add("active");
    if (index < getUnlockedPhase(currentLevelKey)) dot.classList.add("done");
    container.appendChild(dot);
  });
}

function getUnlockedPhase(levelKey) {
  if (levelKey === "conscious") return progress.consciousUnlockedPhase;
  if (levelKey === "eco") return progress.ecoUnlockedPhase;
  if (levelKey === "human") return progress.humanUnlockedPhase;
  return progress.level4UnlockedPhase || 0;
}

function currentPhase() {
  return runtimePhase || LEVELS[currentLevelKey].phases[currentPhaseIndex];
}

function clonePhase(basePhase) {
  return {
    ...basePhase,
    start: { ...basePhase.start },
    destinations: basePhase.destinations.map(entry => ({ ...entry, accepts: [...entry.accepts] })),
    items: basePhase.items.map(entry => ({ ...entry })),
    obstacles: basePhase.obstacles.map(entry => ({ ...entry }))
  };
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function cellKey(x, y) {
  return `${x},${y}`;
}

function allRelevantCellsReachable(phase) {
  const blocked = new Set(phase.obstacles.map(o => cellKey(o.x, o.y)));
  const queueCells = [{ ...phase.start }];
  const visited = new Set([cellKey(phase.start.x, phase.start.y)]);

  while (queueCells.length) {
    const cell = queueCells.shift();
    const neighbors = [
      { x: cell.x + 1, y: cell.y },
      { x: cell.x - 1, y: cell.y },
      { x: cell.x, y: cell.y + 1 },
      { x: cell.x, y: cell.y - 1 }
    ];

    neighbors.forEach(next => {
      if (next.x < 0 || next.y < 0 || next.x >= phase.size || next.y >= phase.size) return;
      const key = cellKey(next.x, next.y);
      if (blocked.has(key) || visited.has(key)) return;
      visited.add(key);
      queueCells.push(next);
    });
  }

  return [...phase.items, ...phase.destinations].every(entry => visited.has(cellKey(entry.x, entry.y)));
}

function randomizePhasePositions(phase, { randomizeObstacles = false } = {}) {
  const fixed = new Set([
    cellKey(phase.start.x, phase.start.y),
    ...phase.destinations.map(d => cellKey(d.x, d.y))
  ]);

  for (let attempt = 0; attempt < 160; attempt++) {
    const candidate = clonePhase(phase);
    let pool = [];
    for (let y = 0; y < candidate.size; y++) {
      for (let x = 0; x < candidate.size; x++) {
        if (!fixed.has(cellKey(x, y))) pool.push({ x, y });
      }
    }
    pool = shuffle(pool);

    if (randomizeObstacles) {
      candidate.obstacles.forEach(obstacle => {
        const pos = pool.pop();
        obstacle.x = pos.x;
        obstacle.y = pos.y;
      });
    } else {
      const obstacleKeys = new Set(candidate.obstacles.map(o => cellKey(o.x, o.y)));
      pool = pool.filter(pos => !obstacleKeys.has(cellKey(pos.x, pos.y)));
    }

    candidate.items.forEach(item => {
      const pos = pool.pop();
      item.x = pos.x;
      item.y = pos.y;
    });

    if (allRelevantCellsReachable(candidate)) return candidate;
  }

  return clonePhase(phase);
}

function randomizeConsciousPhase(phase) {
  const candidate = clonePhase(phase);
  const forbidden = new Set([
    cellKey(candidate.start.x, candidate.start.y),
    ...candidate.destinations.map(destination => cellKey(destination.x, destination.y))
  ]);

  let pool = [];
  for (let y = 0; y < candidate.size; y++) {
    for (let x = 0; x < candidate.size; x++) {
      if (!forbidden.has(cellKey(x, y))) pool.push({ x, y });
    }
  }
  pool = shuffle(pool);

  candidate.items.forEach(item => {
    const pos = pool.pop();
    item.x = pos.x;
    item.y = pos.y;
  });

  return candidate;
}

function buildRuntimePhase(basePhase) {
  const phase = clonePhase(basePhase);
  phase.size = expectedBoardSize(currentLevelKey);

  // CONSCIÊNCIA+ 3.0: Fase 1 usa quatro cantos fixos e somente
  // as tarefas do bloco ativo são sorteadas pelo tabuleiro.
  if (currentLevelKey === "conscious" && currentPhaseIndex === 0) {
    return buildConsciousBlockPhase();
  }

  if (currentLevelKey === "eco") {
    return randomizePhasePositions(phase, { randomizeObstacles: true });
  }

  if (currentLevelKey === "human") {
    return randomizePhasePositions(phase, { randomizeObstacles: false });
  }

  return phase;
}

function createImage(ref, label) {
  const image = document.createElement("img");
  const displayName = label || imageName(ref);
  const candidates = imageCandidates(ref);
  let candidateIndex = 0;

  image.src = candidates[candidateIndex];
  image.alt = displayName;
  image.title = `${displayName} — clique para ampliar`;
  image.className = "cell-image";
  image.loading = "eager";
  image.onclick = event => {
    event.stopPropagation();
    openViewer(ref, displayName);
  };
  image.onerror = () => {
    candidateIndex += 1;
    if (candidateIndex < candidates.length) {
      image.src = candidates[candidateIndex];
      return;
    }
    image.style.display = "none";
    const fallback = image.parentElement?.querySelector(".image-fallback");
    if (fallback) fallback.hidden = false;
  };
  return image;
}

function addVisual(cell, ref, label) {
  const visualBox = document.createElement("div");
  visualBox.className = "visual-box";

  const fallback = document.createElement("div");
  fallback.className = "image-fallback";
  fallback.textContent = label || imageName(ref) || "Imagem indisponível";
  fallback.hidden = true;

  visualBox.appendChild(fallback);
  visualBox.appendChild(createImage(ref, label));
  cell.appendChild(visualBox);
}

function renderBoard() {
  const phase = currentPhase();
  const board = $("board");
  board.innerHTML = "";

  for (let y = 0; y < phase.size; y++) {
    for (let x = 0; x < phase.size; x++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.x = x;
      cell.dataset.y = y;

      const destination = phase.destinations.find(entry => entry.x === x && entry.y === y);
      const obstacle = phase.obstacles.find(entry => entry.x === x && entry.y === y);
      const item = items.find(entry => entry.x === x && entry.y === y && !entry.collected && !entry.delivered);

      if (destination) {
        cell.classList.add("dest");
        if (currentLevelKey === "conscious" && currentPhaseIndex === 0) {
          if (destination.blockIndex === consciousBlockIndex) cell.classList.add("conscious-dest-active");
          else if (destination.blockIndex < consciousBlockIndex) cell.classList.add("conscious-dest-done");
          else cell.classList.add("conscious-dest-locked");
        }
        addVisual(cell, destination.image, destination.label);

        const deliveredHere = deliveredCountAtDestination(destination);
        if (deliveredHere > 0) {
          const badge = document.createElement("span");
          badge.className = "delivery-badge";
          badge.textContent = `✓ ${deliveredHere}`;
          badge.title = currentLevelKey === "human"
            ? `${deliveredHere} pessoa(s) acolhida(s) neste Salão`
            : `${deliveredHere} tarefa(s)/objeto(s) entregue(s) neste destino`;
          cell.appendChild(badge);
        }

        if (currentLevelKey === "conscious" && currentPhaseIndex === 0 && destination.blockIndex !== consciousBlockIndex) {
          const stateBadge = document.createElement("span");
          stateBadge.className = "corner-state-badge";
          stateBadge.textContent = destination.blockIndex < consciousBlockIndex ? "✓" : "🔒";
          cell.appendChild(stateBadge);
        }
      }

      if (obstacle) {
        cell.classList.add("obstacle");
        addVisual(cell, obstacle.image, obstacle.label);
      }

      if (item) addVisual(cell, item.image, item.label);

      if (robot.x === x && robot.y === y) {
        const robotPiece = document.createElement("div");
        robotPiece.className = "robot-piece";
        const playerRobotName = activeProfileName ? `Robô ${activeProfileName}` : "Robô do jogador";
        const badgeName = activeProfileName ? activeProfileName.slice(0, 8).toUpperCase() : "ROBÔ";
        robotPiece.setAttribute("aria-label", playerRobotName);
        robotPiece.innerHTML = `🤖<span class="robot-badge">${escapeHtml(badgeName)}</span>`;
        cell.appendChild(robotPiece);
      }

      board.appendChild(cell);
    }
  }
}

function openViewer(ref, explicitLabel = "") {
  const displayName = explicitLabel || imageName(ref);
  const candidates = imageCandidates(ref);
  let candidateIndex = 0;
  const viewerImage = $("viewerImage");

  viewerImage.onerror = () => {
    candidateIndex += 1;
    if (candidateIndex < candidates.length) viewerImage.src = candidates[candidateIndex];
  };
  viewerImage.src = candidates[candidateIndex];
  viewerImage.alt = displayName;
  $("viewerLabel").textContent = displayName;
  $("imageViewer").classList.remove("hidden");
}

function closeViewer() {
  $("imageViewer").classList.add("hidden");
}

function addCommand(command, source = "program") {
  if (executing || phaseCompleted) return;
  if (!COMMANDS[command]) return;

  // Consistência de entrada: um toque/clique deve acrescentar apenas um token.
  if (source === "button" || source === "keyboard") {
    const now = performance.now();
    if (
      lastCommandInput.command === command &&
      now - lastCommandInput.time < COMMAND_INPUT_GUARD_MS
    ) {
      return;
    }
    lastCommandInput = { command, time: now };
  }

  if (queue.length >= 60) {
    setFeedback("⚠️", "Limite atingido", "Máximo de 60 comandos.", "warning");
    return;
  }

  queue.push(command);
  renderQueue();
}

function undoCommand() {
  if (executing || queue.length === 0) return;
  queue.pop();
  renderQueue();
}

function clearQueueSilently() {
  queue = [];
  lastCommandInput = { command: null, time: 0 };
  renderQueue();
}

function clearQueue() {
  if (executing) return;
  clearQueueSilently();
  setFeedback("⌫", "Algoritmo limpo", "Monte uma nova sequência.", "info");
}

function resetPhase() {
  if (executing) return;
  if (currentLevelKey === "conscious") resetConsciousErrorStreak();
  loadPhase();
  setFeedback(
    "↻",
    "Fase reiniciada",
    currentLevelKey === "conscious" && currentPhaseIndex === 0
      ? "Seu robô voltou ao centro. Os quatro cantos permanecem fixos e as tarefas do bloco foram redistribuídas."
      : "Seu robô voltou ao início. O tabuleiro mudou.",
    "info"
  );
}

function renderQueue(activeIndex = -1) {
  const container = $("commandQueue");
  container.innerHTML = "";

  if (queue.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-queue";
    empty.textContent = "Nenhum comando adicionado.";
    container.appendChild(empty);
  }

  queue.forEach((command, index) => {
    const token = document.createElement("div");
    token.className = `command-token${command === "ACTION" ? " action" : ""}${index === activeIndex ? " active" : ""}`;
    token.textContent = COMMANDS[command].symbol;
    token.title = `${index + 1}. ${command}`;
    container.appendChild(token);
  });

  $("queueCount").textContent = queue.length;
}

async function runQueue() {
  if (executing || phaseCompleted) return;
  if (queue.length === 0) {
    setFeedback("⚠️", "Algoritmo vazio", "Adicione ao menos um comando.", "warning");
    return;
  }

  executing = true;
  executions += 1;
  updateStats();
  setControlsDisabled(true);

  // Registra o que realmente aconteceu nesta execução. Isso evita que uma
  // entrega bem-sucedida seja apagada por uma mensagem genérica no final.
  const summary = {
    collected: 0,
    accompanied: 0,
    delivered: 0,
    humanDelivered: 0
  };

  // Executa uma cópia imutável da fila: um token visível = uma ação.
  const executionQueue = queue.slice();

  for (let i = 0; i < executionQueue.length; i++) {
    renderQueue(i);
    const result = executeSingleCommand(executionQueue[i]);

    if (result.ok) {
      if (result.kind === "collect") summary.collected += 1;
      if (result.kind === "accompany") summary.accompanied += 1;
      if (result.kind === "delivery") summary.delivered += Number(result.deliveredCount || 0);
      if (result.kind === "human-delivery") summary.humanDelivered += Number(result.deliveredCount || 0);
    }

    renderBoard();
    updateStats();
    await sleep(360);

    if (!result.ok) {
      errors += 1;
      updateStats();

      if (result.kind === "boundary") {
        setFeedback(
          "🛠️",
          "Revise a rota",
          "A direção sai do tabuleiro. Corrija o comando.",
          "error"
        );
      } else {
        setFeedback(
          "🛠️",
          currentLevelKey === "conscious" && result.logicalError ? "Revise a sequência" : "Revise o algoritmo",
          currentLevelKey === "conscious" && result.logicalError
            ? result.message
            : `${result.message} Corrija e tente novamente.`,
          "error"
        );
      }

      executing = false;
      setControlsDisabled(false);
      renderQueue();

      if (currentLevelKey === "conscious" && result.logicalError) {
        if (registerConsciousLogicalError(result.message)) return;
        setFeedback(
          "⚠️",
          "Erro de sequência • 1/2",
          `${result.message} Mais um erro lógico consecutivo reiniciará o CONSCIÊNCIA+.`,
          "error"
        );
      }
      return;
    }

    if (isPhaseComplete()) {
      executing = false;
      phaseCompleted = true;
      setControlsDisabled(false);

      // Execução concluída com sucesso: limpa a fila automaticamente.
      // Isso evita que comandos da jogada anterior sejam reutilizados por engano.
      clearQueueSilently();
      finishPhase();
      return;
    }
  }

  executing = false;
  setControlsDisabled(false);

  // Se todos os comandos foram executados sem erro, a janela do algoritmo
  // é limpa automaticamente. Em caso de erro, a fila é preservada para depuração.
  clearQueueSilently();

  // Preserva a informação pedagogicamente mais importante da execução.
  // Entrega > acompanhamento/coleta > orientação de missão incompleta.
  const feedback = buildExecutionFeedback(summary);
  setFeedback(feedback.icon, feedback.title, feedback.text, feedback.type);
}

function executeSingleCommand(command) {
  if (command === "ACTION") return handleAction();
  const info = COMMANDS[command];
  return tryMove(robot.x + info.dx, robot.y + info.dy);
}

function tryMove(newX, newY) {
  const phase = currentPhase();
  if (newX < 0 || newX >= phase.size || newY < 0 || newY >= phase.size) {
    showBoundaryAlert("Limite do tabuleiro. Revise a direção.");
    return { ok: false, kind: "boundary", message: "Limite do tabuleiro." };
  }

  if (phase.obstacles.some(obstacle => obstacle.x === newX && obstacle.y === newY)) {
    return { ok: false, kind: "obstacle", message: "Há uma barreira nessa rota." };
  }

  robot = { x: newX, y: newY };
  return { ok: true };
}

function showBoundaryAlert(message) {
  const box = $("boundaryAlert");
  const text = $("boundaryAlertText");
  if (!box || !text) return;

  text.textContent = message;
  box.classList.remove("hidden");

  clearTimeout(boundaryTimer);
  boundaryTimer = setTimeout(() => {
    box.classList.add("hidden");
  }, 5200);
}

function hideBoundaryAlert() {
  clearTimeout(boundaryTimer);
  const box = $("boundaryAlert");
  if (box) box.classList.add("hidden");
}

function itemAtRobot() {
  return items.find(item =>
    !item.collected &&
    !item.delivered &&
    item.x === robot.x &&
    item.y === robot.y
  ) || null;
}

function destinationAtRobot() {
  const phase = currentPhase();
  return phase.destinations.find(destination =>
    destination.x === robot.x && destination.y === robot.y
  ) || null;
}

function carriedEntries() {
  return carrying
    .map(id => items.find(item => item.id === id))
    .filter(Boolean)
    .filter(item => !item.delivered);
}

function activeHumanGroup() {
  const people = carriedEntries();
  return people.length ? people[0].type : null;
}

function destinationAccepts(destination, item) {
  return Boolean(
    destination &&
    item &&
    (destination.accepts.includes(item.type) || destination.accepts.includes("all"))
  );
}

function deliveredCountAtDestination(destination) {
  return items.filter(item => item.delivered && destinationAccepts(destination, item)).length;
}

function buildExecutionFeedback(summary) {
  const remaining = Math.max(0, items.length - delivered.size);

  if (summary.humanDelivered > 0) {
    return {icon:"🤝",title:"Grupo acolhido!",text:`${summary.humanDelivered} pessoa(s) entregues. Faltam ${remaining}. Escolha o próximo grupo.`,type:"success"};
  }

  if (summary.delivered > 0) {
    if (currentLevelKey === "conscious" && currentPhaseIndex === 0) {
      return {icon:"✅",title:"Tarefa entregue",text:`${summary.delivered} tarefa(s) entregues ao canto ativo. Faltam ${remaining}.`,type:"success"};
    }
    return {icon:"♻️",title:"Entrega correta",text:`${summary.delivered} objeto(s) entregues. Faltam ${remaining}.`,type:"success"};
  }

  if (summary.accompanied > 0) {
    const group = activeHumanGroup();
    const carriedCount = group ? humanGroupCarried(group).length : carriedEntries().length;
    const totalCount = group ? humanGroupMembers(group).length : carriedCount;
    const pendingCount = Math.max(0, totalCount - carriedCount);
    return {icon:"🤝",title:"Acompanhamento",text:pendingCount > 0 ? `${humanGroupLabel(group)}: ${carriedCount}/${totalCount}. Faltam ${pendingCount}.` : `Grupo completo. Vá ao Salão correto e use ✓.`,type:"success"};
  }

  if (summary.collected > 0) {
    if (currentLevelKey === "conscious" && currentPhaseIndex === 0) {
      return {icon:"🎒",title:"Tarefa coletada",text:`Você está carregando ${carrying.length} tarefa(s). Pode coletar outras ou seguir ao canto ativo para entregar.`,type:"success"};
    }
    return {icon:"🎒",title:"Coleta realizada",text:`${summary.collected} objeto(s) coletados. Leve ao destino e use ✓.`,type:"success"};
  }

  return {icon:"🔧",title:"Continue a missão",text:getIncompleteMessage(),type:"warning"};
}

function collectOrAccompany(itemHere) {
  if (!itemHere) return { ok:false, message:"Nenhum item disponível nesta posição." };

  if (currentLevelKey === "conscious" && currentPhaseIndex === 0) {
    itemHere.collected = true;
    if (!carrying.includes(itemHere.id)) carrying.push(itemHere.id);
    resetConsciousErrorStreak();
    setFeedback("🎒","Tarefa coletada",`${itemHere.label}. Agora você pode coletar outra tarefa ou seguir ao canto ativo para entregar.`,"success");
    return {ok:true,kind:"collect",itemId:itemHere.id,itemType:itemHere.type,image:itemHere.image};
  }

  if (currentLevelKey === "human") {
    const activeGroup = activeHumanGroup();
    if (activeGroup && itemHere.type !== activeGroup) {
      return {ok:false,kind:"wrong-human-group",message:"Conclua o grupo atual antes de iniciar outro."};
    }
  }

  itemHere.collected = true;
  if (!carrying.includes(itemHere.id)) carrying.push(itemHere.id);

  if (currentLevelKey === "human") {
    const group = itemHere.type;
    const count = humanGroupCarried(group).length;
    const total = humanGroupMembers(group).length;
    const pending = Math.max(0, total - count);
    setFeedback("🤝","Pessoa acompanhada",pending > 0 ? `${humanGroupLabel(group)}: ${count}/${total}. Faltam ${pending}.` : `Grupo completo: ${count}/${total}. Vá ao Salão e use ✓.`,"success");
  } else {
    setFeedback("🎒","Objeto coletado",`${itemHere.label}. Leve ao destino correto e use ✓.`,"success");
  }

  return {ok:true,kind:currentLevelKey === "human" ? "accompany" : "collect",itemId:itemHere.id,itemType:itemHere.type,image:itemHere.image};
}

function deliverAtDestination(destination) {
  const carried = carriedEntries();
  if (!destination) return {ok:false,message:"Nenhum destino disponível nesta posição."};

  if (carried.length === 0) {
    return {ok:false,kind:"empty-delivery",logicalError:false,message:currentLevelKey === "human" ? "Você chegou ao Salão sem estar acompanhando nenhuma pessoa." : currentLevelKey === "conscious" ? "Você chegou ao canto sem carregar nenhuma tarefa." : "Você chegou ao destino sem carregar nenhum objeto."};
  }

  if (currentLevelKey === "conscious" && currentPhaseIndex === 0) {
    const correctStation = destination.blockIndex === consciousBlockIndex && destination.accepts.includes(currentPhase().targetType);
    if (!correctStation) {
      return {ok:false,kind:"conscious-wrong-station",logicalError:true,message:"Canto incorreto. Observe qual estação está iluminada para este bloco."};
    }

    const compatible = carried.filter(item => destinationAccepts(destination,item));
    if (!compatible.length) return {ok:false,kind:"wrong-destination",logicalError:true,message:"Este canto não recebe as tarefas que o robô está carregando."};

    compatible.forEach(item=>{item.delivered=true; delivered.add(item.id);});
    awardConsciousTaskDelivery(consciousBlockIndex, compatible);
    const deliveredIds = new Set(compatible.map(item=>item.id));
    carrying = carrying.filter(id=>!deliveredIds.has(id));
    resetConsciousErrorStreak();
    const remaining = Math.max(0,items.length-delivered.size);
    setFeedback("✅","Entrega correta",remaining > 0 ? `${compatible.length} tarefa(s) entregue(s). Faltam ${remaining}.` : "Todas as tarefas deste bloco foram entregues. Prepare-se para o quiz.","success");
    return {ok:true,kind:"delivery",deliveredCount:compatible.length,destinationImage:destination.image};
  }

  if (currentLevelKey === "human") {
    const group = activeHumanGroup();
    const correctSalon = destination.accepts.includes(group) || destination.accepts.includes("all");
    const pendingPeople = humanGroupPending(group);
    if (pendingPeople.length > 0) return {ok:false,kind:"incomplete-human-group",message:`Grupo incompleto. Faltam ${pendingPeople.length} pessoa(s).`};
    if (!correctSalon) return {ok:false,kind:"wrong-human-salon",message:"Salão incorreto. Leve o grupo ao Salão correspondente."};
    const toDeliver = carried.filter(person=>person.type===group);
    toDeliver.forEach(person=>{person.delivered=true;delivered.add(person.id);});
    const deliveredIds = new Set(toDeliver.map(person=>person.id));
    carrying = carrying.filter(id=>!deliveredIds.has(id));
    setFeedback("🤝","Grupo acolhido!",`${toDeliver.length} pessoa(s) chegaram ao Salão correto. Escolha o próximo grupo.`,"success");
    return {ok:true,kind:"human-delivery",deliveredCount:toDeliver.length,group,destinationImage:destination.image};
  }

  const compatible = carried.filter(item => destinationAccepts(destination,item));
  if (compatible.length === 0) return {ok:false,kind:"wrong-destination",message:"Destino incorreto para o objeto carregado."};
  compatible.forEach(item=>{item.delivered=true;delivered.add(item.id);});
  const deliveredIds = new Set(compatible.map(item=>item.id));
  carrying = carrying.filter(id=>!deliveredIds.has(id));
  const remainingCarried = carriedEntries().length;
  setFeedback("♻️","Entrega correta",remainingCarried > 0 ? `${compatible.length} entregue(s). Ainda carrega ${remainingCarried}.` : `${compatible.length} objeto(s) entregue(s).`,"success");
  return {ok:true,kind:"delivery",deliveredCount:compatible.length,destinationImage:destination.image};
}

function handleAction() {
  // Prioridade 1: se houver um item/pessoa sob o seu robô, o ✓ coleta/acompanha.
  const itemHere = itemAtRobot();
  if (itemHere) return collectOrAccompany(itemHere);

  // Prioridade 2: se ela estiver sobre um destino, o mesmo ✓ faz a entrega.
  const destination = destinationAtRobot();
  if (destination) return deliverAtDestination(destination);

  return {
    ok: false,
    kind: "nothing-here",
    logicalError: false,
    message: currentLevelKey === "human"
      ? "Nada para acompanhar ou entregar nesta posição."
      : currentLevelKey === "conscious"
        ? "Não há tarefa nem canto de entrega nesta posição."
        : "Nada para coletar ou entregar nesta posição."
  };
}

function isPhaseComplete() {
  return items.length > 0 && delivered.size === items.length;
}

function getIncompleteMessage() {
  const remaining = items.length - delivered.size;

  if (currentLevelKey === "conscious" && currentPhaseIndex === 0) {
    if (carrying.length > 0) return `Carregando ${carrying.length} tarefa(s). Faltam ${remaining} entrega(s) neste bloco.`;
    return remaining > 0 ? `Faltam ${remaining} tarefa(s). Observe as imagens, planeje a rota e use ✓ para coletar.` : "Bloco concluído.";
  }

  if (carrying.length > 0) {
    if (currentLevelKey === "human") {
      const group = activeHumanGroup();
      const carriedCount = group ? humanGroupCarried(group).length : carrying.length;
      const totalCount = group ? humanGroupMembers(group).length : carriedCount;
      const pendingCount = Math.max(0,totalCount-carriedCount);
      return pendingCount > 0 ? `${humanGroupLabel(group)}: ${carriedCount}/${totalCount}. Faltam ${pendingCount}.` : `Grupo completo. Vá ao Salão correto e use ✓.`;
    }
    return `Carregando ${carrying.length}. Faltam ${remaining} entrega(s).`;
  }

  return currentLevelKey === "human" ? `Faltam ${remaining} pessoa(s). Escolha um grupo.` : `Faltam ${remaining} item(ns).`;
}

function updateStats() {
  $("executionStat").textContent = executions;
  $("errorStat").textContent = errors;
  $("deliveredStat").textContent = `${delivered.size}/${items.length}`;

  if (currentLevelKey === "human" && carrying.length > 0) {
    const group = activeHumanGroup();
    const current = humanGroupCarried(group).length;
    const total = humanGroupMembers(group).length;
    $("carryStat").textContent = `${current}/${total}`;
    $("carryLabel").textContent = `Acompanhando • ${humanGroupLabel(group)}`;
  } else {
    $("carryStat").textContent = carrying.length;
    $("carryLabel").textContent = currentLevelKey === "human" ? "Acompanhando" : "Carregando";
  }

  $("remainingStat").textContent = Math.max(0, items.length - delivered.size);
}

function setControlsDisabled(disabled) {
  document.querySelectorAll("[data-command]").forEach(button => button.disabled = disabled);
  $("executeBtn").disabled = disabled;
  $("undoBtn").disabled = disabled;
  $("clearBtn").disabled = disabled;
  $("resetBtn").disabled = disabled;
}

function setFeedback(icon, title, text, type = "info") {
  $("feedbackIcon").textContent = icon;
  $("feedbackTitle").textContent = title;
  $("feedbackText").textContent = text;
  $("feedback").className = `feedback ${type}`;
}

function calculateRank() {
  if (errors > 0) {
    return {
      icon: "🔧",
      title: "Jogada Básica",
      text: "Houve erros durante a missão e foi necessário depurar o algoritmo. Corrigir, testar novamente e aprender com o erro faz parte do pensamento computacional."
    };
  }
  if (executions === 1) {
    return {
      icon: "⚡",
      title: "Jogada dos Deuses",
      text: "Você concluiu toda a missão em uma única execução e sem cometer erros. Excelente planejamento!"
    };
  }
  return {
    icon: "⭐",
    title: "Jogada Excelente",
    text: "Você concluiu a missão sem erros, mesmo utilizando mais de uma execução para organizar e completar o percurso."
  };
}


function axisStage(axis, score = null) {
  const value = score == null ? Number(progress.pentagonScores?.[axis] || 2) : Number(score);
  const def = PENTAGON_AXES[axis];
  if (!def) return "";
  const index = value >= 4 ? 2 : value >= 3 ? 1 : 0;
  return def.stages[index];
}

function consciousAwardRecord(blockIndex) {
  const key = String(blockIndex);
  if (!progress.consciousPhase1Awards || typeof progress.consciousPhase1Awards !== "object") progress.consciousPhase1Awards = {};
  if (!progress.consciousPhase1Awards[key]) progress.consciousPhase1Awards[key] = { tasks:false, quiz:false, taskCodes:[] };
  if (!Array.isArray(progress.consciousPhase1Awards[key].taskCodes)) progress.consciousPhase1Awards[key].taskCodes = [];
  return progress.consciousPhase1Awards[key];
}

function addPentagonScore(axis, delta, cap = 3) {
  if (!progress.pentagonScores) progress.pentagonScores = createDefaultProgress().pentagonScores;
  const before = Number(progress.pentagonScores[axis] || 2);
  const after = Math.min(cap, Math.max(2, before + Number(delta || 0)));
  progress.pentagonScores[axis] = after;
  return after - before;
}

function awardConsciousTaskDelivery(blockIndex, deliveredItems) {
  const award = consciousAwardRecord(blockIndex);
  const block = CONSCIOUS_BLOCKS[blockIndex];
  const totalTasks = consciousAssetData().tasks[blockIndex].length;
  const gains = {};
  (deliveredItems || []).forEach(item => {
    const code = String(item.code || item.id || "");
    if (!code || award.taskCodes.includes(code)) return;
    award.taskCodes.push(code);
    const perTask = 0.50 / totalTasks;
    (block?.axes || []).forEach(axis => {
      const gained = addPentagonScore(axis, perTask, 3);
      gains[axis] = Number(((gains[axis] || 0) + gained).toFixed(3));
      consciousCurrentTaskGains[axis] = Number(((consciousCurrentTaskGains[axis] || 0) + gained).toFixed(3));
    });
  });
  if (award.taskCodes.length >= totalTasks) award.tasks = true;
  if (Object.keys(gains).length) {
    saveProgress();
    renderPentagon();
  }
  return gains;
}

function awardConsciousQuizPoints(blockIndex, correctIndexes) {
  const award = consciousAwardRecord(blockIndex);
  const gains = {};
  if (award.quiz) return gains;
  const quizSet = QUIZ_BANK.conscious[blockIndex];
  (correctIndexes || []).forEach(index => {
    const question = quizSet?.questions?.[index];
    if (!question?.axisPoints) return;
    Object.entries(question.axisPoints).forEach(([axis, value]) => {
      const gained = addPentagonScore(axis, Number(value), 3);
      gains[axis] = Number(((gains[axis] || 0) + gained).toFixed(3));
    });
  });
  award.quiz = true;
  saveProgress();
  renderPentagon();
  return gains;
}

function pentagonAverage() {
  const scores = progress.pentagonScores || createDefaultProgress().pentagonScores;
  const values = Object.values(scores).map(Number);
  return values.reduce((sum,value)=>sum+value,0) / values.length;
}

function currentRobotStage() {
  const avg = pentagonAverage();
  return avg >= 4 ? "evoluido" : avg >= 3 ? "intermediario" : "inicial";
}

function updateRobotAvatarStage() {
  if (!activeProfileSex || !$("activeRobotAvatar")) return;
  $("activeRobotAvatar").src = getRobotAsset(currentRobotStage());
}

function polygonPointsForScores(scores, cx=120, cy=120, maxRadius=92) {
  const order = ["hygiene","food","sleep","study","balance"];
  return order.map((axis,index)=>{
    const angle = -Math.PI/2 + index * (Math.PI*2/5);
    const score = Math.max(0,Math.min(5,Number(scores?.[axis] || 0)));
    const radius = maxRadius * (score/5);
    return `${(cx+Math.cos(angle)*radius).toFixed(1)},${(cy+Math.sin(angle)*radius).toFixed(1)}`;
  }).join(" ");
}

function renderPentagonSvg(svg) {
  if (!svg) return;
  const scores = progress.pentagonScores || createDefaultProgress().pentagonScores;
  const grid = [1,2,3,4,5].map(level => {
    const temp = {hygiene:level,food:level,sleep:level,study:level,balance:level};
    return `<polygon points="${polygonPointsForScores(temp)}" class="pentagon-grid-ring"></polygon>`;
  }).join("");
  const axes = ["hygiene","food","sleep","study","balance"].map((_,index)=>{
    const angle=-Math.PI/2+index*(Math.PI*2/5);
    const x=120+Math.cos(angle)*92, y=120+Math.sin(angle)*92;
    return `<line x1="120" y1="120" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" class="pentagon-axis-line"></line>`;
  }).join("");
  const initial = {hygiene:2,food:2,sleep:2,study:2,balance:2};
  svg.innerHTML = `${grid}${axes}<polygon points="${polygonPointsForScores(initial)}" class="pentagon-initial"></polygon><polygon points="${polygonPointsForScores(scores)}" class="pentagon-current"></polygon>`;
}

function renderPentagon() {
  if (!progress?.pentagonScores) return;
  renderPentagonSvg($("pentagonSvg"));
  renderPentagonSvg($("evolutionPentagonSvg"));
  renderPentagonSvg($("phase1PentagonSvg"));
  const map = {hygiene:"Hygiene",food:"Food",sleep:"Sleep",study:"Study",balance:"Balance"};
  Object.entries(map).forEach(([axis,suffix])=>{
    const score = Number(progress.pentagonScores[axis] || 2);
    const valueEl = $(`pentagon${suffix}Value`);
    const stageEl = $(`pentagon${suffix}Stage`);
    if (valueEl) valueEl.textContent = score.toFixed(2).replace(".",",");
    if (stageEl) stageEl.textContent = axisStage(axis,score);
  });
  const avg = pentagonAverage();
  if ($("pentagonAverage")) $("pentagonAverage").textContent = avg.toFixed(2).replace(".",",");
  if ($("phase1Average")) $("phase1Average").textContent = avg.toFixed(2).replace(".",",");
  updateRobotAvatarStage();
}

function formatAxisGains(gains = {}) {
  const entries = Object.entries(gains).filter(([,value])=>Number(value) > 0);
  if (!entries.length) return "Pontuação já registrada anteriormente.";
  return entries.map(([axis,value])=>`${PENTAGON_AXES[axis]?.system || axis}: +${Number(value).toFixed(2).replace(".",",")}`).join(" • ");
}

function showConsciousEvolutionModal(taskGains, quizGains) {
  const block = CONSCIOUS_BLOCKS[consciousBlockIndex];
  $("evolutionBlockTitle").textContent = block?.title || "Bloco concluído";
  $("evolutionTaskGain").textContent = formatAxisGains(taskGains);
  $("evolutionQuizGain").textContent = formatAxisGains(quizGains);
  renderPentagon();
  $("evolutionModal").classList.remove("hidden");
}

function completeConsciousPhase1() {
  progress.consciousPhase1Complete = true;
  progress.consciousPhase1Block = 4;
  progress.consciousUnlockedPhase = Math.max(1,Number(progress.consciousUnlockedPhase || 0));
  saveProgress();
  renderPentagon();
  const sexAssets = consciousAssetData();
  const number = sexAssets.complete;
  const meta = consciousCatalogEntry(number);
  $("phase1CompleteImage").src = `${padAssetNumber(number)}.jpg`;
  $("phase1CompleteImage").alt = meta.name;
  $("phase1CompleteImageName").textContent = meta.name;
  $("phase1RobotImage").src = getRobotAsset(currentRobotStage());
  $("phase1RobotStage").textContent = currentRobotStage() === "intermediario" ? "INTERMEDIÁRIO" : currentRobotStage() === "evoluido" ? "EVOLUÍDO" : "INICIAL";
  $("gameScreen").classList.add("hidden");
  $("phase1CompleteModal").classList.remove("hidden");
}

function finishPhase() {
  const rank = calculateRank();
  const phase = currentPhase();
  pendingAdvance = true;

  $("resultIcon").textContent = rank.icon;
  $("resultTitle").textContent = rank.title;
  $("resultText").textContent = rank.text;

  const extra = $("resultExtra");
  extra.innerHTML = "";

  if (currentLevelKey === "human") {
    const positive = document.createElement("div");
    positive.className = "human-principle";
    positive.innerHTML = `<strong>🤝 Missão de acolhimento concluída</strong><span>${escapeHtml(phase.positiveMessage)}</span>`;
    extra.appendChild(positive);
  }

  if (currentLevelKey === "conscious" && currentPhaseIndex === 0) {
    const taskGains = { ...consciousCurrentTaskGains };
    pendingConsciousEvolution = { taskGains, quizGains:{} };
    const block = CONSCIOUS_BLOCKS[consciousBlockIndex];
    const note = document.createElement("div");
    note.className = "conscious-result-note";
    note.innerHTML = `<strong>🧩 ${escapeHtml(block.title)} concluído</strong><span>${items.length}/${items.length} tarefas entregues ao canto correto. Tarefas podem somar até +0,50 no(s) eixo(s) deste bloco.</span>`;
    extra.appendChild(note);
  }

  const legend = document.createElement("div");
  legend.className = "rank-legend";
  legend.innerHTML = `
    <div><strong>🔧 Jogada Básica</strong><span>Houve erro e foi preciso depurar.</span></div>
    <div><strong>⭐ Jogada Excelente</strong><span>Sem erros, mesmo em mais de uma execução.</span></div>
    <div><strong>⚡ Jogada dos Deuses</strong><span>Uma única execução e nenhum erro.</span></div>
  `;
  extra.appendChild(legend);

  $("continueBtn").textContent = LEVELS[currentLevelKey].quiz ? "IR PARA O QUIZ" : "CONTINUAR";
  $("resultModal").classList.remove("hidden");
}

function continueAfterResult() {
  $("resultModal").classList.add("hidden");
  if (!pendingAdvance) return;

  if (LEVELS[currentLevelKey].quiz) {
    startQuiz();
    return;
  }

  advanceAfterPhase();
}

function currentQuizSet() {
  const levelBank = QUIZ_BANK[currentLevelKey];
  if (currentLevelKey === "conscious" && currentPhaseIndex === 0) return levelBank?.[consciousBlockIndex] || null;
  return levelBank?.[currentPhaseIndex] || null;
}

function startQuiz() {
  const quizSet = currentQuizSet();
  if (!quizSet || !Array.isArray(quizSet.questions) || quizSet.questions.length === 0) {
    advanceAfterPhase();
    return;
  }
  currentQuizIndex = 0;
  quizAnswered = false;
  quizCorrect = 0;
  quizCorrectIndexes = [];
  $("quizModal").classList.remove("hidden");
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const quizSet = currentQuizSet();
  const questions = quizSet.questions;
  const question = questions[currentQuizIndex];

  $("quizTheme").textContent = `${LEVELS[currentLevelKey].name} • ${quizSet.theme}`;
  $("quizCategory").textContent = question.category;
  $("quizQuestion").textContent = question.question;
  $("quizProgress").textContent = `${currentQuizIndex + 1}/${questions.length}`;
  $("quizFeedback").textContent = "Escolha uma alternativa.";
  $("quizFeedback").className = "quiz-feedback neutral";
  $("quizNextBtn").disabled = true;
  $("quizNextBtn").textContent = currentQuizIndex === questions.length - 1 ? "CONCLUIR QUIZ" : "PRÓXIMA";
  quizAnswered = false;

  const options = $("quizOptions");
  options.innerHTML = "";
  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.textContent = option;
    button.onclick = () => answerQuiz(index);
    options.appendChild(button);
  });
}

function answerQuiz(index) {
  if (quizAnswered) return;
  quizAnswered = true;
  const quizSet = currentQuizSet();
  const question = quizSet.questions[currentQuizIndex];
  const buttons = [...$("quizOptions").querySelectorAll("button")];
  buttons.forEach(button => button.disabled = true);

  if (index === question.correct) {
    quizCorrect += 1;
    quizCorrectIndexes.push(currentQuizIndex);
    buttons[index].classList.add("correct");
    $("quizFeedback").textContent = question.feedback;
    $("quizFeedback").className = "quiz-feedback success";
  } else {
    buttons[index].classList.add("wrong");
    buttons[question.correct].classList.add("correct");
    const feedbackWithoutPrefix = question.feedback.replace(/^✅\s*Correto!\s*/i, "");
    $("quizFeedback").textContent = `❌ Resposta incorreta.\n\n${feedbackWithoutPrefix}`;
    $("quizFeedback").className = "quiz-feedback error";
  }
  $("quizNextBtn").disabled = false;
}

function nextQuizStep() {
  if (!quizAnswered) return;
  const quizSet = currentQuizSet();
  const questions = quizSet.questions;

  if (currentQuizIndex < questions.length - 1) {
    currentQuizIndex += 1;
    renderQuizQuestion();
    return;
  }

  $("quizModal").classList.add("hidden");
  if (currentLevelKey === "conscious" && currentPhaseIndex === 0) {
    const quizGains = awardConsciousQuizPoints(consciousBlockIndex, quizCorrectIndexes);
    pendingConsciousEvolution = pendingConsciousEvolution || {taskGains:{},quizGains:{}};
    pendingConsciousEvolution.quizGains = quizGains;
    showConsciousEvolutionModal(pendingConsciousEvolution.taskGains, quizGains);
    return;
  }
  advanceAfterPhase();
}

function advanceAfterPhase() {
  pendingAdvance = false;

  if (currentLevelKey === "conscious" && currentPhaseIndex === 0) {
    $("evolutionModal")?.classList.add("hidden");
    pendingConsciousEvolution = null;
    if (consciousBlockIndex < CONSCIOUS_BLOCKS.length - 1) {
      consciousBlockIndex += 1;
      progress.consciousPhase1Block = consciousBlockIndex;
      saveProgress();
      showConsciousClueScreen();
      return;
    }
    completeConsciousPhase1();
    return;
  }

  const level = LEVELS[currentLevelKey];
  const isLast = currentPhaseIndex === level.phases.length - 1;
  if (!isLast) {
    unlockNextPhase(currentLevelKey,currentPhaseIndex+1);
    saveProgress();
    currentPhaseIndex += 1;
    loadPhase();
    return;
  }
  completeCurrentLevel();
}

function unlockNextPhase(levelKey, nextIndex) {
  if (levelKey === "conscious") progress.consciousUnlockedPhase = Math.max(progress.consciousUnlockedPhase, nextIndex);
  if (levelKey === "eco") progress.ecoUnlockedPhase = Math.max(progress.ecoUnlockedPhase, nextIndex);
  if (levelKey === "human") progress.humanUnlockedPhase = Math.max(progress.humanUnlockedPhase, nextIndex);
  if (levelKey === "future") progress.level4UnlockedPhase = Math.max(progress.level4UnlockedPhase, nextIndex);
}

function completeCurrentLevel() {
  if (currentLevelKey === "conscious") {
    progress.consciousComplete = true;
    progress.ecoUnlocked = true;
    saveProgress();
    showFinal("CONSCIÊNCIA+ concluído!", "Você organizou uma jornada completa: noite anterior, início da manhã, vida escolar e retorno para casa. Uma rotina saudável não precisa ser perfeita: ela precisa ser organizada, consciente e possível. O ECOTECH+ foi liberado.");
    return;
  }

  if (currentLevelKey === "eco") {
    progress.ecoComplete = true;
    progress.humanUnlocked = true;
    saveProgress();
    showFinal("ECOTECH+ concluído!", "♻ MISSÃO ECOTECH+ CONCLUÍDA — Você planejou rotas, identificou materiais e realizou escolhas de descarte. Tecnologia e sustentabilidade também dependem de decisões conscientes. O NÍVEL HUMANO+ foi liberado.");
    return;
  }

  if (currentLevelKey === "human") {
    progress.humanComplete = true;
    progress.level4Unlocked = true;
    saveProgress();
    showFinal("HUMANO+ concluído!", "Você construiu caminhos de acolhimento, respeito, convivência e defesa da dignidade humana. Os Salões do Acolhimento simbolizam preservação de identidade e cultura, não separação. O NÍVEL 4 — CONTINUIDADE+ foi liberado.");
    return;
  }

  // O Nível 4 está em modo de preparação e não possui conclusão nesta versão.
  saveProgress();
  showFinal("CONTINUIDADE+", "Este nível está preparado para receber imagens, objetivos e novos desafios em uma próxima atualização.");
}

function showFinal(title, text) {
  $("finalTitle").textContent = title;
  $("finalText").textContent = text;
  $("finalModal").classList.remove("hidden");
}

function goHome() {
  if (executing) return;
  $("gameScreen").classList.add("hidden");
  $("consciousClueScreen").classList.add("hidden");
  $("homeScreen").classList.remove("hidden");
  refreshHome();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openHelp() {
  $("helpModal").classList.remove("hidden");
}

function closeHelp() {
  $("helpModal").classList.add("hidden");
}

function getProfiles() {
  try {
    const parsed = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch (_) {
    return {};
  }
}

function writeProfiles(profiles) {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profiles));
}

function normalizeProfileName(value) {
  return String(value || "").trim();
}

function validProfileName(name) {
  return name.length >= 2 && name.length <= 24 && !/[\r\n\t]/.test(name);
}

function validPin(pin) {
  return /^\d{4}$/.test(String(pin || ""));
}

async function hashPin(pin) {
  const value = String(pin || "");
  if (window.crypto && window.crypto.subtle && window.TextEncoder) {
    const bytes = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, "0")).join("");
  }
  // Compatibilidade para navegadores muito antigos. Não é autenticação online;
  // o PIN serve apenas para separar perfis locais no mesmo navegador.
  return btoa(`profLeia:${value}`);
}

function setProfileFeedback(message, type = "info") {
  const box = $("profileFeedback");
  if (!box) return;
  box.textContent = message;
  box.className = `profile-feedback ${type}`;
}

function showProfileScreen() {
  stopContractAudio();
  activeProfileName = null;
  activeProfileSex = null;
  pendingLegacyProfile = null;
  progress = createDefaultProgress();
  $("gameScreen").classList.add("hidden");
  $("consciousClueScreen").classList.add("hidden");
  $("homeScreen").classList.add("hidden");
  $("contractScreen").classList.add("hidden");
  $("sexProfileModal").classList.add("hidden");
  $("contractMoreModal").classList.add("hidden");
  $("profileScreen").classList.remove("hidden");
  $("activeProfileBar").classList.add("hidden");
  setProfileFeedback("Crie um perfil ou acesse um perfil existente.", "info");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function enterProfile(profile) {
  activeProfileName = profile.name;
  activeProfileSex = profile.sex || null;
  const importedProgress = profile.progress || {};
  progress = normalizeProgress(importedProgress);

  // Migração para a arquitetura 3.0 do CONSCIÊNCIA+.
  // Mantém os desbloqueios dos outros níveis, mas reinicia a nova
  // Fase 1 porque sua estrutura de imagens, blocos e pontuação mudou.
  if (Number(importedProgress.consciousJourneyVersion || 0) !== 3) {
    progress.consciousJourneyVersion = 3;
    progress.consciousUnlockedPhase = 0;
    progress.consciousComplete = false;
    progress.consciousPhase1Block = 0;
    progress.consciousPhase1Complete = false;
    progress.consciousPhase1Awards = {};
    progress.pentagonScores = { hygiene:2, food:2, sleep:2, study:2, balance:2 };
    saveProgress();
  }

  $("activeProfileName").textContent = activeProfileName;
  $("activeRobotName").textContent = `Robô ${activeProfileName}`;
  if (activeProfileSex) $("activeRobotAvatar").src = getRobotAsset(currentRobotStage());
  $("activeProfileBar").classList.remove("hidden");
  $("profileScreen").classList.add("hidden");
  $("gameScreen").classList.add("hidden");
  $("consciousClueScreen").classList.add("hidden");
  $("homeScreen").classList.add("hidden");
  $("contractScreen").classList.add("hidden");
  renderPentagon();

  if (!activeProfileSex) {
    pendingLegacyProfile = profile;
    $("sexProfileModal").classList.remove("hidden");
    return;
  }

  routeProfileAfterLogin(profile);
}

function routeProfileAfterLogin(profile) {
  const accepted = !!(profile.contract && profile.contract.accepted && profile.contract.version === CONTRACT_VERSION);
  if (accepted) {
    showHomeForActiveProfile();
  } else {
    showContractScreen(profile, false);
  }
}

function showHomeForActiveProfile() {
  stopContractAudio();
  $("profileScreen").classList.add("hidden");
  $("contractScreen").classList.add("hidden");
  $("gameScreen").classList.add("hidden");
  $("consciousClueScreen").classList.add("hidden");
  $("homeScreen").classList.remove("hidden");
  refreshHome();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function saveLegacyProfileSex(sex) {
  if (!pendingLegacyProfile || !["masculino", "feminino"].includes(sex)) return;
  const profiles = getProfiles();
  const profile = profiles[pendingLegacyProfile.name];
  if (!profile) return;
  profile.sex = sex;
  profile.updatedAt = new Date().toISOString();
  profiles[profile.name] = profile;
  writeProfiles(profiles);
  activeProfileSex = sex;
  $("activeRobotAvatar").src = getRobotAsset(currentRobotStage());
  $("activeRobotName").textContent = `Robô ${profile.name}`;
  pendingLegacyProfile = null;
  $("sexProfileModal").classList.add("hidden");
  routeProfileAfterLogin(profile);
}

function contractDatePtBr(date = new Date()) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
}

function getRobotAsset(stage = "inicial") {
  const sex = activeProfileSex === "feminino" ? "feminino" : "masculino";
  return ROBOT_ASSETS[sex][stage] || ROBOT_ASSETS[sex].inicial;
}

function showContractScreen(profile, reviewOnly = false) {
  if (!profile) return;
  stopContractAudio();
  $("profileScreen").classList.add("hidden");
  $("homeScreen").classList.add("hidden");
  $("gameScreen").classList.add("hidden");
  $("consciousClueScreen").classList.add("hidden");
  $("contractScreen").classList.remove("hidden");

  const accepted = !!(profile.contract && profile.contract.accepted && profile.contract.version === CONTRACT_VERSION);
  const checks = [...document.querySelectorAll(".contract-check")];
  checks.forEach(check => {
    check.checked = accepted;
    check.disabled = accepted;
    check.closest(".commitment-item")?.classList.toggle("is-checked", accepted);
  });

  $("contractPlayerName").textContent = profile.name;
  $("contractPlayerMessageName").textContent = profile.name;
  const acceptedDate = accepted && profile.contract.acceptedAt ? new Date(profile.contract.acceptedAt) : new Date();
  $("contractDate").textContent = contractDatePtBr(acceptedDate);
  $("contractRegistered").classList.toggle("hidden", !accepted);
  $("signContractBtn").classList.toggle("hidden", accepted);
  $("signContractBtn").disabled = !accepted;
  $("startJourneyAfterContractBtn").textContent = reviewOnly ? "VOLTAR À JORNADA" : "INICIAR JORNADA";
  updateContractProgress();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateContractProgress() {
  const checks = [...document.querySelectorAll(".contract-check")];
  let count = 0;
  checks.forEach(check => {
    if (check.checked) count += 1;
    check.closest(".commitment-item")?.classList.toggle("is-checked", check.checked);
  });
  const total = checks.length || 5;
  const pct = Math.round((count / total) * 100);
  $("commitmentProgressText").textContent = `Compromissos assumidos: ${count} de ${total}`;
  $("commitmentProgressPercent").textContent = `${pct}%`;
  $("commitmentProgressFill").style.width = `${pct}%`;
  const registered = !$("contractRegistered").classList.contains("hidden");
  $("signContractBtn").disabled = count !== total || registered;
}

function registerContract() {
  if (!activeProfileName) return;
  const checks = [...document.querySelectorAll(".contract-check")];
  if (!checks.length || !checks.every(check => check.checked)) return;
  const profiles = getProfiles();
  const profile = profiles[activeProfileName];
  if (!profile) return;
  const now = new Date();
  profile.contract = {
    version: CONTRACT_VERSION,
    accepted: true,
    acceptedAt: now.toISOString(),
    commitments: [true, true, true, true, true]
  };
  profile.updatedAt = now.toISOString();
  profiles[activeProfileName] = profile;
  writeProfiles(profiles);
  checks.forEach(check => { check.disabled = true; });
  $("contractPlayerName").textContent = profile.name;
  $("contractPlayerMessageName").textContent = profile.name;
  $("contractDate").textContent = contractDatePtBr(now);
  $("signContractBtn").classList.add("hidden");
  $("contractRegistered").classList.remove("hidden");
  updateContractProgress();
  $("contractRegistered").scrollIntoView({ behavior: "smooth", block: "center" });
}

function openHomeAfterContract() {
  showHomeForActiveProfile();
}

function contractSpeechText() {
  return [
    "Contrato da Jornada. Compromisso Pedagógico.",
    "Todo jogo tem regras. A vida em sociedade também.",
    "Este jogo tem finalidade pedagógica e utiliza conhecimentos fundamentados cientificamente.",
    "Meu compromisso nesta jornada:",
    "Jogar com atenção e responder às questões com seriedade.",
    "Pensar antes de escolher e aprender também com os erros.",
    "Respeitar as pessoas, as diferenças, as regras de convivência e o meio ambiente.",
    "Cuidar do meu progresso sem desanimar quando eu precisar tentar novamente.",
    "Usar o que eu aprender para tomar decisões mais conscientes dentro e fora do jogo."
  ].join(" ");
}

function toggleContractAudio() {
  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
    alert("A leitura em voz alta não está disponível neste navegador.");
    return;
  }
  if (contractListening) {
    stopContractAudio();
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(contractSpeechText());
  utterance.lang = "pt-BR";
  utterance.rate = 0.92;
  utterance.pitch = 1;
  utterance.onend = () => { contractListening = false; $("listenContractBtn").textContent = "🔊 OUVIR CONTRATO"; };
  utterance.onerror = () => { contractListening = false; $("listenContractBtn").textContent = "🔊 OUVIR CONTRATO"; };
  contractListening = true;
  $("listenContractBtn").textContent = "⏹ PARAR ÁUDIO";
  window.speechSynthesis.speak(utterance);
}

function stopContractAudio() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  contractListening = false;
  if ($("listenContractBtn")) $("listenContractBtn").textContent = "🔊 OUVIR CONTRATO";
}

function downloadContractDocx() {
  const link = document.createElement("a");
  link.href = CONTRACT_DOCX_FILE;
  link.download = "CONTRATO_DA_JORNADA_ROBO.docx";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

async function createProfileFromForm() {
  const name = normalizeProfileName($("createProfileName").value);
  const sex = document.querySelector('input[name="createProfileSex"]:checked')?.value || "";
  const pin = $("createProfilePin").value;
  const confirmPin = $("createProfilePinConfirm").value;

  if (!validProfileName(name)) {
    setProfileFeedback("Use um nome de perfil com 2 a 24 caracteres.", "error");
    return;
  }
  if (!["masculino", "feminino"].includes(sex)) {
    setProfileFeedback("Escolha masculino ou feminino para definir a versão visual do robô.", "error");
    return;
  }
  if (!validPin(pin)) {
    setProfileFeedback("O PIN deve ter exatamente 4 dígitos.", "error");
    return;
  }
  if (pin !== confirmPin) {
    setProfileFeedback("Os dois PINs precisam ser iguais.", "error");
    return;
  }

  const profiles = getProfiles();
  // Comparação intencionalmente sensível a maiúsculas e minúsculas.
  if (Object.prototype.hasOwnProperty.call(profiles, name)) {
    setProfileFeedback("Esse nome de perfil já existe. Escolha outro ou use ACESSAR PERFIL EXISTENTE.", "error");
    return;
  }

  const now = new Date().toISOString();
  const profile = {
    format: "prof-leia-profile",
    version: PROFILE_EXPORT_VERSION,
    name,
    sex,
    pinHash: await hashPin(pin),
    progress: createDefaultProgress(),
    contract: { version: CONTRACT_VERSION, accepted: false, acceptedAt: null, commitments: [false, false, false, false, false] },
    createdAt: now,
    updatedAt: now
  };
  profiles[name] = profile;
  writeProfiles(profiles);
  $("createProfilePin").value = "";
  $("createProfilePinConfirm").value = "";
  document.querySelectorAll('input[name="createProfileSex"]').forEach(input => { input.checked = false; });
  enterProfile(profile);
}

async function loginProfileFromForm() {
  const name = normalizeProfileName($("loginProfileName").value);
  const pin = $("loginProfilePin").value;
  const profiles = getProfiles();
  const profile = profiles[name];

  if (!profile) {
    setProfileFeedback("Perfil não encontrado. Confira maiúsculas e minúsculas no nome.", "error");
    return;
  }
  if (!validPin(pin) || (await hashPin(pin)) !== profile.pinHash) {
    setProfileFeedback("PIN incorreto.", "error");
    return;
  }

  $("loginProfilePin").value = "";
  enterProfile(profile);
}

function safeFilePart(name) {
  return String(name)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "jogador";
}

function downloadProfile(profile) {
  const exportData = {
    format: "prof-leia-profile",
    version: PROFILE_EXPORT_VERSION,
    name: profile.name,
    sex: profile.sex || null,
    pinHash: profile.pinHash,
    progress: profile.progress || createDefaultProgress(),
    contract: profile.contract || null,
    createdAt: profile.createdAt || null,
    updatedAt: profile.updatedAt || null,
    exportedAt: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `perfil-prof-leia-${safeFilePart(profile.name)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function exportProfileFromLanding() {
  const name = normalizeProfileName($("exportProfileName").value);
  const pin = $("exportProfilePin").value;
  const profiles = getProfiles();
  const profile = profiles[name];
  if (!profile) {
    setProfileFeedback("Perfil não encontrado para exportação.", "error");
    return;
  }
  if (!validPin(pin) || (await hashPin(pin)) !== profile.pinHash) {
    setProfileFeedback("PIN incorreto. O perfil não foi exportado.", "error");
    return;
  }
  downloadProfile(profile);
  $("exportProfilePin").value = "";
  setProfileFeedback(`Perfil ${name} exportado. O arquivo foi baixado neste dispositivo.`, "success");
}

function exportActiveProfile() {
  if (!activeProfileName) return;
  saveProgress();
  const profile = getProfiles()[activeProfileName];
  if (profile) downloadProfile(profile);
}

async function importProfileFromFile() {
  const input = $("importProfileFile");
  const file = input.files && input.files[0];
  if (!file) {
    setProfileFeedback("Escolha um arquivo .json de perfil.", "error");
    return;
  }

  try {
    const imported = JSON.parse(await file.text());
    const name = normalizeProfileName(imported.name);
    if (imported.format !== "prof-leia-profile" || !validProfileName(name) || typeof imported.pinHash !== "string" || !imported.progress || typeof imported.progress !== "object") {
      throw new Error("invalid-profile");
    }

    const profiles = getProfiles();
    if (Object.prototype.hasOwnProperty.call(profiles, name)) {
      const overwrite = window.confirm(`Já existe um perfil chamado “${name}” neste navegador. Deseja substituir o progresso local pelo arquivo importado?`);
      if (!overwrite) {
        setProfileFeedback("Importação cancelada.", "info");
        return;
      }
    }

    profiles[name] = {
      format: "prof-leia-profile",
      version: PROFILE_EXPORT_VERSION,
      name,
      sex: ["masculino", "feminino"].includes(imported.sex) ? imported.sex : null,
      pinHash: imported.pinHash,
      progress: { ...createDefaultProgress(), ...imported.progress },
      contract: imported.contract && typeof imported.contract === "object" ? imported.contract : null,
      createdAt: imported.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    writeProfiles(profiles);
    $("loginProfileName").value = name;
    input.value = "";
    setProfileFeedback(`Perfil ${name} importado. Agora acesse usando o PIN original desse perfil.`, "success");
  } catch (_) {
    setProfileFeedback("Arquivo de perfil inválido ou danificado.", "error");
  }
}

function switchProfile() {
  if (executing) return;
  saveProgress();
  activeProfileName = null;
  showProfileScreen();
}

function saveProgress() {
  if (!activeProfileName) return;
  try {
    const profiles = getProfiles();
    const profile = profiles[activeProfileName];
    if (!profile) return;
    profile.progress = { ...progress };
    profile.updatedAt = new Date().toISOString();
    profiles[activeProfileName] = profile;
    writeProfiles(profiles);
  } catch (_) {}
  refreshHome();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}