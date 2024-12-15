const cards = document.querySelectorAll('.card');
const popups = document.querySelectorAll('.popup'); // Todos os popups
const closeButtons = document.querySelectorAll('.close-button'); // Todos os botões de fechar

// Função para abrir o popup da galeria específica
function expandirCard(cardId) {
    // Fechar todos os popups primeiro
    popups.forEach(popup => popup.style.display = 'none');

    // Exibir o popup correspondente
    const popup = document.getElementById(`popup${cardId}`);
    popup.style.display = 'flex';
}

// Adicionar evento de click para abrir o popup
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        expandirCard(index + 1); // Passa o número do card para abrir a galeria
    });
});

// Adicionar evento de click nos botões de fechar
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        popup.style.display = 'none';
    });
});

// Fechar o popup se clicar fora dele
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
        e.target.style.display = 'none';
    }
});
