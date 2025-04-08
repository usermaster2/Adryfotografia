// Para abrir o popup ao clicar em um card
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        const cardId = card.getAttribute('data-id'); // Obtém o ID correto do cartão
        const popup = document.querySelector(`#popup${cardId}`); // Seleciona o popup correspondente

        if (popup) {
            // Fecha todos os popups
            document.querySelectorAll('.popup').forEach(p => p.style.display = 'none');
            // Exibe o popup correto
            popup.style.display = 'flex';
        }
    });
});

// Fechar popups ao clicar no botão de fechar
document.querySelectorAll('.close-button').forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup'); // Encontra o popup associado ao botão
        if (popup) {
            popup.style.display = 'none'; // Fecha o popup
        }
    });
});

// Fechar popup ao clicar fora dele (na área externa)
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
        e.target.style.display = 'none'; // Fecha o popup se clicar fora
    }
});

// Esta função atualiza o botão e o contador de fotos selecionadas
function enableWhatsappButton(photo) {
    const popup = photo.closest('.popup'); // Encontra o popup onde a foto foi clicada

    // Busca todas as imagens com a classe 'selected' (selecionadas)
    const selectedPhotos = popup.querySelectorAll('.photo.selected');

    // Busca o botão de download e o contador dentro do popup
    const whatsappBtn = popup.querySelector('.whatsapp-btn');
    const contador = popup.querySelector('.contador-fotos');

    const total = selectedPhotos.length; // Quantidade de imagens selecionadas

    // Atualiza o texto do botão com a quantidade
    if (whatsappBtn) {
        whatsappBtn.textContent = `Baixar selecionadas (${total})`;
        whatsappBtn.disabled = total === 0; // Habilita ou desabilita o botão
    }

    // Atualiza o contador com o texto correto (singular/plural)
    if (contador) {
        contador.textContent = `${total} foto${total === 1 ? '' : 's'} selecionada${total === 1 ? '' : 's'}`;
    }
}

// Quando o DOM estiver totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
    // Adiciona evento de clique em todas as imagens
    document.querySelectorAll('.popup .photo').forEach(photo => {
        photo.addEventListener('click', () => {
            photo.classList.toggle('selected'); // Alterna a seleção (adiciona ou remove a classe)
            enableWhatsappButton(photo); // Atualiza o botão e contador
        });
    });

    // Adiciona evento ao botão de baixar imagens
    document.querySelectorAll('.whatsapp-btn').forEach(btn => {
        btn.textContent = 'Baixar selecionadas (0)'; // Texto inicial
        btn.disabled = true; // Começa desabilitado

        btn.addEventListener('click', (event) => {
            const popup = event.target.closest('.popup'); // Encontra o popup correto
            const selectedPhotos = popup.querySelectorAll('.photo.selected'); // Pega as fotos selecionadas

            if (selectedPhotos.length === 0) {
                alert("Nenhuma foto selecionada.");
                return;
            }

            // Para cada imagem selecionada, cria um link e aciona o download
            selectedPhotos.forEach(photo => {
                const link = document.createElement('a');
                link.href = photo.src; // Caminho da imagem
                link.download = decodeURIComponent(photo.src.split('/').pop()); // Nome do arquivo
                document.body.appendChild(link);
                link.click(); // Inicia o download
                document.body.removeChild(link); // Limpa o link depois
            });
        });
    });
});





