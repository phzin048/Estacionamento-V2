function adicionarEstacionamento() { 
    const placa = document.getElementById("placa").value;
    const pagou = document.getElementById("pagou").value;

    if (!placa) {
        alert("Por favor, insira a placa do carro!");
        return;
    }

    // Criar um objeto para o estacionamento
    const novoEstacionamento = {
        placa,
        pagou: pagou === "sim" ? "Sim" : "Não"
    };

    // Recuperar estacionamentos salvos no localStorage
    let estacionamentos = JSON.parse(localStorage.getItem("estacionamentos")) || [];
    estacionamentos.push(novoEstacionamento);

    // Atualizar o localStorage
    localStorage.setItem("estacionamentos", JSON.stringify(estacionamentos));

    // Atualizar a interface
    renderizarEstacionamentos();
    document.getElementById("placa").value = "";
}

function renderizarEstacionamentos() {
    const estacionamentoContainer = document.getElementById("estacionamentos-container");
    estacionamentoContainer.innerHTML = ""; // Limpar container antes de renderizar

    // Recuperar estacionamentos salvos
    const estacionamentos = JSON.parse(localStorage.getItem("estacionamentos")) || [];

    // Renderizar cada estacionamento
    estacionamentos.forEach((estacionamento, index) => {
        const estacionamentoDiv = document.createElement("div");
        estacionamentoDiv.className = "estacionamento";

        estacionamentoDiv.innerHTML = `
            <p><strong>Placa:</strong> ${estacionamento.placa}</p>
            <p><strong>Pagou:</strong> ${estacionamento.pagou}</p>
            <button onclick="removerEstacionamento(${index})" class="remove-button">X</button>
        `;

        estacionamentoContainer.appendChild(estacionamentoDiv);
    });
}

function removerEstacionamento(index) {
    // Recuperar estacionamentos salvos
    let estacionamentos = JSON.parse(localStorage.getItem("estacionamentos")) || [];

    // Remover o item pelo índice
    estacionamentos.splice(index, 1);

    // Atualizar o localStorage
    localStorage.setItem("estacionamentos", JSON.stringify(estacionamentos));

    // Atualizar a interface
    renderizarEstacionamentos();
}

// Renderizar os estacionamentos salvos ao carregar a página
window.onload = () => {
    renderizarEstacionamentos();
};
