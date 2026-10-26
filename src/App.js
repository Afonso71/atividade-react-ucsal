import React, { useState } from 'react';
import { ToastProvider, useToast } from './context/ToastContext';
import Accordion from './components/Accordion';
import Pagination from './components/Pagination';
import ProgressBar from './components/ProgressBar';
import Tabs from './components/Tabs';
import Dropdown from './components/Dropdown';
import './App.css';

function DashboardContent() {
  const { addToast } = useToast();

  // Estado para a Barra de Progresso
  const [uploadProgress, setUploadProgress] = useState(40);

  // Estado e dados para a Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const allModules = [
    { id: 1, name: 'Módulo 1: Fundamentos de Componentes e JSX', status: 'Concluído' },
    { id: 2, name: 'Módulo 2: Gerenciamento de Props e Imutabilidade', status: 'Concluído' },
    { id: 3, name: 'Módulo 3: Estado Local com Hook useState', status: 'Em andamento' },
    { id: 4, name: 'Módulo 4: Ciclo de Vida e Hook useEffect', status: 'Em andamento' },
    { id: 5, name: 'Módulo 5: Context API e Estado Global', status: 'Pendente' },
    { id: 6, name: 'Módulo 6: Acessibilidade Web (ARIA) e Semântica', status: 'Pendente' },
    { id: 7, name: 'Módulo 7: Responsividade e Layouts Fluidos', status: 'Pendente' },
    { id: 8, name: 'Módulo 8: Deploy e Revisão de Código', status: 'Pendente' },
  ];
  const itemsPerPage = 2;
  const totalPages = Math.ceil(allModules.length / itemsPerPage);
  const currentItems = allModules.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Dados para as Abas
  const tabsData = [
    {
      id: 'visao-geral',
      title: 'Visão Geral',
      content:
        'Este painel reúne os 6 componentes obrigatórios da atividade de Engenharia de Software da UCSal. Todos os componentes foram construídos de forma modular utilizando React Hooks e boas práticas de acessibilidade.',
    },
    {
      id: 'arquitetura',
      title: 'Arquitetura React',
      content:
        'A aplicação utiliza useState para estados locais (abas, acordeão, paginação e progresso), useEffect para temporizadores e eventos de clique externo, e Context API para disparo global de notificações Toast.',
    },
    {
      id: 'responsividade',
      title: 'Responsividade',
      content:
        'O layout utiliza CSS Grid e Flexbox com Media Queries para se adaptar automaticamente a telas de smartphones, tablets e desktops sem perda de usabilidade.',
    },
  ];

  // Dados para o Acordeão (FAQ)
  const faqItems = [
    {
      id: 1,
      title: 'Como funciona o gerenciamento de estado neste projeto?',
      content:
        'Cada componente controla seu próprio estado interno (como qual aba ou item do acordeão está aberto), enquanto dados compartilhados, como as notificações Toast, utilizam a Context API.',
    },
    {
      id: 2,
      title: 'Como o Menu Suspenso detecta cliques fora dele?',
      content:
        'Utilizamos o hook useRef para referenciar o container do menu no DOM e um event listener no useEffect que fecha o menu caso o clique ocorra fora dessa referência.',
    },
    {
      id: 3,
      title: 'A aplicação atende aos critérios de acessibilidade?',
      content:
        'Sim. Foram aplicadas tags semânticas do HTML5 (header, main, section, nav) e atributos ARIA como role="progressbar", role="tablist", role="alert" e aria-expanded.',
    },
  ];

  // Opções para o Menu Suspenso
  const dropdownOptions = [
    {
      label: 'Filtrar: Todos os Módulos',
      value: 'all',
      onClick: () => addToast('Filtro alterado para: Todos os Módulos', 'info'),
    },
    {
      label: 'Exportar Relatório PDF',
      value: 'export',
      onClick: () => addToast('Relatório exportado com sucesso!', 'success'),
    },
    {
      label: 'Sincronizar Servidor',
      value: 'sync',
      onClick: () => addToast('Falha de conexão ao sincronizar servidor.', 'error'),
    },
  ];

  const handleProgressChange = (newVal) => {
    const clamped = Math.min(100, Math.max(0, newVal));
    setUploadProgress(clamped);
    if (clamped === 100) {
      addToast('Progresso da tarefa atingiu 100%!', 'success');
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    addToast(`Navegou para a página ${newPage}`, 'info');
  };

  return (
    <div className="app-layout">
      <header className="app-header">
        <div>
          <h1>UCSal DevPanel - Atividade React.js</h1>
          <p>Demonstração prática de Componentes, Props, State e Context API</p>
        </div>

        {/* Componente 5: Menu Suspenso */}
        <Dropdown label="Ações do Painel" options={dropdownOptions} />
      </header>

      <main className="app-grid">
        {/* Componente 4: Abas */}
        <section className="card">
          <h2>1. Organização em Abas (Tabs)</h2>
          <Tabs tabs={tabsData} />
        </section>

        {/* Componente 3: Barra de Progresso */}
        <section className="card">
          <h2>2. Barra de Progresso (Progress Bar)</h2>
          <ProgressBar
            progress={uploadProgress}
            label="Progresso de Conclusão do Semestre"
          />
          <div className="button-group">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => handleProgressChange(uploadProgress - 20)}
            >
              -20%
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleProgressChange(uploadProgress + 20)}
            >
              +20%
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => handleProgressChange(100)}
            >
              Concluir (100%)
            </button>
          </div>
        </section>

        {/* Componente 2: Paginação */}
        <section className="card">
          <h2>3. Listagem com Paginação (Pagination)</h2>
          <ul className="module-list">
            {currentItems.map((mod) => (
              <li key={mod.id} className="module-item">
                <span>{mod.name}</span>
                <span className="badge">{mod.status}</span>
              </li>
            ))}
          </ul>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </section>

        {/* Componente 6: Controle direto de Notificação Toast */}
        <section className="card">
          <h2>4. Notificações Toast (Context API)</h2>
          <p className="card-desc">
            Dispare feedbacks temporários globais para testar os diferentes estados:
          </p>
          <div className="button-group">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => addToast('Operação salva com sucesso!', 'success')}
            >
              Toast Sucesso
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => addToast('Erro ao processar a requisição.', 'error')}
            >
              Toast Erro
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => addToast('Nova atualização disponível no sistema.', 'info')}
            >
              Toast Info
            </button>
          </div>
        </section>

        {/* Componente 1: Acordeão */}
        <section className="card card-full">
          <h2>5. Perguntas Frequentes (Accordion)</h2>
          <Accordion items={faqItems} />
        </section>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <DashboardContent />
    </ToastProvider>
  );
}