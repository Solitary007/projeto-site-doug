// Toggle sidebar visibility
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('show');
}

// Close sidebar when clicking outside
window.addEventListener('click', e => {
  if (!e.target.closest('.sidebar') && !e.target.closest('.nav-trigger') && !e.target.closest('.sidebar-trigger')) {
    document.getElementById('sidebar').classList.remove('show');
  }
});

// Search filter
document.getElementById('searchInput').addEventListener('input', function() {
  const termo = this.value.toLowerCase();
  document.querySelectorAll('.produto').forEach(p => {
    p.style.display = p.querySelector('h3').textContent.toLowerCase().includes(termo) ? '' : 'none';
  });
});

// Open product modal
function openModal(img, name, price, installments = '1x', description = '', quantity = 1) {
  const modal = document.getElementById('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn" onclick="closeModal()">&times;</span>
      <img src="${img}" alt="${name}">
      <div class="modal-info">
        <h3>${name}</h3>
        <p class="price">${price}</p>
        <p class="installments">Ou em até ${installments} sem juros</p>
        ${description ? `<p><strong>Descrição:</strong> ${description}</p>` : ''}
        <p><strong>Quantidade:</strong> ${quantity}</p>
        <button class="add-cart-btn" onclick="addToCart('${name}','${price}')">Adicionar ao Carrinho</button>
      </div>
    </div>
  `;
  modal.style.display = 'flex';
  modal.addEventListener('click', evt => { if (evt.target === modal) closeModal(); }, { once: true });
}

// Close product modal
function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  modal.innerHTML = '';
}

// Add to cart alert
function addToCart(name, price) {
  alert(`Adicionado ao carrinho:\nProduto: ${name}\nPreço: ${price}`);
}
