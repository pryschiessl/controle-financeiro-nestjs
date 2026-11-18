


const moeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

async function carregarResumo() {
  try {
    const resposta = await fetch('/transacoes');

    if (!resposta.ok) {
      throw new Error('Erro ao consultar transações');
    }

    const dados = await resposta.json();

    document.getElementById('saldoTotal').textContent =
      moeda.format(dados.saldoTotal);

    document.getElementById('totalDespesas').textContent =
      moeda.format(dados.totalDespesas);

    document.getElementById('totalGastoImpulso').textContent =
      moeda.format(dados.totalGastoImpulso);

  } catch (erro) {
    console.error('Erro ao carregar resumo:', erro);
  }
}

carregarResumo();

