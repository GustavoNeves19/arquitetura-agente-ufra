/**
 * generateAgent.js
 * Motor de geração de blueprints de agentes por categorias e templates.
 * Funciona 100% offline — sem necessidade de API key.
 */

// ─── Mapeamento de categorias por palavras-chave ────────────────────────────

const CATEGORIES = {
  estudos: {
    score: 0,
    keywords: [
      'estud', 'disciplin', 'matéria', 'aula', 'prova', 'vestibular',
      'aprender', 'aprendiz', 'revisão', 'revisar', 'nota', 'grau',
      'faculdade', 'universidade', 'escola', 'curso', 'livro', 'lição',
      'trabalho acadêmico', 'monografia', 'tcc',
    ],
  },
  calouro: {
    score: 0,
    keywords: [
      'calouro', 'ingressante', 'adaptação', 'adaptar', 'novo aluno',
      'primeiro semestre', 'ingresso', 'bixo', 'veterano', 'recém chegou',
      'começar faculdade', 'vida universitária',
    ],
  },
  produtividade: {
    score: 0,
    keywords: [
      'tarefa', 'produtiv', 'time', 'equipe', 'projeto', 'organiz',
      'gerenci', 'prazo', 'deadline', 'scrum', 'kanban', 'sprint',
      'reunião', 'agenda', 'prioridade', 'foco', 'gestão',
    ],
  },
  suporte: {
    score: 0,
    keywords: [
      'dúvid', 'faq', 'suporte', 'atendimento', 'responder', 'cliente',
      'help desk', 'perguntas frequentes', 'chatbot', 'assistente virtual',
      'ticket', 'chamado', 'problema técnico',
    ],
  },
  saude: {
    score: 0,
    keywords: [
      'saúde', 'bem-estar', 'exercício', 'nutrição', 'mental',
      'terapia', 'medicament', 'consulta', 'fitness', 'treino',
      'alimentação', 'dieta', 'sono', 'ansiedade', 'estresse',
    ],
  },
  financeiro: {
    score: 0,
    keywords: [
      'financ', 'gasto', 'orçamento', 'investimento', 'poupança',
      'dinheiro', 'receita', 'despesa', 'conta', 'banco', 'cartão',
      'economia', 'custo', 'preço', 'salário',
    ],
  },
  criatividade: {
    score: 0,
    keywords: [
      'criativ', 'design', 'arte', 'escrita', 'redação', 'texto',
      'blog', 'conteúdo', 'social media', 'post', 'campanha',
      'marketing', 'ideia', 'inovação', 'brainstorm',
    ],
  },
  recrutamento: {
    score: 0,
    keywords: [
      'recrut', 'vagas', 'candidato', 'entrevista', 'currículo',
      'rh', 'contratação', 'seleção', 'talento', 'onboarding',
    ],
  },
};

// ─── Templates por categoria ────────────────────────────────────────────────

const TEMPLATES = {
  estudos: {
    nome: 'Tutor de Estudos',
    descricao:
      'Agente especializado em apoiar estudantes na organização, revisão e acompanhamento do seu processo de aprendizagem.',
    objetivo:
      'Melhorar o desempenho acadêmico ao ajudar o estudante a estruturar cronogramas, priorizar conteúdos e monitorar o progresso.',
    publicoAlvo: 'Estudantes universitários e do ensino médio que buscam organização e suporte nos estudos.',
    entradas: [
      'Disciplinas matriculadas',
      'Tempo disponível por dia',
      'Datas de provas e prazos',
      'Nível de dificuldade percebida em cada matéria',
      'Material disponível (livros, slides, vídeos)',
    ],
    fluxo: [
      '1. Recebe lista de disciplinas e prazos do estudante',
      '2. Calcula prioridade de cada matéria (peso × tempo restante)',
      '3. Gera cronograma semanal balanceado',
      '4. Sugere técnicas de revisão (Pomodoro, spaced repetition)',
      '5. Envia lembretes e checkpoints de progresso',
      '6. Adapta o plano conforme feedback do estudante',
    ],
    saidas: [
      'Cronograma de estudos personalizado',
      'Lista de prioridades por matéria',
      'Checklist diário de tarefas',
      'Recomendações de técnicas de estudo',
      'Relatório semanal de progresso',
    ],
    ferramentas: [
      'Calendário inteligente',
      'Sistema de lembretes e notificações',
      'Banco de notas e resumos',
      'Rastreador de progresso',
      'Gerador de flashcards',
    ],
    apis: [
      'Google Calendar API — gestão de eventos e lembretes',
      'Notion API — armazenamento de notas e resumos',
      'OpenAI API — geração de resumos e questões',
      'YouTube Data API — busca de vídeos educacionais',
    ],
    tecnologias: [
      'Python (backend, lógica de priorização)',
      'React ou Next.js (interface web)',
      'FastAPI (API REST)',
      'SQLite ou PostgreSQL (dados do estudante)',
      'TailwindCSS (estilização)',
    ],
    limitacoes: [
      'Depende de dados corretos e atualizados inseridos pelo usuário',
      'Não substitui a disciplina pessoal do estudante',
      'A qualidade do cronograma varia com a qualidade das informações fornecidas',
      'Sem integração com LMS da universidade, os dados são manuais',
    ],
    complexidade: 'intermediário',
  },

  calouro: {
    nome: 'Guia do Calouro',
    descricao:
      'Agente de acompanhamento para estudantes recém-chegados à universidade, auxiliando na adaptação à vida acadêmica e social.',
    objetivo:
      'Reduzir o choque de adaptação dos calouros, fornecendo orientações práticas sobre rotinas, recursos da universidade e integração social.',
    publicoAlvo: 'Estudantes ingressantes no primeiro semestre da graduação.',
    entradas: [
      'Nome, curso e campus do estudante',
      'Dificuldades relatadas (transporte, moradia, finanças, relacionamento)',
      'Perguntas sobre a universidade',
      'Grade horária e matrícula',
    ],
    fluxo: [
      '1. Recebe perfil básico do calouro no onboarding',
      '2. Identifica as principais dificuldades esperadas para o curso',
      '3. Apresenta mapa dos recursos disponíveis (RU, biblioteca, apoio psicológico)',
      '4. Responde dúvidas frequentes sobre regras e rotinas',
      '5. Conecta o calouro a grupos e eventos de integração',
      '6. Acompanha as primeiras semanas com check-ins periódicos',
    ],
    saidas: [
      'Guia personalizado de primeiras semanas',
      'Mapa de recursos da universidade',
      'Respostas a dúvidas frequentes (FAQ dinâmico)',
      'Agenda de eventos de integração',
      'Contatos úteis por categoria',
    ],
    ferramentas: [
      'Base de conhecimento da universidade',
      'Sistema de FAQ dinâmico',
      'Mapa interativo do campus',
      'Agenda de eventos',
      'Canal de mensagens (chat ou WhatsApp)',
    ],
    apis: [
      'WhatsApp Business API — comunicação direta',
      'Google Maps API — navegação no campus',
      'OpenAI API — respostas a perguntas abertas',
      'API institucional da universidade (se disponível)',
    ],
    tecnologias: [
      'Python (processamento de linguagem natural)',
      'Node.js (servidor de mensagens)',
      'React (painel web)',
      'MongoDB (base de conhecimento flexível)',
      'Twilio ou Z-API (integração WhatsApp)',
    ],
    limitacoes: [
      'Informações institucionais precisam ser mantidas atualizadas manualmente',
      'Não substitui o acolhimento humano em situações delicadas',
      'A eficácia depende da adesão dos calouros em usar o sistema',
    ],
    complexidade: 'básico',
  },

  produtividade: {
    nome: 'Coordenador de Tarefas',
    descricao:
      'Agente para organização e acompanhamento de tarefas de times ou indivíduos, integrando priorização automática e alertas contextuais.',
    objetivo:
      'Aumentar a produtividade de equipes ou indivíduos ao gerenciar tarefas, prazos e dependências de forma inteligente.',
    publicoAlvo: 'Times de desenvolvimento, estudantes em projetos colaborativos, profissionais com múltiplas demandas simultâneas.',
    entradas: [
      'Lista de tarefas e subtarefas',
      'Prioridades e prazos',
      'Membros da equipe e responsabilidades',
      'Status de cada tarefa',
      'Dependências entre tarefas',
    ],
    fluxo: [
      '1. Recebe backlog de tarefas com metadados',
      '2. Classifica automaticamente por urgência e importância (Matriz de Eisenhower)',
      '3. Aloca tarefas por membro disponível e capacidade',
      '4. Monitora progresso em tempo real',
      '5. Envia alertas de risco de atraso',
      '6. Gera relatório de sprint ou semana',
    ],
    saidas: [
      'Board kanban atualizado',
      'Relatório de produtividade semanal',
      'Alertas de bloqueios e riscos',
      'Análise de gargalos do time',
      'Previsão de entrega baseada em histórico',
    ],
    ferramentas: [
      'Board kanban digital',
      'Sistema de notificações e lembretes',
      'Dashboard de métricas',
      'Rastreador de tempo',
      'Log de alterações',
    ],
    apis: [
      'Trello API ou Jira API — gestão de tasks',
      'Slack API — notificações no canal do time',
      'Google Workspace API — integração com agenda',
      'OpenAI API — análise e sugestões inteligentes',
    ],
    tecnologias: [
      'Node.js ou Python (backend)',
      'React (interface web)',
      'PostgreSQL (dados relacionais de tarefas)',
      'WebSockets (atualizações em tempo real)',
      'Docker (containerização)',
    ],
    limitacoes: [
      'Requer disciplina do time em atualizar os status corretamente',
      'Estimativas de prazo dependem de dados históricos para melhorar',
      'Sem integração nativa com todas as ferramentas do mercado',
    ],
    complexidade: 'intermediário',
  },

  suporte: {
    nome: 'Assistente de Atendimento',
    descricao:
      'Agente para resposta inteligente a dúvidas frequentes, triagem de chamados e suporte de primeiro nível a usuários.',
    objetivo:
      'Reduzir volume de chamados repetitivos para a equipe humana, resolvendo automaticamente as dúvidas mais comuns com qualidade.',
    publicoAlvo: 'Usuários de serviços, clientes, alunos — qualquer público com dúvidas recorrentes e previsíveis.',
    entradas: [
      'Pergunta ou descrição do problema pelo usuário',
      'Contexto (usuário, plano, histórico de atendimentos)',
      'Canal de chegada (chat, e-mail, WhatsApp)',
      'Base de conhecimento atualizada',
    ],
    fluxo: [
      '1. Recebe mensagem do usuário e classifica intenção',
      '2. Busca resposta na base de conhecimento (RAG)',
      '3. Se encontrado com alta confiança → responde automaticamente',
      '4. Se incerto → complementa com resposta parcial + encaminha ao humano',
      '5. Coleta feedback sobre a resposta',
      '6. Aprende com respostas corrigidas pelo time',
    ],
    saidas: [
      'Resposta automática à dúvida',
      'Ticket criado e categorizado',
      'Resumo do problema para o atendente humano',
      'Sugestões de artigos da FAQ',
      'Relatório de satisfação do atendimento',
    ],
    ferramentas: [
      'Base de conhecimento (FAQ e documentação)',
      'Sistema de tickets',
      'Motor de busca semântica (embeddings)',
      'Canal de escalação para humanos',
      'Painel de métricas de atendimento',
    ],
    apis: [
      'OpenAI API — compreensão e geração de respostas',
      'Zendesk API ou Freshdesk API — sistema de tickets',
      'WhatsApp Business API — canal de atendimento',
      'Slack API — notificação da equipe de suporte',
    ],
    tecnologias: [
      'Python (NLP e lógica de classificação)',
      'FastAPI (endpoints do chatbot)',
      'React (painel de configuração)',
      'Pinecone ou Weaviate (banco vetorial para RAG)',
      'Redis (cache de respostas frequentes)',
    ],
    limitacoes: [
      'Perguntas fora da base de conhecimento podem gerar respostas incorretas',
      'Requer curadoria constante da base de conhecimento',
      'Sensível a contexto emocional — escalar humano quando necessário',
    ],
    complexidade: 'intermediário',
  },

  saude: {
    nome: 'Monitor de Bem-Estar',
    descricao:
      'Agente de acompanhamento de saúde e bem-estar que registra hábitos, analisa padrões e sugere melhorias personalizadas.',
    objetivo:
      'Apoiar o usuário na construção de hábitos saudáveis por meio de acompanhamento contínuo, lembretes e análise de dados pessoais.',
    publicoAlvo: 'Adultos interessados em melhorar saúde física e mental, com ou sem condições específicas.',
    entradas: [
      'Dados diários (sono, alimentação, exercício, humor)',
      'Metas pessoais de saúde',
      'Histórico de condições ou restrições',
      'Registro de sintomas ou medicamentos',
    ],
    fluxo: [
      '1. Coleta dados de saúde via check-in diário',
      '2. Analisa tendências e padrões ao longo do tempo',
      '3. Compara com metas estabelecidas',
      '4. Gera alertas personalizados de atenção',
      '5. Sugere mudanças de hábitos baseadas em padrões',
      '6. Encaminha para profissional se indicadores críticos',
    ],
    saidas: [
      'Relatório semanal de saúde',
      'Alertas de hábitos preocupantes',
      'Sugestões de melhoria personalizadas',
      'Gráficos de evolução',
      'Dicas baseadas em evidências',
    ],
    ferramentas: [
      'Diário de saúde digital',
      'Sistema de lembretes',
      'Gráficos e dashboards',
      'Base de recomendações validadas',
      'Canal de comunicação com profissional de saúde',
    ],
    apis: [
      'Google Fit API ou Apple Health API — dados de atividade física',
      'OpenAI API — análise e recomendações contextuais',
      'Nutritionix API — dados nutricionais de alimentos',
      'Wearable APIs (Fitbit, Garmin) — dados fisiológicos',
    ],
    tecnologias: [
      'Python (análise de dados e ML básico)',
      'React Native ou Flutter (app móvel)',
      'PostgreSQL (histórico de saúde)',
      'Chart.js (visualizações)',
      'Node.js (backend)',
    ],
    limitacoes: [
      'Não substitui avaliação e acompanhamento médico profissional',
      'Precisão limitada sem integração com dispositivos de monitoramento',
      'Dados sensíveis exigem atenção especial à privacidade (LGPD)',
      'Eficaz apenas se o usuário mantiver registro consistente',
    ],
    complexidade: 'avançado',
  },

  financeiro: {
    nome: 'Consultor Financeiro Pessoal',
    descricao:
      'Agente para controle de finanças pessoais que categoriza gastos, detecta padrões e sugere estratégias de economia e investimento.',
    objetivo:
      'Dar clareza sobre a situação financeira do usuário e orientá-lo a tomar melhores decisões de gasto, poupança e investimento.',
    publicoAlvo: 'Adultos jovens, estudantes universitários e profissionais que querem controlar melhor suas finanças.',
    entradas: [
      'Transações financeiras (manual ou via extrato bancário)',
      'Renda mensal e fontes',
      'Metas financeiras (reserva, viagem, investimento)',
      'Categorias de gastos prioritários',
    ],
    fluxo: [
      '1. Importa ou recebe transações financeiras',
      '2. Categoriza automaticamente cada gasto',
      '3. Calcula saldo, fluxo de caixa e variações mensais',
      '4. Identifica padrões de gasto excessivo',
      '5. Projeta economia possível e prazo para metas',
      '6. Gera relatório mensal e alertas de limite',
    ],
    saidas: [
      'Relatório mensal de finanças',
      'Gráfico de gastos por categoria',
      'Alerta de estouro de orçamento',
      'Simulação de metas financeiras',
      'Sugestões de corte de gastos',
    ],
    ferramentas: [
      'Leitor de extratos bancários (OFX/CSV)',
      'Categorizador automático de transações',
      'Dashboard financeiro',
      'Simulador de investimentos',
      'Alertas de limite de gastos',
    ],
    apis: [
      'Open Banking APIs — acesso seguro a dados bancários',
      'Banco Central API — taxas e indicadores econômicos',
      'OpenAI API — análise e recomendações',
      'Alpha Vantage API — cotações de investimentos',
    ],
    tecnologias: [
      'Python (análise de dados, Pandas)',
      'React (dashboard interativo)',
      'PostgreSQL (histórico financeiro)',
      'FastAPI (backend)',
      'Recharts (gráficos)',
    ],
    limitacoes: [
      'Open Banking limitado no Brasil ainda',
      'Categorizador automático pode errar em gastos atípicos',
      'Não é consultoria financeira regulamentada (CVM)',
      'Dados sensíveis exigem segurança e criptografia robustas',
    ],
    complexidade: 'intermediário',
  },

  criatividade: {
    nome: 'Assistente de Criação de Conteúdo',
    descricao:
      'Agente para apoiar criadores de conteúdo na geração de ideias, estruturação de textos e adaptação de mensagens para diferentes canais.',
    objetivo:
      'Acelerar o processo criativo e manter consistência de voz e estilo ao produzir conteúdo para blogs, redes sociais e campanhas.',
    publicoAlvo: 'Criadores de conteúdo, profissionais de marketing, redatores e equipes de comunicação.',
    entradas: [
      'Tema ou briefing do conteúdo',
      'Canal de destino (Instagram, blog, LinkedIn, email)',
      'Tom de voz e persona da marca',
      'Palavras-chave ou referências de SEO',
      'Tamanho e formato desejados',
    ],
    fluxo: [
      '1. Recebe briefing e contexto do conteúdo',
      '2. Gera múltiplas ideias e ângulos de abordagem',
      '3. Produz rascunho inicial no formato solicitado',
      '4. Adapta para diferentes canais com variações',
      '5. Sugere hashtags, CTAs e elementos visuais',
      '6. Revisão e ajuste baseado em feedback',
    ],
    saidas: [
      'Rascunho de texto no formato desejado',
      'Variações para diferentes redes sociais',
      'Sugestões de títulos e CTAs',
      'Lista de hashtags relevantes',
      'Calendário editorial sugerido',
    ],
    ferramentas: [
      'Editor de texto com histórico de versões',
      'Biblioteca de templates por formato',
      'Analisador de tom e estilo',
      'Gerador de hashtags',
      'Calendário editorial',
    ],
    apis: [
      'OpenAI API — geração e edição de texto',
      'Unsplash API — imagens para ilustrar conteúdo',
      'Instagram Graph API — publicação direta',
      'Google Trends API — identificar temas em alta',
    ],
    tecnologias: [
      'Python (backend e integração com LLMs)',
      'React (editor de conteúdo)',
      'Node.js (gestão de publicações agendadas)',
      'Redis (cache de templates)',
      'TailwindCSS (interface)',
    ],
    limitacoes: [
      'Conteúdo gerado por IA precisa de revisão humana antes de publicar',
      'Não captura nuances de contexto cultural sem orientação adequada',
      'Qualidade depende muito do briefing fornecido',
      'Risco de conteúdo genérico sem personalização de prompts',
    ],
    complexidade: 'básico',
  },

  recrutamento: {
    nome: 'Triador de Talentos',
    descricao:
      'Agente de apoio ao processo seletivo que analisa currículos, classifica candidatos e gera roteiros de entrevista personalizados.',
    objetivo:
      'Agilizar e padronizar o processo de triagem de candidatos, garantindo critérios objetivos e reduzindo vieses inconscientes.',
    publicoAlvo: 'Equipes de RH, startups em crescimento, departamentos com processos seletivos frequentes.',
    entradas: [
      'Descrição da vaga e requisitos',
      'Currículos dos candidatos (PDF ou texto)',
      'Critérios de seleção obrigatórios e desejáveis',
      'Histórico de contratações bem-sucedidas',
    ],
    fluxo: [
      '1. Recebe descrição da vaga com critérios',
      '2. Processa e extrai informações dos currículos',
      '3. Pontua candidatos por aderência aos critérios',
      '4. Classifica e ranqueia o pool de candidatos',
      '5. Gera roteiro de entrevista personalizado por candidato',
      '6. Registra feedback das entrevistas para aprendizado',
    ],
    saidas: [
      'Ranking de candidatos com justificativa',
      'Perfil resumido de cada candidato',
      'Roteiro de entrevista personalizado',
      'Relatório de fit cultural',
      'Dashboard do funil de seleção',
    ],
    ferramentas: [
      'Parser de currículos (PDF → estruturado)',
      'Motor de scoring de candidatos',
      'Gerador de roteiros de entrevista',
      'CRM de candidatos',
      'Dashboard de funil seletivo',
    ],
    apis: [
      'OpenAI API — análise e scoring semântico',
      'LinkedIn API — dados complementares de candidatos',
      'Google Drive API — gestão de currículos',
      'DocuSign API — contratos e ofertas digitais',
    ],
    tecnologias: [
      'Python (NLP, parsing de PDF)',
      'FastAPI (backend)',
      'React (painel de RH)',
      'PostgreSQL (banco de candidatos)',
      'LangChain (pipeline de análise com LLM)',
    ],
    limitacoes: [
      'Pode perpetuar vieses se os critérios não forem bem definidos',
      'Análise de currículo não captura soft skills e potencial humano',
      'Requer validação humana antes de qualquer rejeição automática',
      'LGPD exige consentimento explícito dos candidatos',
    ],
    complexidade: 'avançado',
  },

  default: {
    nome: 'Agente Inteligente Customizado',
    descricao:
      'Agente de propósito específico projetado para automatizar e apoiar o processo descrito pelo usuário.',
    objetivo:
      'Resolver o problema identificado de forma automatizada, eficiente e escalável, com intervenção humana mínima.',
    publicoAlvo: 'Usuários diretos do processo sendo automatizado.',
    entradas: [
      'Dados de entrada do processo (definir conforme contexto)',
      'Parâmetros de configuração',
      'Feedback e correções do usuário',
    ],
    fluxo: [
      '1. Recebe solicitação ou dado de entrada',
      '2. Processa e analisa com base em regras ou LLM',
      '3. Executa ação ou gera resposta',
      '4. Registra resultado e coleta feedback',
      '5. Melhora com base em iterações anteriores',
    ],
    saidas: [
      'Resultado processado da solicitação',
      'Relatório de execução',
      'Log de atividades',
    ],
    ferramentas: [
      'Motor de processamento (regras ou LLM)',
      'Sistema de logs',
      'Interface de configuração',
    ],
    apis: [
      'OpenAI API — inteligência principal',
      'APIs específicas do domínio do problema',
    ],
    tecnologias: [
      'Python (backend)',
      'React (interface)',
      'FastAPI (API REST)',
      'PostgreSQL (persistência)',
    ],
    limitacoes: [
      'Qualidade depende da clareza das instruções',
      'Precisa de dados de treinamento ou base de conhecimento',
      'Requer manutenção e atualização contínua',
    ],
    complexidade: 'intermediário',
  },
};

// ─── Classificação LLM vs Agente ────────────────────────────────────────────

const LLM_VS_AGENT = {
  estudos:    { tipo: 'Agente', nivel: 85, razao: 'Toma ações (cria agenda, envia lembretes, adapta plano), usa ferramentas externas (calendário, notas) e opera em loop de feedback com o usuário.' },
  calouro:    { tipo: 'Agente', nivel: 70, razao: 'Integra múltiplas fontes de informação, executa ações de resposta e acompanha o usuário ao longo do tempo. Tem memória de contexto.' },
  produtividade: { tipo: 'Agente', nivel: 90, razao: 'Usa ferramentas (Trello, Slack), age de forma autônoma para reorganizar tarefas, gera alertas e se comunica com membros do time.' },
  suporte:    { tipo: 'LLM + Agente', nivel: 60, razao: 'Parte do trabalho é apenas geração de texto (LLM puro), mas escalar chamados, buscar na base e criar tickets são ações de agente.' },
  saude:      { tipo: 'Agente', nivel: 80, razao: 'Monitora dados ao longo do tempo, integra wearables, gera alertas e adapta recomendações — comportamento tipicamente agêntico.' },
  financeiro: { tipo: 'Agente', nivel: 75, razao: 'Acessa dados bancários, categoriza transações, calcula projeções e envia alertas. Age no ambiente financeiro do usuário.' },
  criatividade: { tipo: 'LLM + Agente', nivel: 50, razao: 'Grande parte é geração de texto (LLM), mas publicar conteúdo, agendar posts e gerenciar calendário são ações de agente.' },
  recrutamento: { tipo: 'Agente', nivel: 80, razao: 'Processa documentos, pontua candidatos, executa etapas do processo seletivo e interage com múltiplos sistemas (ATS, email).' },
  default:    { tipo: 'LLM + Agente', nivel: 65, razao: 'Combina capacidade de compreensão textual do LLM com execução de ações e integração com ferramentas externas.' },
};

// ─── Próximos passos por categoria ──────────────────────────────────────────

const NEXT_STEPS = {
  estudos: [
    { passo: 'Criar interface simples', detalhe: 'Formulário de entrada de disciplinas, prazos e disponibilidade de tempo' },
    { passo: 'Implementar lógica de priorização', detalhe: 'Algoritmo que pondera urgência, dificuldade e carga horária' },
    { passo: 'Integrar Google Calendar', detalhe: 'Exportar cronograma gerado para o calendário do estudante' },
    { passo: 'Adicionar LLM para resumos', detalhe: 'Gerar resumos e questões de revisão a partir de anotações do estudante' },
    { passo: 'Adicionar memória e histórico', detalhe: 'Salvar progresso e adaptar sugestões com base no desempenho passado' },
  ],
  calouro: [
    { passo: 'Montar base de conhecimento', detalhe: 'Compilar FAQs, mapas e informações da universidade em formato estruturado' },
    { passo: 'Criar chatbot básico', detalhe: 'Interface de perguntas e respostas baseada na base de conhecimento' },
    { passo: 'Integrar canal WhatsApp', detalhe: 'Usar Twilio ou Z-API para comunicação via WhatsApp' },
    { passo: 'Implementar busca semântica', detalhe: 'Melhorar buscas com embeddings para entender perguntas abertas' },
    { passo: 'Painel de administração', detalhe: 'Interface para a universidade atualizar a base de conhecimento' },
  ],
  produtividade: [
    { passo: 'Definir estrutura de dados de tarefas', detalhe: 'Modelar schema com título, responsável, prazo, status, prioridade' },
    { passo: 'Criar board kanban simples', detalhe: 'Interface drag-and-drop para visualizar tarefas por status' },
    { passo: 'Integrar notificações', detalhe: 'Alertas por email ou Slack quando prazos se aproximam' },
    { passo: 'Adicionar automação de priorização', detalhe: 'Lógica para reordenar tarefas com base em urgência e dependências' },
    { passo: 'Dashboard de métricas', detalhe: 'Gráficos de velocity, tarefas concluídas e previsões de entrega' },
  ],
  suporte: [
    { passo: 'Criar base de conhecimento inicial', detalhe: 'Documentar as 50 dúvidas mais frequentes em formato Q&A' },
    { passo: 'Implementar busca por palavras-chave', detalhe: 'Motor de busca simples para encontrar respostas relevantes' },
    { passo: 'Criar interface de chat', detalhe: 'Widget de chat embeddable na página ou app existente' },
    { passo: 'Integrar LLM para perguntas abertas', detalhe: 'Usar API de LLM para responder perguntas fora da FAQ' },
    { passo: 'Sistema de escalação para humano', detalhe: 'Lógica de quando transferir para atendente humano com contexto completo' },
  ],
  saude: [
    { passo: 'Criar formulário de check-in diário', detalhe: 'Formulário simples: sono, exercício, alimentação, humor (1-5)' },
    { passo: 'Implementar armazenamento de dados', detalhe: 'Banco de dados para série temporal de hábitos do usuário' },
    { passo: 'Criar dashboard de visualização', detalhe: 'Gráficos de evolução dos hábitos ao longo do tempo' },
    { passo: 'Adicionar lembretes automáticos', detalhe: 'Notificações push ou email para check-ins não realizados' },
    { passo: 'Integrar com wearables', detalhe: 'Conexão com Google Fit ou Apple Health para dados automáticos' },
  ],
  financeiro: [
    { passo: 'Criar importador de extratos', detalhe: 'Parser de CSV/OFX para leitura de extratos bancários' },
    { passo: 'Implementar categorizador automático', detalhe: 'Regras + ML básico para classificar cada transação' },
    { passo: 'Dashboard de gastos', detalhe: 'Gráficos de pizza por categoria e linha temporal de saldo' },
    { passo: 'Definição de orçamento por categoria', detalhe: 'Interface para o usuário definir limites mensais por categoria' },
    { passo: 'Sistema de alertas', detalhe: 'Notificações quando categorias atingem 80% ou 100% do orçamento' },
  ],
  criatividade: [
    { passo: 'Criar formulário de briefing', detalhe: 'Interface para coletar tema, canal, tom e tamanho do conteúdo' },
    { passo: 'Integrar API de LLM', detalhe: 'Conectar OpenAI para geração do primeiro rascunho' },
    { passo: 'Implementar variações por canal', detalhe: 'Lógica para adaptar o mesmo conteúdo para Instagram, LinkedIn, blog' },
    { passo: 'Editor de texto integrado', detalhe: 'Interface para o usuário editar e refinar o conteúdo gerado' },
    { passo: 'Calendário editorial', detalhe: 'Agendamento de publicações com integração às redes sociais' },
  ],
  recrutamento: [
    { passo: 'Criar parser de currículos', detalhe: 'Extrair nome, experiência, habilidades e formação de PDFs' },
    { passo: 'Definir critérios de scoring', detalhe: 'Planilha ou interface para RH configurar pesos por critério' },
    { passo: 'Implementar motor de ranking', detalhe: 'Algoritmo que pontua candidatos com base nos critérios definidos' },
    { passo: 'Gerar roteiros de entrevista', detalhe: 'LLM que cria perguntas personalizadas por candidato e vaga' },
    { passo: 'Dashboard de funil', detalhe: 'Visualização do processo: triados → entrevistados → aprovados → contratados' },
  ],
  default: [
    { passo: 'Definir o problema com precisão', detalhe: 'Especificar entradas, saídas esperadas e critério de sucesso' },
    { passo: 'Criar protótipo manual', detalhe: 'Simular o processo sem automação para validar o fluxo ideal' },
    { passo: 'Escolher stack tecnológica', detalhe: 'Definir linguagem, banco de dados e infraestrutura mínima' },
    { passo: 'Implementar MVP', detalhe: 'Versão mínima funcional com apenas o fluxo principal' },
    { passo: 'Iterar com usuários reais', detalhe: 'Testar com usuários reais e coletar feedback para melhorar' },
  ],
};

// ─── Função principal de detecção de categoria ──────────────────────────────

function detectCategory(text) {
  const lower = text.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos para matching
    .replace(/[^a-z0-9\s]/g, ' ');

  const scores = {};

  for (const [cat, data] of Object.entries(CATEGORIES)) {
    scores[cat] = 0;
    for (const keyword of data.keywords) {
      const kw = keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (lower.includes(kw)) {
        scores[cat] += 1;
      }
    }
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [bestCat, bestScore] = sorted[0];

  // Retorna 'default' se nenhuma categoria atingir threshold
  return bestScore > 0 ? bestCat : 'default';
}

// ─── Personalizar nome do agente com base no input ──────────────────────────

function personalizeName(baseName, input) {
  // Tenta extrair uma palavra-chave descritiva do input do usuário
  const words = input.trim().split(/\s+/);
  // Se o input for muito curto, usa o nome base
  if (words.length < 4) return baseName;
  return baseName;
}

// ─── Gerador principal ──────────────────────────────────────────────────────

export function generateAgent(userInput) {
  if (!userInput || userInput.trim().length < 5) {
    throw new Error('Descreva melhor o problema para gerar um blueprint completo.');
  }

  const category = detectCategory(userInput);
  const template = TEMPLATES[category];
  const llmAgent = LLM_VS_AGENT[category];
  const steps = NEXT_STEPS[category];

  return {
    // ── Blueprint principal ──
    nome: personalizeName(template.nome, userInput),
    descricao: template.descricao,
    objetivo: template.objetivo,
    publicoAlvo: template.publicoAlvo,
    entradas: template.entradas,
    fluxo: template.fluxo,
    saidas: template.saidas,
    ferramentas: template.ferramentas,
    apis: template.apis,
    tecnologias: template.tecnologias,
    limitacoes: template.limitacoes,
    complexidade: template.complexidade,

    // ── Bloco "Como foi pensado?" ──
    comoPensado: {
      problema: userInput.trim(),
      entrada: template.entradas.slice(0, 3).join(', '),
      processamento: template.fluxo.slice(1, 4).map(s => s.replace(/^\d+\.\s/, '')).join(' → '),
      saida: template.saidas.slice(0, 2).join(', '),
    },

    // ── Bloco LLM vs Agente ──
    llmVsAgente: llmAgent,

    // ── Próximos passos ──
    proximosPassos: steps,

    // ── Metadados ──
    categoria: category,
    geradoEm: new Date().toLocaleString('pt-BR'),
  };
}
