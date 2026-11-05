# Desafio de Automação de Testes (Frontend & Backend)

Repositório de testes automatizados E2E (Frontend) e API, desenvolvida utilizando **TypeScript**, **Cypress** e **Mochawesome Reporter**.

---

## 📋 Pré-requisitos

Certifique-se de ter instalado em sua máquina:
- **Node.js** (versão 18 ou superior recomendada)
- **npm** (geralmente instalado junto com o Node.js)
- **Git**

---

## 🚀 Como Clonar e Configurar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/Desafio_Automacao.git
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

---

## 🧪 Executando os Testes


### Executar todos os testes em modo Headless 
```bash
npm test
```

### Abrir o Cypress (Modo Interativo)
```bash
npx cypress open
```

---

## 📊 Relatórios de Testes

Os relatórios detalhados de execução são gerados automaticamente utilizando o **Cypress Mochawesome Reporter**. 

Após a execução dos testes, os arquivos HTML e JSON consolidados são salvos no diretório:
```text
cypress/reports/
```
Você pode abrir o arquivo `.html` gerado em qualquer navegador para visualizar gráficos, status detalhados e evidências (prints de tela em caso de falhas).

---

## 💡 Considerações do QA

> A estratégia adotada priorizou os cenários usando uma Matriz de Risco, garantindo uma cobertura sólida em camadas: validação de contratos, caminhos felizes, tristes e casos limites.E se tivesse mais tempo de desenvolvimento, o foco seria refinar a estrutura do código e, dependendo do escopo e do público do projeto, evoluir para BDD (Gherkin) ou Data-Driven Testing (DDT) para escalar os testes combinados com mais facilidade.

### 🛠️ Estratégias Usadas
- **Page Object Model (POM):** Aplicado na camada de frontend (`cypress/pages/`) para separar os elementos da página e seletores das regras de negócio dos testes, garantindo facil manutenção.
- **Abstração de API e Utilitários:** Funções auxiliares centralizadas em `cypress/support/` para gerenciar requisições HTTP, payloads e manipulação de dados de autenticação e reservas.
- **Geração de Dados Dinâmicos:** Utilização da biblioteca `@faker-js/faker` para criar dados randômicos e independentes para cada execução de teste, evitando conflitos de estado.
- **Estrutura Híbrida:** Cobertura tanto de fluxos críticos de interface de usuário (e-commerce/SauceDemo) quanto de contratos e rotas de API (Restful-Booker).

### 📈 Cobertura de Código e Evidências
- **Frontend (SauceDemo):** Validação de fluxos de login com diferentes tipos de usuários e jornada completa de compra.
- **Backend/API (Restful-Booker):** Testes de contrato, autenticação, criação, consulta, atualização e exclusão de reservas (`CRUD`), além de cenários de tratamento de erros.
- **Evidências:** Capturas de tela automáticas e relatórios consolidados gerados em caso de falhas ou execuções locais.

### 🔮 Futuros Ajustes, caso houvesse mais tempo
- **Data-Driven Testing:** Expandir a massa de testes utilizando arquivos externos (`fixtures`) parametrizados para abranger um leque ainda maior de cenários combinados.
- **Testes de Performance Básicos:** Incorporação de verificações de tempo de resposta nas requisições críticas de API.
