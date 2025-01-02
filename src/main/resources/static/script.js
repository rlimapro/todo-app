function carregarTarefas() {
    fetch('http://localhost:3000/api/tarefas')
        .then(response => response.json())
        .then(tarefas => {
            const lista = document.getElementById('lista-tarefas');
            lista.innerHTML = '';

            tarefas.forEach(tarefa => {
                const div = document.createElement('div');
                div.className = 'tarefa';
                if (tarefa.completa) {
                    div.classList.add('completa');
                }

                div.innerHTML = `
                            <input type="checkbox" 
                                   ${tarefa.completa ? 'checked' : ''} 
                                   onchange="alterarStatusTarefa(${tarefa.id}, this.checked, '${tarefa.descricao}')">
                            <span>${tarefa.descricao}</span>
                        `;

                lista.appendChild(div);
            });
        })
        .catch(error => console.error('Erro:', error));
}

function adicionarTarefa() {
    const descricao = document.getElementById('descricao').value;
    if (!descricao) return;

    fetch('http://localhost:3000/api/tarefas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            descricao: descricao,
            completa: false
        })
    })
        .then(response => response.json())
        .then(() => {
            document.getElementById('descricao').value = '';
            carregarTarefas();
        })
        .catch(error => console.error('Erro:', error));
}

function alterarStatusTarefa(id, completa, descricao) {
    fetch(`http://localhost:3000/api/tarefas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            descricao: descricao,
            completa: completa
        })
    })
        .then(() => carregarTarefas())
        .catch(error => console.error('Erro:', error));
}

document.getElementById('descricao').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        adicionarTarefa();
    }
});

carregarTarefas();