// Inicialização da lista de tarefas vazia
let listaTarefa = [];

// Capturação de referências aos botões no HTML
const botaoAddTarefa = document.querySelector("#btnAddTarefa");
const botaoListarPorImportancia = document.querySelector("#btnListarPorImportancia");

// Adiciona um evento de clique ao botão "Adicionar Tarefa"
botaoAddTarefa.addEventListener("click", (evento) => {
    evento.preventDefault();

    // Captura os valores dos campos de entrada do formulário
    const descricao = document.querySelector("#idDescricao").value;
    const autor = document.querySelector("#idAutor").value;
    const departamento = document.querySelector("#idDepartamento").value;
    const valor = document.querySelector("#idValor").value;
    const duracao = document.querySelector("#idDuracao").value;

    // Captura a escolha da importância através dos elementos de rádio
    const importanciaElementos = document.getElementsByName('importancia');
    let importancia;
    for (const elemento of importanciaElementos) {
        if (elemento.checked) {
            importancia = elemento.value;
            break;
        }
    }

    // Cria um objeto tarefa com os valores capturados
    const tarefa = {
        descricao,
        autor,
        departamento,
        importancia,
        valor,
        duracao
    };

    // Adiciona a tarefa à lista de tarefas e atualiza a exibição
    listaTarefa.push(tarefa);
    atualizarLista();
});

// Adiciona um evento de clique ao botão "Listar Por Importância"
botaoListarPorImportancia.addEventListener("click", () => {
    // Ordena as tarefas por importância e atualiza a exibição
    const tarefasOrdenadas = listaTarefa.slice().sort((a, b) => {
        const valoresImportancia = { 'Importante': 3, 'Razoável': 2, 'Baixo': 1 };
        return valoresImportancia[b.importancia] - valoresImportancia[a.importancia];
    });
    atualizarLista(tarefasOrdenadas);
});

// Função para atualizar a exibição das tarefas
function atualizarLista(tarefas = listaTarefa) {
    // Captura a lista no HTML onde as tarefas serão exibidas
    const listaTarefasUL = document.querySelector("#listaTarefa");
    listaTarefasUL.innerHTML = '';

    // Itera sobre as tarefas e cria elementos HTML para exibição
    tarefas.forEach(tarefa => {
        let li = document.createElement("li");
        li.textContent = `${tarefa.descricao} - ${tarefa.autor} - ${tarefa.departamento} - ${tarefa.importancia}`;
        if (tarefa.valor) li.textContent += ` - ${tarefa.valor}`;
        if (tarefa.duracao) li.textContent += ` - ${tarefa.duracao}`;

        // Cria um botão para excluir a tarefa
        let botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = " x ";
        li.appendChild(botaoExcluir);

        // Adiciona a tarefa à lista de tarefas no HTML
        listaTarefasUL.appendChild(li);

        // Adiciona um evento de clique ao botão de exclusão
        botaoExcluir.addEventListener("click", (evt) => {
            evt.preventDefault();

            // Encontra o índice da tarefa e a remove da lista
            let indiceTarefa = listaTarefa.indexOf(tarefa);
            if (indiceTarefa !== -1) {
                listaTarefa.splice(indiceTarefa, 1);
            }

            // Remove o elemento correspondente da exibição
            evt.target.parentNode.remove();
        });
    });

    // Reseta os valores dos campos de entrada
    document.querySelector("#idDescricao").value = "";
    document.querySelector("#idAutor").value = "";
    document.querySelector("#idDepartamento").value = "";
    document.querySelector('input[name="importancia"]:checked').checked = false;
    document.querySelector("#idValor").value = "";
    document.querySelector("#idDuracao").value = "";
}
