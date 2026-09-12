# Fácil Care (PWA)

> Com o envelhecimento acelerado da população no Brasil e no mundo, famílias precisam monitorar a rotina de saúde dos idosos em tempo real.

O *Progressive Web App* (PWA) será **100% offline**, ou seja, será possível:
- Acessá-lo mesmo **sem conexão** com internet ou Wi-Fi
- Manter os **dados** de um paciente com **privacidade total** (são armazenados apenas localmente)
- **Sem custos** para armazenamento na **nuvem**
> 🎨 Projeto Figma: [Clique Aqui](https://www.figma.com/design/Hz5x5uWg9bis53saHyB4vJ/Cuidados-Di%C3%A1rios?node-id=0-1&p=f&t=72omA2iRuWiTJfML-0)

Funcionalidades
---
Sistema com foco em facilitar a rotina de cuidadores, permitir criar resumos sobre a situação do paciente para médicos e garantir funcionalidade sem internet
## Gestão de Perfil e Emergência `*`
- **Ficha médica básica:**
    - Dados pessoais
    - Tipo sanguíneo
    - Alergias graves
    - Planos de Saúde
    - Médicos conhecidos pelo paciente ou que acompanham ele
    - Dados dos cuidadores
- **Acesso à informações de emergência:**
    - Familiares Próximos
## Diário de Cuidados e Rotina Diária
- **Registro de sinais vitais**:
    - Medições comuns diárias (glicemia, pressão arterial, temperatura, saturação de oxigênio, frequência cardíaca)
        - Medições podem ocorrer mais de uma vez por dia
- **Acompanhamento Fisiológico e Comportamental**:
    - Humor
    - Nível de dor (Escala númerica (0 a 10) + Escala de Faces)
    - `!!!` Qualidade do sono (0 a 100)
    - Aceitação de refeições + ingestão de água
    - Controle de evacuação e diurese
    - Peso
    - `!!!` Fotos (câmera) para acompanhamento de alterações visuais (lesões na pele, por exemplo)
## Controle de Medicamentos `**`
- **Cadastro de aprazamento**:
    - Registro de medicamentos (dosagens, via de administração, horários e observações)
- **Alerta (notificações)**:
    - Alertas visuais e sonoros no momento que algum remédio deve ser tomado *(Web Notifications API)*
- **`!!!` Controle de Estoque**
    - Baixa automática da quantidade disponível ao confirmar a dose administrada, com alerta visual de estoque baixo para compra
- **Checklist de Aprazamentos**
    - Registrar os dados do medicamento tomado (horário da administração, cuidador e observações)
## Análise de Dados (Relatórios)
- **Dashboard Interativo**:
    - Gráficos representando, por exemplo, sinais vitais do paciente ou comportamento em um determinado período (período selecionável)
- **Linha do Tempo (Diária)**:
    - Feed diário (remédios administrados,f quem aplicou e observações registradas)
## Troca de Dados
- **QR Code + Backup arquivo JSON**:
    - Gerar QR Code contendo os dados do paciente
    - Gerar arquivo JSON contendo todos os dados do paciente
    - Exportação/Importação manual (Prevenir perdas, backup offline e migração de dispositivo)
- **Relatórios em PDF**:
    - Geração de documentos e formatados (jsPDF) com gráficos e históricos do paciente
        - Sinais vitais
        - Acompanhamento fisiológico e comportamental
        - Selecionar intervalo de medição (Gráfico)
## Acessibilidade
- **Síntese de Voz**:
    - `Web Speech API`
    - Leitura dos lembretes e horários de remédios em voz alta
- **Interface Adaptada**:
    - Modo claro, escuro e alto contraste
    - Botões maiores
    - Opção de aumentar o tamanho da fonte
# Afins
---

- `*` Dados pessoais ficam armazenados apensa dentro do aplicativo, nenhum desenvolvedor deve ter acesso a eles de forma deliberada.
- `**` Não nos responsabilizamos por dados incorretos preenchidos sobre controle de remédios, é de total autoridade do usuário cadastrar corretamente os dados.
- `!!!` Tecnologias ainda em análise de como aplicar ou se vão ser aplicadas no produto final.

