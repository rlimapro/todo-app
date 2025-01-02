# Aplicação de lista To-Do

Uma aplicação simples de lista de tarefas construída com Spring Boot e Docker.

## Requisitos

- Docker
- Docker Compose

## Como executar

1. Clone o repositório:
```bash
git clone https://github.com/rlimapro/todo-app.git
cd todo-app
```

2. Construa a imagem Docker:
```bash
docker-compose build
```

3. Inicie a aplicação:
```bash
docker-compose up
```

A aplicação estará disponível em http://localhost:3000

## API Endpoints

- GET /api/tarefas - Lista todas as tarefas
- POST /api/tarefas - Cria uma nova tarefa
- PUT /api/tarefas/{id} - Atualiza uma tarefa existente
- DELETE /api/tarefas/{id} - Remove uma tarefa

## Persistência de Dados

Os dados são persistidos em um banco H2 no diretório /data do container, que está mapeado para um volume Docker chamado todo-data. Isso garante que os dados sejam preservados mesmo após reiniciar os containers.

## Testando a Persistência

1. Adicione algumas tarefas através da interface disponível em http://localhost:3000
2. Pare os containers: `docker-compose down`
3. Inicie novamente: `docker-compose up`
4. Retorne para http://localhost:3000
5. Verifique se as tarefas ainda estão disponíveis

## Prints

Os prints das etapas mais importantes estão presentes na pasta /prints na raiz do projeto.