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

// Selecionar ou desmarcar múltiplas fotos dentro de um popup específico (popup3, popup6, etc.)
document.querySelectorAll('.popup .photo').forEach(photo => {
    photo.addEventListener('click', () => {
        // Alternar a classe 'selected' quando a imagem for clicada
        photo.classList.toggle('selected');

        // Verificar se há fotos selecionadas e habilitar o botão
        enableWhatsappButton(photo);
    });
});

// Função para verificar se há fotos selecionadas e habilitar o botão do WhatsApp
function enableWhatsappButton(photo) {
    // Encontrar o popup que contém a foto clicada
    const popup = photo.closest('.popup');
    
    // Verificar todas as fotos selecionadas dentro do popup específico
    const selectedPhotos = popup.querySelectorAll('.photo.selected');
    const whatsappBtn = popup.querySelector('.whatsapp-btn');

    // Se houver fotos selecionadas, habilita o botão, caso contrário, desabilita
    if (selectedPhotos.length > 0) {
        whatsappBtn.disabled = false;
    } else {
        whatsappBtn.disabled = true;
    }
}

/// Enviar todas as fotos selecionadas para o WhatsApp em um único link
document.querySelectorAll('.whatsapp-btn').forEach(whatsappBtn => {
    whatsappBtn.addEventListener('click', (event) => {
        const popup = event.target.closest('.popup');
        const selectedPhotos = popup.querySelectorAll('.photo.selected');
        const photoUrls = Array.from(selectedPhotos).map(photo => photo.src); // Obtém as URLs das imagens selecionadas
        
        // Criar uma mensagem com as URLs de cada foto separadas por uma linha em branco
        const message = "Aqui estão as fotos selecionadas:\n" + photoUrls.join('📸');

        // Criar o link do WhatsApp com a mensagem
        const whatsappLink = `https://api.whatsapp.com/send/?phone=5581984017916&type=phone_number&app_absent=0&text=${encodeURIComponent(message)}`;

        // Redireciona o usuário para o WhatsApp com o link gerado
        window.open(whatsappLink, '_blank');
    });
});



