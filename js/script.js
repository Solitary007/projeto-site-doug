function toggleMenu() {
  const menu = document.getElementById('dropdownMenu');
  menu.classList.toggle('show');
}

window.onclick = function(event) {
  if (!event.target.matches('.menu-toggle') &&
      !event.target.closest('.header-icons div') &&
      !event.target.closest('.dropdown-menu')) {
    const dropdowns = document.getElementsByClassName("dropdown-menu");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', function() {
  const filter = this.value.toLowerCase();
  const products = document.querySelectorAll('.produto');
  products.forEach(product => {
    const title = product.querySelector('h3').textContent.toLowerCase();
    if (title.includes(filter)) {
      product.style.display = '';
    } else {
      product.style.display = 'none';
    }
  });
});

function openModal(img, name, price, installments, description, quantity) {
    const modal = document.getElementById('modal');

    // Montar o HTML do modal
    modal.innerHTML = `
    <span class="close" onclick="closeModal()">&times;</span>
    <div class="modal-content">
      <img src="${img}" alt="${name}">
      <div class="modal-info">
        <div
          <h3>${name}</h3
          <p class="price">${price}</p>
          <p class="installments">Ou em até ${installments}x sem juros</p>
        </div>
        <p><strong>Descrição:</strong> ${description}</p>
        <p><strong>Quantidade de itens:</strong> ${quantity}</p>
        <button class="add-cart-btn" onclick="addToCart('${name}', '${price}')">Adicionar ao Carrinho</button>
      </div>
    </div>
  `;

    
    modal.style.display = "flex";

    modal.addEventListener('click', function(event) {
        // Se clicar no fundo (modal), fecha
        if (event.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = "none";
  modal.innerHTML = ''; // limpa conteúdo ao fechar
}

function addToCart(name, price) {
  alert(`Adicionado ao carrinho:\nProduto: ${name}\nPreço: ${price}`);
  // Aqui você pode implementar a lógica real de adicionar ao carrinho
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('sidebar-open');
  // Fecha ao clicar fora
  if (sidebar.classList.contains('sidebar-open')) {
    setTimeout(() => {
      document.addEventListener('click', closeSidebarOnClickOutside, true);
    }, 10);
  } else {
    document.removeEventListener('click', closeSidebarOnClickOutside, true);
  }
}

function closeSidebarOnClickOutside(e) {
  const sidebar = document.getElementById('sidebar');
  const toggles = document.querySelectorAll('.sidebar-toggle');
  let isToggle = false;
  toggles.forEach(btn => {
    if (btn.contains(e.target)) isToggle = true;
  });
  if (!sidebar.contains(e.target) && !isToggle) {
    sidebar.classList.remove('sidebar-open');
    document.removeEventListener('click', closeSidebarOnClickOutside, true);
  }
}
