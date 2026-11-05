# Desafio de Automação de Testes (Frontend & Backend)

Repositório de testes automatizados E2E (Frontend) e API, desenvolvida utilizando **TypeScript**, **Cypress** e **Mochawesome Reporter**.

---

## Pré-requisitos

Certifique-se de ter instalado em sua máquina:
- **Node.js** (versão 18 ou superior recomendada)
- **Git**

---

## Como Clonar e Configurar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/Desafio_Automacao.git
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

---

## Executando os Testes


### Executar todos os testes em modo Headless 
```bash
npm test
```

### Abrir o Cypress (Modo Interativo)
```bash
npx cypress open
```

---

## Relatórios de Testes

Os relatórios são gerados automaticamente utilizando o **Cypress Mochawesome Reporter**. 

Após a execução dos testes, o arquivo HTML são salvos no diretório:
```text
cypress/reports/
```
Você pode abrir o arquivo `.html` gerado em qualquer navegador para visualizar gráficos, status detalhados.

---
## Cenarios de Testes
| ID | Módulo / Camada | Cenário de Teste |
| :--- | :--- | :--- |
| **TC01** | API (Restful-Booker) | Health Check (Validação de disponibilidade da API) |
| **TC02** | API (Restful-Booker) | Autenticação com sucesso |
| **TC03** | API (Restful-Booker) | Autenticação com usuário inválido |
| **TC04** | API (Restful-Booker) | Autenticação com senha inválida |
| **TC05** | API (Restful-Booker) | Autenticação com campos em branco/vazios |
| **TC06** | API (Restful-Booker) | Autenticação com requisição sem corpo |
| **TC06.1** | API (Restful-Booker) | Cenário de erro: Validação de status code incorreto (Falha intencional) |
| **TC07** | API (Restful-Booker) | Listar todas as reservas |
| **TC08** | API (Restful-Booker) | Consultar reserva inexistente |
| **TC09** | API (Restful-Booker) | Criar reserva com campo inválido |
| **TC10** | API (Restful-Booker) | Criar reserva com sucesso |
| **TC11** | API (Restful-Booker) | Pesquisar reserva específica por ID |
| **TC12** | API (Restful-Booker) | Alterar reserva completamente (PUT) com sucesso |
| **TC13** | API (Restful-Booker) | Alterar reserva completamente com token inválido |
| **TC14** | API (Restful-Booker) | Alterar reserva completamente com ID inválido |
| **TC15** | API (Restful-Booker) | Alterar reserva parcialmente (PATCH) com sucesso |
| **TC16** | API (Restful-Booker) | Alterar reserva parcialmente com token inválido |
| **TC17** | API (Restful-Booker) | Alterar reserva parcialmente com ID inválido |
| **TC18** | API (Restful-Booker) | Excluir reserva com sucesso |
| **TC19** | API (Restful-Booker) | Excluir reserva com parâmetro (ID) inválido |
| **UI01** | E2E (SauceDemo) | Login com usuário inválido |
| **UI02** | E2E (SauceDemo) | Cenário de erro: Login falho com expectativa de sucesso (Falha intencional) |
| **UI03** | E2E (SauceDemo) | Login com usuário válido |
| **UI04** | E2E (SauceDemo) | Login com campos vazios |
| **UI05** | E2E (SauceDemo) | Login com usuário bloqueado |
| **UI06** | E2E (SauceDemo) | Adicionar, validar e remover itens do carrinho (Reset App State) |
| **UI07** | E2E (SauceDemo) | Fluxo completo de compra (Checkout e validação de valores totais e taxas) |
| **UI08** | E2E (SauceDemo) | Login com usuário com erros visuais (Validação via Screenshot) |

## Considerações do QA

### Estratégias Usadas
- **Tratamento de Credenciais:** Tratamento de Credenciais nos testes. Variáveis definidas em `.env` (local), se fosse um ambiente com aberto não esta disponivel no repositorio, sendo evitado adicionando no gitignore.
- **Page Object Model (POM):** Aplicado na camada de frontend (`cypress/pages/`) para separar os elementos da página e seletores das regras de negócio dos testes, garantindo facil manutenção.
- **Abstração de API e Utilitários:** Funções auxiliares centralizadas em `cypress/support/` para gerenciar requisições HTTP, payloads e manipulação de dados de autenticação e reservas.
- **Geração de Dados Dinâmicos:** Utilização da biblioteca `@faker-js/faker` para criar dados randômicos e independentes para cada execução de teste, evitando conflitos de estado.
- **Estrutura Híbrida:** Cobertura tanto de fluxos críticos de interface de usuário (e-commerce/SauceDemo) quanto de contratos e rotas de API (Restful-Booker).

### Cobertura de Código e Evidências
- A estratégia adotada priorizou os cenários usando uma Matriz de Risco, garantindo uma cobertura sólida em camadas: validação de contratos, caminhos felizes, tristes e casos limites.
- **Frontend (SauceDemo):** Validação de fluxos de login com diferentes tipos de usuários e jornada completa de compra.
- **Backend/API (Restful-Booker):** Testes de contrato, autenticação, criação, consulta, atualização e exclusão de reservas (`CRUD`), além de cenários de tratamento de erros.

### Futuros Ajustes, caso houvesse mais tempo
- E se tivesse mais tempo de desenvolvimento, o foco seria refinar a estrutura do código e, dependendo do escopo e do público do projeto, evoluir para BDD (Gherkin) ou Data-Driven Testing (DDT) para escalar os testes combinados com mais facilidade.
