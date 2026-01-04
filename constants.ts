import { Generator } from './types';

export const LOGIN_HASH_U = "YXBwZXNjb2xhQGVtYWlsLmNvbQ=="; // appescola@email.com
export const LOGIN_HASH_P = "ZXNjb2xhYXBwMjAyNg=="; // escolaapp2026

export const MASTER_PROMPT = `Você é um especialista em educação e BNCC (Base Nacional Comum Curricular). Sua função é criar conteúdos educacionais de alta qualidade que estejam perfeitamente alinhados com as competências e habilidades da BNCC.

DIRETRIZES OBRIGATÓRIAS:
1. ALINHAMENTO BNCC: Sempre referencie as competências gerais e específicas da BNCC e códigos de habilidades.
2. QUALIDADE PEDAGÓGICA: Use metodologias ativas e diversificadas.
3. INCLUSÃO E DIVERSIDADE: Considere a diversidade cultural e acessibilidade.
4. CONTEXTUALIZAÇÃO: Conecte com a realidade dos estudantes.
5. ESTRUTURA CLARA: Objetivos de aprendizagem, sequência didática e avaliação.

Sempre que criar qualquer conteúdo educacional, certifique-se de que está contribuindo para o desenvolvimento das 10 competências gerais da BNCC.`;

export const GENERATORS: Generator[] = [
    {
        id: 'plano-curso',
        icon: 'fa-book',
        title: 'Plano de Curso',
        description: 'Planejamento anual ou semestral (3 Unidades)',
        fields: [
            { type: 'select', name: 'etapa', label: 'Etapa de Ensino', required: true, options: ['Educação Infantil', 'Ensino Fundamental I', 'Ensino Fundamental II', 'Ensino Médio'] },
            { type: 'text', name: 'serie', label: 'Série/Ano', required: true, placeholder: 'Ex: 9º ano' },
            { type: 'select', name: 'area', label: 'Área do Conhecimento', required: true, options: ['Linguagens', 'Matemática', 'Ciências da Natureza', 'Ciências Humanas', 'Ensino Religioso'] },
            { type: 'text', name: 'disciplina', label: 'Disciplina', required: true, placeholder: 'Ex: História, Literatura' },
            { type: 'select', name: 'periodo', label: 'Período', required: true, options: ['Anual', 'Semestral', 'Bimestral', 'Trimestral'] },
            { type: 'textarea', name: 'ementa', label: 'Ementa/Foco Principal', placeholder: 'Resumo do que será abordado no curso' },
            { type: 'textarea', name: 'metodologia_geral', label: 'Metodologia Geral', placeholder: 'Ex: Ensino Híbrido, Pedagogia de Projetos' }
        ],
        prompt: (data) => `Crie um Plano de Curso detalhado:\nEtapa: ${data.etapa}\nSérie: ${data.serie}\nÁrea: ${data.area}\nDisciplina: ${data.disciplina}\nPeriodicidade: ${data.periodo}\nEmenta: ${data.ementa}\nMetodologia: ${data.metodologia_geral}\n\nIMPORTANTE: A Organização Curricular deve ser DIVIDIDA EM EXATAMENTE 3 UNIDADES, independentemente da duração.`
    },
    {
        id: 'plano-unidade',
        icon: 'fa-layer-group',
        title: 'Plano de Unidade',
        description: 'Planeje uma unidade temática específica',
        fields: [
            { type: 'select', name: 'etapa', label: 'Etapa', required: true, options: ['Ed. Infantil', 'Fund. I', 'Fund. II', 'Médio'] },
            { type: 'text', name: 'serie', label: 'Série', required: true },
            { type: 'text', name: 'disciplina', label: 'Disciplina', required: true },
            { type: 'text', name: 'titulo_unidade', label: 'Título da Unidade', required: true },
            { type: 'number', name: 'num_aulas', label: 'Nº Aulas', placeholder: '10' },
            { type: 'textarea', name: 'objetivos_unidade', label: 'Objetivos', required: true },
            { type: 'textarea', name: 'estrategias', label: 'Estratégias' }
        ],
        prompt: (data) => `Desenvolva um Plano de Unidade:\nSérie: ${data.serie}\nDisciplina: ${data.disciplina}\nTítulo: ${data.titulo_unidade}\nAulas: ${data.num_aulas}\nObjetivos: ${data.objetivos_unidade}\nEstratégias: ${data.estrategias}\n\nEstrutura: Contextualização, Habilidades BNCC, Cronograma e Avaliação.`
    },
    {
        id: 'plano-aula',
        icon: 'fa-chalkboard-teacher',
        title: 'Plano de Aula',
        description: 'Crie planos de aula detalhados alinhados à BNCC',
        fields: [
            { type: 'select', name: 'etapa', label: 'Etapa de Ensino', required: true, options: ['Educação Infantil', 'Ensino Fundamental I', 'Ensino Fundamental II', 'Ensino Médio'] },
            { type: 'text', name: 'serie', label: 'Série/Ano', required: true, placeholder: 'Ex: 5º ano, 1ª série' },
            { type: 'select', name: 'area', label: 'Área do Conhecimento', required: true, options: ['Linguagens', 'Matemática', 'Ciências da Natureza', 'Ciências Humanas', 'Ensino Religioso'] },
            { type: 'text', name: 'disciplina', label: 'Disciplina', required: true, placeholder: 'Ex: Língua Portuguesa, História' },
            { type: 'text', name: 'tema', label: 'Tema da Aula', required: true, placeholder: 'Ex: Sistema Solar, Frações' },
            { type: 'number', name: 'duracao', label: 'Duração (minutos)', required: true, placeholder: '50' },
            { type: 'textarea', name: 'objetivos', label: 'Objetivos Específicos', placeholder: 'Descreva os objetivos de aprendizagem' },
            { type: 'textarea', name: 'recursos', label: 'Recursos Disponíveis', placeholder: 'Materiais, tecnologias, espaços' },
            { type: 'select', name: 'metodologia', label: 'Metodologia Principal', options: ['Aula Expositiva', 'Aprendizagem Baseada em Problemas', 'Sala de Aula Invertida', 'Gamificação', 'Projeto', 'Estudo de Caso'] }
        ],
        prompt: (data) => `Crie um plano de aula completo:\nEtapa: ${data.etapa}\nSérie: ${data.serie}\nÁrea: ${data.area}\nDisciplina: ${data.disciplina}\nTema: ${data.tema}\nDuração: ${data.duracao} min\nMetodologia: ${data.metodologia}\nObjetivos: ${data.objetivos}\nRecursos: ${data.recursos}\n\nEstrutura: Identificação, Habilidades BNCC, Sequência Didática detalhada, Avaliação e Referências.`
    },
    {
        id: 'atividade',
        icon: 'fa-tasks',
        title: 'Atividade Pedagógica',
        description: 'Desenvolva atividades práticas e envolventes',
        fields: [
            { type: 'select', name: 'etapa', label: 'Etapa de Ensino', required: true, options: ['Educação Infantil', 'Ensino Fundamental I', 'Ensino Fundamental II', 'Ensino Médio'] },
            { type: 'text', name: 'serie', label: 'Série/Ano', required: true },
            { type: 'select', name: 'area', label: 'Área do Conhecimento', required: true, options: ['Linguagens', 'Matemática', 'Ciências da Natureza', 'Ciências Humanas', 'Ensino Religioso'] },
            { type: 'text', name: 'tema', label: 'Tema/Conteúdo', required: true },
            { type: 'select', name: 'tipo', label: 'Tipo de Atividade', options: ['Individual', 'Dupla', 'Grupo', 'Coletiva'] },
            { type: 'number', name: 'tempo', label: 'Tempo Estimado (min)', placeholder: '30' },
            { type: 'textarea', name: 'objetivo', label: 'Objetivo da Atividade', placeholder: 'O que os alunos devem aprender/desenvolver' },
            { type: 'select', name: 'dificuldade', label: 'Nível de Dificuldade', options: ['Básico', 'Intermediário', 'Avançado'] }
        ],
        prompt: (data) => `Desenvolva uma atividade pedagógica:\nEtapa: ${data.etapa}\nSérie: ${data.serie}\nÁrea: ${data.area}\nTema: ${data.tema}\nTipo: ${data.tipo}\nTempo: ${data.tempo} min\nNível: ${data.dificuldade}\nObjetivo: ${data.objetivo}\n\nEstrutura: Identificação, Habilidades BNCC, Instruções passo a passo, Critérios de Avaliação e Adaptações.`
    },
    {
        id: 'avaliacao',
        icon: 'fa-clipboard-check',
        title: 'Avaliação',
        description: 'Crie instrumentos de avaliação alinhados à BNCC',
        fields: [
            { type: 'select', name: 'etapa', label: 'Etapa de Ensino', required: true, options: ['Educação Infantil', 'Ensino Fundamental I', 'Ensino Fundamental II', 'Ensino Médio'] },
            { type: 'text', name: 'serie', label: 'Série/Ano', required: true },
            { type: 'select', name: 'area', label: 'Área do Conhecimento', required: true, options: ['Linguagens', 'Matemática', 'Ciências da Natureza', 'Ciências Humanas', 'Ensino Religioso'] },
            { type: 'text', name: 'conteudo', label: 'Conteúdo Avaliado', required: true },
            { type: 'select', name: 'tipo', label: 'Tipo de Avaliação', options: ['Diagnóstica', 'Formativa', 'Somativa', 'Autoavaliação', 'Avaliação por Pares'] },
            { type: 'select', name: 'formato', label: 'Formato', options: ['Prova Escrita', 'Prova Oral', 'Projeto', 'Portfólio', 'Apresentação', 'Relatório', 'Mapa Mental'] },
            { type: 'number', name: 'questoes', label: 'Número de Questões', placeholder: '10' },
            { type: 'textarea', name: 'criterios', label: 'Critérios Específicos', placeholder: 'Aspectos importantes a serem avaliados' }
        ],
        prompt: (data) => `Desenvolva um instrumento de avaliação:\nEtapa: ${data.etapa}\nSérie: ${data.serie}\nÁrea: ${data.area}\nConteúdo: ${data.conteudo}\nTipo: ${data.tipo}\nFormato: ${data.formato}\nQuestões: ${data.questoes}\nCritérios: ${data.criterios}\n\nEstrutura: Habilidades BNCC, Questões/Atividades contextualizadas, Critérios de Correção e Feedback.`
    },
    {
        id: 'projeto',
        icon: 'fa-project-diagram',
        title: 'Projeto Didático',
        description: 'Desenvolva projetos interdisciplinares',
        fields: [
            { type: 'select', name: 'etapa', label: 'Etapa de Ensino', required: true, options: ['Educação Infantil', 'Ensino Fundamental I', 'Ensino Fundamental II', 'Ensino Médio'] },
            { type: 'text', name: 'serie', label: 'Série/Ano', required: true },
            { type: 'text', name: 'tema', label: 'Tema do Projeto', required: true },
            { type: 'textarea', name: 'areas', label: 'Áreas Envolvidas', placeholder: 'Ex: Português, História, Geografia' },
            { type: 'select', name: 'duracao', label: 'Duração', options: ['1 semana', '2 semanas', '1 mês', '1 bimestre', '1 semestre'] },
            { type: 'textarea', name: 'problema', label: 'Problema/Questão Norteadora', placeholder: 'Qual problema o projeto vai resolver?' },
            { type: 'textarea', name: 'produto', label: 'Produto Final', placeholder: 'O que será produzido/apresentado' },
            { type: 'select', name: 'metodologia', label: 'Metodologia', options: ['Aprendizagem Baseada em Projetos', 'Design Thinking', 'Metodologia Científica', 'STEAM'] }
        ],
        prompt: (data) => `Desenvolva um projeto didático interdisciplinar:\nEtapa: ${data.etapa}\nSérie: ${data.serie}\nTema: ${data.tema}\nÁreas: ${data.areas}\nDuração: ${data.duracao}\nProblema: ${data.problema}\nProduto: ${data.produto}\nMetodologia: ${data.metodologia}\n\nEstrutura: Justificativa, Competências BNCC, Cronograma, Recursos, Produto Final e Avaliação.`
    },
    {
        id: 'sequencia',
        icon: 'fa-list-ol',
        title: 'Sequência Didática',
        description: 'Planeje sequências de aulas articuladas',
        fields: [
            { type: 'select', name: 'etapa', label: 'Etapa de Ensino', required: true, options: ['Educação Infantil', 'Ensino Fundamental I', 'Ensino Fundamental II', 'Ensino Médio'] },
            { type: 'text', name: 'serie', label: 'Série/Ano', required: true },
            { type: 'select', name: 'area', label: 'Área do Conhecimento', required: true, options: ['Linguagens', 'Matemática', 'Ciências da Natureza', 'Ciências Humanas', 'Ensino Religioso'] },
            { type: 'text', name: 'tema', label: 'Tema Central', required: true },
            { type: 'number', name: 'aulas', label: 'Número de Aulas', required: true, placeholder: '5' },
            { type: 'number', name: 'duracao', label: 'Duração de cada aula (min)', placeholder: '50' },
            { type: 'textarea', name: 'objetivo', label: 'Objetivo Geral da Sequência', required: true },
            { type: 'textarea', name: 'conhecimentos', label: 'Conhecimentos Prévios', placeholder: 'O que os alunos já sabem sobre o tema' }
        ],
        prompt: (data) => `Desenvolva uma sequência didática:\nEtapa: ${data.etapa}\nSérie: ${data.serie}\nÁrea: ${data.area}\nTema: ${data.tema}\nAulas: ${data.aulas}\nDuração: ${data.duracao} min\nObjetivo: ${data.objetivo}\nConhecimentos prévios: ${data.conhecimentos}\n\nEstrutura: Habilidades BNCC, Desenvolvimento detalhado aula a aula, Avaliação Processual e Referências.`
    },
    {
        id: 'quiz',
        icon: 'fa-question-circle',
        title: 'Quiz Educativo',
        description: 'Crie quizzes interativos para fixação',
        fields: [
            { type: 'select', name: 'etapa', label: 'Etapa de Ensino', required: true, options: ['Educação Infantil', 'Ensino Fundamental I', 'Ensino Fundamental II', 'Ensino Médio'] },
            { type: 'text', name: 'serie', label: 'Série/Ano', required: true },
            { type: 'select', name: 'area', label: 'Área do Conhecimento', required: true, options: ['Linguagens', 'Matemática', 'Ciências da Natureza', 'Ciências Humanas', 'Ensino Religioso'] },
            { type: 'text', name: 'tema', label: 'Tema/Conteúdo', required: true },
            { type: 'number', name: 'questoes', label: 'Número de Questões', required: true, placeholder: '10' },
            { type: 'select', name: 'dificuldade', label: 'Nível de Dificuldade', options: ['Fácil', 'Médio', 'Difícil', 'Misto'] },
            { type: 'select', name: 'tipo', label: 'Tipo de Questões', options: ['Múltipla Escolha', 'Verdadeiro/Falso', 'Completar', 'Misto'] },
            { type: 'textarea', name: 'objetivo', label: 'Objetivo do Quiz', placeholder: 'Revisar, fixar, diagnosticar...' }
        ],
        prompt: (data) => `Crie um quiz educativo:\nEtapa: ${data.etapa}\nSérie: ${data.serie}\nÁrea: ${data.area}\nTema: ${data.tema}\nQuestões: ${data.questoes}\nDificuldade: ${data.dificuldade}\nTipo: ${data.tipo}\nObjetivo: ${data.objetivo}\n\nEstrutura: Habilidades BNCC, Questões numeradas com gabarito e explicação.`
    },
    {
        id: 'jogo',
        icon: 'fa-gamepad',
        title: 'Jogo Educativo',
        description: 'Desenvolva jogos para aprendizagem lúdica',
        fields: [
            { type: 'select', name: 'etapa', label: 'Etapa de Ensino', required: true, options: ['Educação Infantil', 'Ensino Fundamental I', 'Ensino Fundamental II', 'Ensino Médio'] },
            { type: 'text', name: 'serie', label: 'Série/Ano', required: true },
            { type: 'select', name: 'area', label: 'Área do Conhecimento', required: true, options: ['Linguagens', 'Matemática', 'Ciências da Natureza', 'Ciências Humanas', 'Ensino Religioso'] },
            { type: 'text', name: 'tema', label: 'Tema/Conteúdo', required: true },
            { type: 'select', name: 'tipo', label: 'Tipo de Jogo', options: ['Tabuleiro', 'Cartas', 'Digital', 'Movimento', 'Quebra-cabeça', 'RPG Educativo'] },
            { type: 'number', name: 'jogadores', label: 'Número de Jogadores', placeholder: '4' },
            { type: 'number', name: 'tempo', label: 'Tempo de Jogo (min)', placeholder: '30' },
            { type: 'textarea', name: 'objetivo', label: 'Objetivo Pedagógico', required: true }
        ],
        prompt: (data) => `Desenvolva um jogo educativo:\nEtapa: ${data.etapa}\nSérie: ${data.serie}\nÁrea: ${data.area}\nTema: ${data.tema}\nTipo: ${data.tipo}\nJogadores: ${data.jogadores}\nTempo: ${data.tempo} min\nObjetivo: ${data.objetivo}\n\nEstrutura: Regras, Materiais, Mecânica do Jogo, Variações e Dicas para o Professor.`
    },
    {
        id: 'temas-transversais',
        icon: 'fa-globe-americas',
        title: 'Temas Contemporâneos Transversais',
        description: 'Desenvolva atividades com temas transversais da BNCC',
        fields: [
            { type: 'select', name: 'tipo_conteudo', label: 'Tipo de Conteúdo', required: true, options: ['Atividade', 'Plano de Aula', 'Sequência Didática', 'Projeto Didático'] },
            { type: 'select', name: 'etapa', label: 'Etapa de Ensino', required: true, options: ['Educação Infantil', 'Ensino Fundamental I', 'Ensino Fundamental II', 'Ensino Médio'] },
            { type: 'text', name: 'serie', label: 'Série/Ano', required: true },
            { type: 'select', name: 'tema', label: 'Tema Transversal', required: true, options: ['Direitos Humanos', 'Educação Ambiental', 'Educação Alimentar', 'Educação Financeira', 'Educação Fiscal', 'Trabalho', 'Ciência e Tecnologia', 'Diversidade Cultural', 'Educação para o Trânsito', 'Saúde', 'Vida Familiar e Social', 'Educação para o Consumo', 'Processo de Envelhecimento', 'Respeito e Valorização do Idoso', 'Preservação do Meio Ambiente'] },
            { type: 'select', name: 'area', label: 'Área Principal', required: true, options: ['Linguagens', 'Matemática', 'Ciências da Natureza', 'Ciências Humanas', 'Ensino Religioso'] },
            { type: 'textarea', name: 'contexto', label: 'Contexto Local/Regional', placeholder: 'Descreva aspectos da realidade local que podem ser explorados' },
            { type: 'select', name: 'metodologia', label: 'Metodologia', options: ['Projeto', 'Debate', 'Pesquisa', 'Estudo de Caso', 'Simulação', 'Campanha', 'Feira de Conhecimentos'] },
            { type: 'number', name: 'duracao', label: 'Duração (aulas)', placeholder: '4' },
            { type: 'textarea', name: 'objetivo', label: 'Objetivo Específico', placeholder: 'O que pretende desenvolver com este tema transversal' }
        ],
        prompt: (data) => `Desenvolva um(a) ${data.tipo_conteudo} sobre Tema Transversal:\nTema: ${data.tema}\nEtapa: ${data.etapa}\nSérie: ${data.serie}\nÁrea: ${data.area}\nContexto: ${data.contexto}\nMetodologia: ${data.metodologia}\nDuração: ${data.duracao} aulas\nObjetivo: ${data.objetivo}\n\nImportante: Trabalhe de forma integrada, promovendo reflexão crítica e cidadania.`
    },
    {
        id: 'av-diagnostica',
        icon: 'fa-user-md',
        title: 'Avaliação Diagnóstica (Sondagem)',
        description: 'Identifique lacunas de aprendizagem de anos anteriores',
        fields: [
            { type: 'select', name: 'etapa', label: 'Etapa de Ensino', required: true, options: ['Educação Infantil', 'Ensino Fundamental I', 'Ensino Fundamental II', 'Ensino Médio'] },
            { type: 'text', name: 'serie', label: 'Série/Ano Atual', required: true, placeholder: 'Ex: 8º ano' },
            { type: 'select', name: 'area', label: 'Área do Conhecimento', required: true, options: ['Linguagens', 'Matemática', 'Ciências da Natureza', 'Ciências Humanas', 'Ensino Religioso'] },
            { type: 'text', name: 'disciplina', label: 'Disciplina', required: true, placeholder: 'Ex: Matemática' },
            { type: 'text', name: 'series_anteriores', label: 'Séries Anteriores para Sondar', required: true, placeholder: 'Ex: 6º e 7º ano' },
            { type: 'textarea', name: 'conteudos', label: 'Conteúdos/Habilidades a Sondar', required: true, placeholder: 'Ex: Operações com frações, equações de 1º grau...' },
            { type: 'number', name: 'questoes', label: 'Número de Questões', placeholder: '10' },
            { type: 'select', name: 'formato', label: 'Formato das Questões', options: ['Múltipla Escolha', 'Dissertativas Curtas', 'Misto', 'Resolução de Problemas'] },
            { type: 'textarea', name: 'contexto', label: 'Contexto da Turma', placeholder: 'Ex: Turma heterogênea, alunos com dificuldades em leitura...' }
        ],
        prompt: (data) => `Crie uma AVALIAÇÃO DIAGNÓSTICA (SONDAGEM) completa:\n\nCONTEXTO:\n- Etapa: ${data.etapa}\n- Série Atual: ${data.serie}\n- Área: ${data.area}\n- Disciplina: ${data.disciplina}\n- Séries Anteriores para Sondar: ${data.series_anteriores}\n- Conteúdos/Habilidades: ${data.conteudos}\n- Número de Questões: ${data.questoes}\n- Formato: ${data.formato}\n- Contexto da Turma: ${data.contexto}\n\nOBJETIVO:\nIdentificar LACUNAS DE APRENDIZAGEM e PRÉ-REQUISITOS NÃO CONSOLIDADOS de anos anteriores, permitindo ao professor planejar intervenções pedagógicas adequadas.\n\nESTRUTURA OBRIGATÓRIA:\n1. Cabeçalho com identificação\n2. Instruções claras para o aluno\n3. Questões organizadas por habilidade/conteúdo sondado\n4. Para cada questão, indicar:\n   - Habilidade BNCC relacionada\n   - Série de origem do conteúdo\n   - Nível cognitivo (Lembrar/Compreender/Aplicar)\n5. Gabarito comentado\n6. Matriz de análise para o professor (tabela para registrar acertos/erros por habilidade)\n7. Sugestões de intervenção para cada lacuna identificada\n\nIMPORTANTE:\n- Foque em habilidades BÁSICAS e FUNDAMENTAIS\n- Evite questões de níveis cognitivos altos (Analisar, Avaliar, Criar)\n- Use linguagem acessível e contextualizada\n- Inclua questões de diferentes níveis de dificuldade dentro do básico`
    },
    {
        id: 'av-formativa-mestre',
        icon: 'fa-star',
        title: 'Avaliação Formativa Mestre',
        description: 'Gera avaliações avançadas baseadas na Taxonomia de Bloom',
        fields: [
            { type: 'text', name: 'nivel', label: 'Nível de Ensino', required: true, placeholder: 'Ex: Ensino Fundamental II (9º ano)' },
            { type: 'text', name: 'area', label: 'Área/Disciplina', required: true, placeholder: 'Ex: História / Geografia' },
            { type: 'text', name: 'unidade', label: 'Unidade Temática', required: true, placeholder: 'Ex: A Era Vargas' },
            { type: 'textarea', name: 'objetivos', label: 'Objetivos de Aprendizagem (Habilidades)', required: true },
            { type: 'textarea', name: 'contexto', label: 'Contexto Educacional', placeholder: 'Ex: Escola Rural, turma heterogênea...' },
            { type: 'number', name: 'quantidade', label: 'Quantidade de Questões', required: true, placeholder: '5' },
            { type: 'text', name: 'tipos', label: 'Tipos de Questões', placeholder: 'Ex: 2 Múltipla Escolha, 1 Estudo de Caso' },
            { type: 'text', name: 'bloom', label: 'Distribuição Bloom', placeholder: 'Ex: 1 Lembrar, 2 Analisar, 2 Criar' },
            { type: 'text', name: 'dificuldade', label: 'Níveis de Dificuldade', placeholder: 'Ex: 2 Básicas, 2 Intermediárias, 1 Avançada' },
            { type: 'text', name: 'idioma', label: 'Idioma', placeholder: 'Português Brasileiro', required: true }
        ],
        prompt: (data) => `Você é um ESPECIALISTA EM AVALIAÇÃO EDUCACIONAL, DIDÁTICA, CURRÍCULO E CIÊNCIAS DA APRENDIZAGEM, com domínio da Taxonomia de Bloom (revisada), avaliação formativa e integridade acadêmica.

OBJETIVO:
Criar uma AVALIAÇÃO FORMATIVA AVANÇADA, pedagógica e cientificamente fundamentada, alinhada à unidade acadêmica, ao conteúdo curricular e aos objetivos de aprendizagem informados abaixo.

ENTRADAS DO USUÁRIO (CONTEXTO DA AVALIAÇÃO):
1. Nível de ensino: ${data.nivel}
2. Área do conhecimento / disciplina: ${data.area}
3. Unidade temática / conteúdo específico: ${data.unidade}
4. Objetivos de aprendizagem: ${data.objetivos}
5. Contexto educacional: ${data.contexto}
6. Quantidade total de questões: ${data.quantidade}
7. Tipos de questões desejados: ${data.tipos}
8. Distribuição Taxonomia de Bloom: ${data.bloom}
9. Níveis de dificuldade: ${data.dificuldade}
10. Idioma da avaliação: ${data.idioma}

DIRETRIZES OBRIGATÓRIAS:
- Todas as questões DEVEM ser de natureza FORMATIVA (diagnóstica ou reguladora da aprendizagem).
- As perguntas devem avaliar PROCESSOS COGNITIVOS, não apenas memorização.
- Cada questão deve indicar explicitamente:
  a) Nível da Taxonomia de Bloom
  b) Nível de dificuldade
  c) Habilidade cognitiva avaliada
- As questões devem variar em complexidade e abordagem.
- Utilizar linguagem adequada ao nível de ensino informado.
- Contextualizar sempre que possível (situações reais, problemas sociais, científicos ou culturais).

ESTRUTURA OBRIGATÓRIA PARA CADA QUESTÃO:
1. Enunciado da questão
2. Tipo de questão
3. Nível da Taxonomia de Bloom
4. Grau de dificuldade
5. Objetivo pedagógico da questão
6. Gabarito ou resposta esperada
7. Justificativa pedagógica da resposta
8. Fonte confiável utilizada (livro, artigo acadêmico, documento oficial, site institucional, etc.)

EXIGÊNCIAS ACADÊMICAS:
- As fontes DEVEM ser reais, confiáveis e verificáveis.
- Evitar fontes genéricas ou não acadêmicas.
- Não inventar referências.
- Quando aplicável, priorizar documentos curriculares oficiais, livros didáticos reconhecidos e artigos científicos.

FORMATO DE SAÍDA:
- Organizar a avaliação de forma clara, numerada e bem estruturada.
- Utilizar subtítulos.
- Manter consistência terminológica e pedagógica.

RESTRIÇÕES:
- NÃO simplificar excessivamente o conteúdo.
- NÃO gerar questões vagas ou ambíguas.
- NÃO repetir estruturas de perguntas.
- NÃO criar avaliações meramente conteudistas.

CRITÉRIO DE QUALIDADE:
A avaliação deve permitir ao professor identificar:
- Quais conhecimentos prévios foram consolidados
- Quais estão parcialmente construídos
- Quais não foram construídos
permitindo planejamento de recuperação, reforço ou reensino.

Agora, gere a avaliação de sondagem com base nas informações fornecidas.`
    }
];
