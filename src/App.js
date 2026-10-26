import React, { useState } from 'react';
import { ToastProvider, useToast } from './context/ToastContext';
import Accordion from './components/Accordion';
import Pagination from './components/Pagination';
import ProgressBar from './components/ProgressBar';
import Tabs from './components/Tabs';
import Dropdown from './components/Dropdown';
import './App.css';

function PitLogWorkshop() {
  const { addToast } = useToast();

  // Estado da Barra de Progresso (Carga no Dinamômetro)
  const [dynoLoad, setDynoLoad] = useState(60);

  // Estado e Dados da Paginação (Histórico de Ordens de Serviço)
  const [currentPage, setCurrentPage] = useState(1);
  const serviceOrders = [
    { id: 'OS-104', task: 'Troca de Óleo 5W30 Sintético e Filtro', km: '10.000 KM', status: 'CONCLUÍDO' },
    { id: 'OS-108', task: 'Sangria de Freio com Fluido DOT 4 Racing', km: '15.200 KM', status: 'CONCLUÍDO' },
    { id: 'OS-112', task: 'Alinhamento Técnico, Cambagem e Caster', km: '18.500 KM', status: 'CONCLUÍDO' },
    { id: 'OS-119', task: 'Limpeza de Corpo de Borboleta (TBI) e Velas', km: '22.000 KM', status: 'EM BANCADA' },
    { id: 'OS-124', task: 'Aferição de Pressão da Bomba de Combustível', km: '25.100 KM', status: 'EM BANCADA' },
    { id: 'OS-129', task: 'Substituição de Buchas de Bandeja em PU', km: '28.000 KM', status: 'AGENDADO' },
    { id: 'OS-133', task: 'Regulagem de Folga de Válvulas a Frio', km: '30.000 KM', status: 'AGENDADO' },
    { id: 'OS-140', task: 'Mapeamento de Ignição no Dinamômetro de Rolo', km: '31.500 KM', status: 'FILA BOX' },
  ];

  const itemsPerPage = 2;
  const totalPages = Math.ceil(serviceOrders.length / itemsPerPage);
  const currentOrders = serviceOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Dados das Abas (Especificações de Acerto)
  const setupTabs = [
    {
      id: 'motor',
      specCode: 'ENG-3C',
      title: 'Motor e Alimentação',
      content:
        'Taxa de compressão aferida nos cilindros sem variação superior a 2%. Mistura estequiométrica monitorada via sonda banda larga com alvo de lambda 0.86 em plena carga e temperatura de admissão controlada.',
    },
    {
      id: 'suspensao',
      specCode: 'SUSP-02',
      title: 'Suspensão e Geometria',
      content:
        'Amortecedores recalibrados com carga de retorno 15% mais firme. Geometria dianteira acertada com -1.5 grau de cambagem negativa e 0.5mm de divergência (toe-out) para resposta imediata de entrada de curva.',
    },
    {
      id: 'freios',
      specCode: 'BRK-04',
      title: 'Freios e Arrefecimento',
      content:
        'Discos dianteiros ventilados ranhurados com pastilhas de composto semimetálico. Linha pressurizada com ponto de ebulição seco de 270 graus Celsius, sem fadiga de pedal após ciclos repetidos.',
    },
  ];

  // Dados do Acordeão (Manual de Torque e Procedimentos)
  const workshopManual = [
    {
      id: 'proc-1',
      title: 'Sequência de Aperto e Torque das Rodas',
      content:
        'Aplicar aperto cruzado em três estágios utilizando torquímetro de estalo calibrado. Valor final fixado em 110 Nm com os prisioneiros secos, sem aplicação de graxa na rosca.',
    },
    {
      id: 'proc-2',
      title: 'Procedimento de Partida a Frio Após Revisão',
      content:
        'Antes de acionar a ignição, girar o motor sem centelha por 10 segundos para preencher a galeria de óleo e o filtro novo. Aguardar estabilização da pressão em marcha lenta antes de elevar o giro.',
    },
    {
      id: 'proc-3',
      title: 'Inspeção de Correias, Mangueiras e Coxins',
      content:
        'Verificar presença de microfissuras nas bordas da correia de acessórios e folga axial nos coxins superiores do câmbio e motor. Qualquer vazamento de fluido hidráulico exige substituição imediata da peça.',
    },
  ];

  // Opções do Menu Suspenso (Comandos da ECU)
  const scannerOptions = [
    {
      label: 'Mapa 01: Uso Diário (Etanol/Gasolina)',
      value: 'daily',
      code: 'MAP-A',
      onClick: () => addToast('Mapa de injeção 01 carregado na central.', 'info'),
    },
    {
      label: 'Gravar Log de Telemetria OBD-II',
      value: 'log',
      code: 'REC-01',
      onClick: () => addToast('Pacote de telemetria salvo com sucesso.', 'success'),
    },
    {
      label: 'Simular Corte de Giro (Redline)',
      value: 'redline',
      code: 'ERR-99',
      onClick: () => addToast('Limite de rotação excedido: corte aos 6.800 RPM.', 'error'),
    },
  ];

  const handleLoadChange = (newLoad) => {
    const clamped = Math.min(100, Math.max(0, newLoad));
    setDynoLoad(clamped);
    if (clamped === 100) {
      addToast('Plena carga atingida no rolo (100% TPS).', 'success');
    }
  };

  const handlePageSelect = (newPage) => {
    setCurrentPage(newPage);
    addToast(`Exibindo folha 0${newPage} do livro de revisões.`, 'info');
  };

  return (
    <div className="workshop-grid">
      {/* Coluna Esquerda Fixa: Telemetria e Comandos de Bancada (4 colunas) */}
      <aside className="telemetry-sidebar">
        <div className="garage-header">
          <div className="serial-stamp">UCSAL // ENG. SOFTWARE // BOX-071</div>
          <h1 className="garage-title">PITLOG OFICINA.</h1>
          <p className="garage-desc">
            Diário técnico de preparação mecânica, controle de dinamômetro e histórico de ordens de serviço.
          </p>
        </div>

        {/* Componente 5: Menu Suspenso */}
        <div className="bench-module">
          <span className="module-label">01 // CENTRAL ELETRÔNICA (ECU)</span>
          <Dropdown label="Selecionar Operação OBD" options={scannerOptions} />
        </div>

        {/* Componente 3: Barra de Progresso */}
        <div className="bench-module">
          <span className="module-label">02 // CARGA DO DINAMÔMETRO</span>
          <ProgressBar
            unitCode="DYNO-TPS"
            label="Abertura de Borboleta / Carga"
            progress={dynoLoad}
          />
          <div className="dyno-controls">
            <button
              type="button"
              className="mech-btn"
              onClick={() => handleLoadChange(dynoLoad - 20)}
            >
              -20% CARGA
            </button>
            <button
              type="button"
              className="mech-btn"
              onClick={() => handleLoadChange(dynoLoad + 20)}
            >
              +20% CARGA
            </button>
            <button
              type="button"
              className="mech-btn mech-btn-redline"
              onClick={() => handleLoadChange(100)}
            >
              WOT [100%]
            </button>
          </div>
        </div>

        <footer className="garage-footer">
          <span>SALVADOR - BA</span>
          <span>PRESSÃO ÓLEO: 4.2 BAR</span>
        </footer>
      </aside>

      {/* Palco Direito Principal: Caderno de Oficina (8 colunas) */}
      <main className="workbench-main">
        {/* Bloco Visual Assimétrico com Sobreposição de Ficha Técnica */}
        <section className="engine-bay-hero">
          <div className="bay-photo-wrapper">
            <img
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80"
              alt="Cofre de motor mecânico aberto em bancada de oficina sob luz lateral"
              className="bay-photo"
            />
          </div>

          <div className="spec-tag-overlap">
            <span className="tag-number">BOX 01</span>
            <p className="tag-copy">
              REGISTRO DE BANCADA: Fotografia 35mm Tri-X 400, luz lateral de galpão sobre cabeçote e linha de admissão pressurizada.
            </p>
          </div>
        </section>

        {/* Quebra Assimétrica: Abas (5 col) + Sensores Toast (3 col) */}
        <div className="asymmetric-row">
          {/* Componente 4: Abas */}
          <section className="work-cell cell-5col">
            <div className="cell-heading">
              <span className="giant-num">03</span>
              <div>
                <span className="module-label">CADERNO DE ACERTO</span>
                <h2>Parâmetros Mecânicos</h2>
              </div>
            </div>
            <Tabs tabs={setupTabs} />
          </section>

          {/* Componente 6: Disparo de Notificações Toast via Context API */}
          <section className="work-cell cell-3col">
            <div className="cell-heading">
              <span className="giant-num">04</span>
              <div>
                <span className="module-label">BARRAMENTO CAN-BUS</span>
                <h2>Testar Sensores</h2>
              </div>
            </div>
            <p className="sensor-intro">
              Dispare leituras globais via Context API para simular alertas da injeção na tela:
            </p>
            <div className="sensor-triggers">
              <button
                type="button"
                className="mech-btn"
                onClick={() => addToast('Temperatura do líquido arrefecedor estabilizada em 90°C.', 'success')}
              >
                [OK] PRESSÃO E TEMPERATURA
              </button>
              <button
                type="button"
                className="mech-btn"
                onClick={() => addToast('Sonda lambda realizando leitura de malha fechada.', 'info')}
              >
                [LOG] LEITURA DE SONDA
              </button>
              <button
                type="button"
                className="mech-btn mech-btn-redline"
                onClick={() => addToast('Queda de pressão na linha de combustível principal.', 'error')}
              >
                [FALHA] ALERTA DE BOMBA
              </button>
            </div>
          </section>
        </div>

        {/* Componente 2: Paginação */}
        <section className="work-cell">
          <div className="cell-heading">
            <span className="giant-num">05</span>
            <div>
              <span className="module-label">HISTÓRICO DE MANUTENÇÃO</span>
              <h2>Livro de Ordens de Serviço</h2>
            </div>
          </div>

          <div className="os-table">
            {currentOrders.map((order) => (
              <article key={order.id} className="os-row">
                <div className="os-code">{order.id}</div>
                <div className="os-info">
                  <h3>{order.task}</h3>
                  <span>HODÔMETRO REGISTRADO: {order.km}</span>
                </div>
                <div className="os-badge">{order.status}</div>
              </article>
            ))}
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageSelect}
          />
        </section>

        {/* Componente 1: Acordeão */}
        <section className="work-cell">
          <div className="cell-heading">
            <span className="giant-num">06</span>
            <div>
              <span className="module-label">MANUAL DE BANCADA</span>
              <h2>Tabela de Torque e Procedimentos</h2>
            </div>
          </div>
          <Accordion items={workshopManual} />
        </section>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <PitLogWorkshop />
    </ToastProvider>
  );
}