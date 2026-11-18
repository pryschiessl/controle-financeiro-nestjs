const moeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

async function carregarResumo() {
  try {
    const resposta = await fetch('/transacoes');

    if (!resposta.ok) {
      throw new Error('Erro ao consultar transações');
    }

    const dados = await resposta.json();
    const metricas = dados.metricas;
    const historico = dados.historico;

    document.getElementById('saldoTotal').textContent = moeda.format(
      metricas.saldoTotal,
    );
      document.getElementById('totalDespesas').textContent = moeda.format(
      metricas.totalDespesas
    );
    document.getElementById('totalGastoImpulso').textContent = moeda.format(
      metricas.totalGastoImpulso,
    );

    const lista = document.getElementById('listaTransacoes');
    lista.innerHTML = '';

    historico.forEach((transacao) => {
      const item = document.createElement('li');

      const descricao = document.createElement('strong');
      descricao.textContent = transacao.descricao;

      const detalhes = document.createElement('span');
      detalhes.textContent = ` — ${transacao.tipo} | ${transacao.categoria} | ${moeda.format(transacao.valor)}`;

      item.append(descricao, detalhes);
      lista.appendChild(item);
    });

    if (historico.length === 0) {
      const item = document.createElement('li');
      item.textContent = 'Nenhuma transação cadastrada.';
      lista.appendChild(item);
    }
  } catch (erro) {
    console.error('Erro ao carregar resumo:', erro);
  }
}

carregarResumo();
const formulario = document.getElementById('formTransacao');
const mensagem = document.getElementById('mensagemFormulario');

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const transacao = {
    descricao: document.getElementById('descricao').value.trim(),
    valor: Number(document.getElementById('valor').value),
    tipo: document.getElementById('tipo').value,
    categoria: document.getElementById('categoria').value.trim(),
    consumoConsciente: document.getElementById('consumoConsciente').checked,
  };

  try {
    const resposta = await fetch('/transacoes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transacao),
    });

    if (!resposta.ok) {
      throw new Error('Não foi possível salvar a transação');
    }

    mensagem.textContent = 'Transação salva com sucesso!';
    formulario.reset();
    await carregarResumo();
  } catch (erro) {
    mensagem.textContent = 'Erro ao salvar transação.';
    console.error(erro);
  }
});
