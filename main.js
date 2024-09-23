function adicionarItem() {
    const lista = document.getElementById('lista');
    const historico = document.getElementById('historico');

    const item = prompt("Digite o nome do item:");

    if (!item) {
        alert('Por favor, preencha o nome do item!');
        return;
    }

    const validade = new Date();
    
    // Ajuste das chances: Aumentando a probabilidade de ser amarelo (50%)
    const chance = Math.random(); // Valor entre 0 e 1

    if (chance < 0.5) {
        // 50% de chance de o item estar próximo da validade (amarelo)
        validade.setDate(validade.getDate() + Math.floor(Math.random() * 7) + 1); // Próximos 1 a 7 dias
    } else if (chance >= 0.5 && chance < 0.8) {
        // 30% de chance de o item estar vencido (vermelho)
        validade.setDate(validade.getDate() - Math.floor(Math.random() * 10) - 1); // Vencido há 1 a 10 dias
    } else {
        // 20% de chance de o item estar com bastante prazo (verde)
        validade.setDate(validade.getDate() + Math.floor(Math.random() * 30) + 8); // Vencimento de 8 a 38 dias
    }

    const li = document.createElement('li');
    li.textContent = `${item} - Vencimento: ${validade.toLocaleDateString()}`;

    const hoje = new Date();
    if (validade > hoje && (validade - hoje) > 5 * 24 * 60 * 60 * 1000) {
        li.style.backgroundColor = 'green';
    } else if (validade >= hoje && (validade - hoje) <= 5 * 24 * 60 * 60 * 1000) {
        li.style.backgroundColor = 'yellow';
    } else {
        li.style.backgroundColor = 'red';
    }

    lista.appendChild(li);

    // Adicionar ao histórico
    const liHistorico = document.createElement('li');
    liHistorico.textContent = `${item} - Vencimento em: ${validade.toLocaleDateString()}`;
    historico.appendChild(liHistorico);
}

function adicionarItemLista() {
    const itemInput = document.getElementById('itemInput');
    const listaCompras = document.getElementById('listaCompras');

    const item = itemInput.value.trim(); // Remove espaços em branco

    if (!item) {
        alert('Por favor, preencha o nome do item!');
        return;
    }

    const li = document.createElement('li');
    li.textContent = item;

    // Adicionando evento de clique para riscar o item
    li.onclick = function() {
        if (li.style.textDecoration === "line-through") {
            li.style.textDecoration = "none";  // Remove o riscado
        } else {
            li.style.textDecoration = "line-through";  // Aplica o riscado
        }
    };

    listaCompras.appendChild(li);

    // Limpar o campo de entrada
    itemInput.value = '';
}
