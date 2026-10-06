# FacilCare (PWA) - PWA Offline-First para Monitoramento de Saúde

> **Contexto**: Com o envelhecimento acelerado da população no Brasil e no mundo, famílias precisam monitorar a rotina de saúde dos idosos em tempo real.

O *Progressive Web App* (PWA) será **100% offline** (salvo as exceções`*`), ou seja, é possível:
- Acessá-lo mesmo **sem conexão** com internet
- Manter os **dados** de um paciente com **privacidade total** (são armazenados apenas localmente)
- **Sem custos** para armazenamento na **nuvem**

Para isso, utiliza-se o banco de dados interno aos navegadores (`IndexedDB` + wrapper `Dexie.js`)

> 🎨 Projeto Figma: [Clique Aqui](https://www.figma.com/design/Hz5x5uWg9bis53saHyB4vJ/Cuidados-Di%C3%A1rios?node-id=0-1&p=f&t=72omA2iRuWiTJfML-0)

> 🌐 Página Web: [Clique Aqui](https://facilcare.vercel.app/)

Funcionalidades
---
Sistema com foco em **facilitar a rotina de cuidadores**, permitindo: 

## Gestão de Perfil e Emergência `**`
- **Ficha médica básica:**
    - Dados pessoais (nome, endereço, data de nascimento e peso)
    - Tipo sanguíneo
    - Alergias (principalmente à remédios)
    - Planos de Saúde
    - Médicos conhecidos pelo paciente ou que acompanham ele
    - Dados dos cuidadores
- **Outros:**
    - Familiares Próximos

## Diário de Cuidados e Rotina Diária
- Possibilita visualizar cada registro de forma unitária, apresentando:
  - Estatísticas (filtradas por data)
  - Últimas medições/registros
- **Registro de sinais vitais**:
    - Medições diárias *(glicemia, pressão arterial, temperatura, saturação de oxigênio, frequência cardíaca)*
    - Medições podem ocorrer mais de uma vez por dia
- **Acompanhamento Fisiológico e Comportamental**:
    - Humor
    - Nível de dor (Escala númerica (0 a 10))
    - Qualidade do sono (0 a 100)
    - Aceitação de refeições + Ingestão de água
    - Controle de evacuação e diurese
    - Peso

## Controle de Medicamentos `***`
- **Cadastro de Aprazamento**:
    - Registro de medicamentos *(dosagens, via de administração, horários e observações)*
- **Alerta (Notificações)**:
    - Alertas visuais e sonoros no momento que algum remédio deve ser tomado *(`Web Notifications API`)*
- **Checklist de Aprazamentos**
    - Registrar os dados de medicamentos administrados (data/hora da administração, cuidador e observações)

## Análise de Dados (Relatórios)
- **Dashboard Interativo**:
    - Gráficos representando, por exemplo, sinais vitais do paciente ou comportamento em um determinado período (período selecionável)
- **Linha do Tempo (Diária)**:
    - Feed diário (remédios administrados,f quem aplicou e observações registradas)

## Troca de Dados
- **Backup JSON**: Exportação e importação manual do arquivo de backup para migração de dispositivos e prevenção de perdas sem uso de nuvem
- **Sincronização P2P (WebRTC/PeerJS)**: Envio de dados diretamente entre dispositivos por meio da geração de QR Code com link de pareamento (`site/import?peerId=<hostPeerId>`)

## Acessibilidade
- **Interface Adaptada**: Modo claro, escuro e alto contraste

Esquema de Pastas
---
```
  |
  |- public             # Ícones do PWA
  |- src              
     |- assets         # Estilos globais, fontes e ícones
     |- components     # Componentes de UI em Vue
     |- composables    # Regras de Negócio
     |- controllers    # Controladores da aplicação
     |- database       # Inicialização do Dexie.js / IndexedDB
     |- locales        # Lógica de internacionalização (i18n)
     |- models         # Modelos de acesso aos dados
     |- router         # Rotas de navegação do Vue Router
     |- views          # Páginas principais do sistema
```

Recursos Futuros
---
1. **Acompanhamento Visual de Lesões**: Uso da câmera do dispositivo para registro fotográfico de alterações na corporais em geral
2. **Controle Automático de Estoque**: Baixa automática de quantidade disponível de remédios ao confirmar a dose, com alertas visuais para reposição
3. **Síntese de Voz (Web Speech API)**: Leitura dos lembretes e horários de remédios em voz alta para apoiar pessoas com limitações visuais
4. **Relatórios em PDF**: Geração local de relatórios médicos formatados com gráficos usando a biblioteca `jsPDF`

Afins
---
- `*` Para gerar o QR Code de Backup do paciente será necessário **conexão com a internet**`*`, tendo em vista a limitação de caracteres que o código pode apresentar
- `**` Dados pessoais ficam armazenados apensa dentro do aplicativo, nenhum desenvolvedor deve ter acesso a eles de forma deliberada.
- `***` O sistema atua como uma ferramenta de apoio à rotina; a exatidão das informações de aprazamento e dosagem cadastradas é de responsabilidade exclusiva do usuário ou cuidador.

