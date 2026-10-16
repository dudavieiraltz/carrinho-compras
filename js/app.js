let totalGeral = 0;

function adicionar() {
    // Recuperar o texto do produto selecionado
    let produto = document.getElementById('produto').value;
    let nomeProduto = produto.split('-')[0].trim();
    let valorUnitario = Number(
        produto.split('R$')[1].trim().replace(',', '.')
    );

    // Recuperar a quantidade como número
    let quantidade = Number(
        document.getElementById('quantidade').value
    );

    // Validar a quantidade
    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        alert('Informe uma quantidade inteira maior que zero.');
        return;
    }

    // Calcular o subtotal
    let preco = quantidade * valorUnitario;

    // Adicionar o produto ao carrinho
    let carrinho = document.getElementById('lista-produtos');

    let item = document.createElement('section');
    item.className = 'carrinho__produtos__produto';

    let quantidadeItem = document.createElement('span');
    quantidadeItem.className = 'texto-azul';
    quantidadeItem.textContent = `${quantidade}x`;

    let precoItem = document.createElement('span');
    precoItem.className = 'texto-azul';
    precoItem.textContent = formatarMoeda(preco);

    item.append(quantidadeItem, ` ${nomeProduto} `, precoItem);
    carrinho.appendChild(item);

    // Atualizar o total
    totalGeral += preco;
    document.getElementById('valor-total').textContent =
        formatarMoeda(totalGeral);

    // Zerar o campo de quantidade
    document.getElementById('quantidade').value = 0;
}

function limpar() {
    totalGeral = 0;
    document.getElementById('lista-produtos').innerHTML = '';
    document.getElementById('valor-total').textContent =
        formatarMoeda(totalGeral);
    document.getElementById('quantidade').value = 0;
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Limpar o carrinho inicial após o HTML estar pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', limpar);
} else {
    limpar();
}