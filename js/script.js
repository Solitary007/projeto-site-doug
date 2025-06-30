// Toggle sidebar visibility
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  sidebar.classList.toggle('show');
  overlay.classList.toggle('show');
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

// Filtro de produtos pelo nome da categoria
document.querySelectorAll('[data-filter]').forEach(item => {
  item.addEventListener('click', function(e) {
    e.preventDefault();
    const categoria = this.getAttribute('data-filter');
    // Troca o título
    const titulo = document.getElementById('titulo-destaques');
    if (categoria === 'Todos') {
      titulo.textContent = 'Destaques';
    } else {
      titulo.textContent = categoria;
    }
    // Filtra os produtos normalmente
    document.querySelectorAll('.produto').forEach(produto => {
      if (categoria === 'Todos' || produto.getAttribute('data-categoria') === categoria) {
        produto.style.display = '';
      } else {
        produto.style.display = 'none';
      }
    });
  });
});

// Open product modal
function openModal(imgs, name, price, installments = '1x', description = '', quantity = 1) {
  if (!Array.isArray(imgs)) imgs = [imgs];
  let current = 0;

  // Centralize aqui o número e a mensagem padrão
  const whatsappNumber = '5545999432624'; // Número de WhatsApp
  const whatsappMsg = encodeURIComponent(`Olá, queria falar sobre o produto "${name}"`); 
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  const modal = document.getElementById('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn" onclick="closeModal()">&times;</span>
      <div class="carousel">
        <span class="carousel-arrow left">&#10094;</span>
        <img src="${imgs[0]}" alt="${name}" class="carousel-img">
        <span class="carousel-arrow right">&#10095;</span>
      </div>
      <div class="carousel-dots">
        ${imgs.map((_, i) => `<span class="dot${i === 0 ? ' active' : ''}"></span>`).join('')}
      </div>
      <div class="modal-info">
        <h3>${name}</h3>
        <p class="price">${price}</p>
        <p class="installments">Ou em até ${installments} sem juros</p>
        ${description ? `<p><strong>Detalhes:</strong> ${description.replace(/\n/g, '<br>')}</p>` : ''}
        <a href="${whatsappLink}" target="_blank" class="whatsapp-btn">Chamar no Whatsapp</a>
      </div>
    </div>
  `;
  modal.style.display = 'flex';

  // Carrossel JS
  const imgEl = modal.querySelector('.carousel-img');
  const dots = modal.querySelectorAll('.dot');
  modal.querySelector('.carousel-arrow.left').onclick = () => {
    current = (current - 1 + imgs.length) % imgs.length;
    imgEl.src = imgs[current];
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  };
  modal.querySelector('.carousel-arrow.right').onclick = () => {
    current = (current + 1) % imgs.length;
    imgEl.src = imgs[current];
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  };
  dots.forEach((dot, i) => {
    dot.onclick = () => {
      current = i;
      imgEl.src = imgs[current];
      dots.forEach((d, j) => d.classList.toggle('active', j === current));
    };
  });

  // Swipe para mobile
  let startX = 0;
  const carouselImg = modal.querySelector('.carousel-img');
  carouselImg.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
  });
  carouselImg.addEventListener('touchend', function(e) {
    const endX = e.changedTouches[0].clientX;
    if (endX < startX - 30) {
      // Swipe para esquerda (próxima imagem)
      current = (current + 1) % imgs.length;
      imgEl.src = imgs[current];
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    } else if (endX > startX + 30) {
      // Swipe para direita (imagem anterior)
      current = (current - 1 + imgs.length) % imgs.length;
      imgEl.src = imgs[current];
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }
  });

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

function abrirModal(nome, valor, detalhes) {
  document.getElementById('modalNome').innerText = nome;
  document.getElementById('modalValor').innerText = valor;
  document.getElementById('modalDetalhes').innerText = detalhes;
  document.getElementById('modal').style.display = 'flex';
}

function fecharModal() {
  document.getElementById('modal').style.display = 'none';
}

// Fecha o modal ao clicar fora do conteúdo
window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    fecharModal();
  }
}

document.querySelectorAll('.produto').forEach(produto => {
  produto.addEventListener('click', function(e) {
    if (e.target.classList.contains('whatsapp-btn')) return;

    const imgs = this.getAttribute('data-imgs')
      ? this.getAttribute('data-imgs').split(',').map(img => img.trim())
      : [this.getAttribute('data-img')];
    const nome = this.getAttribute('data-nome');
    const preco = this.getAttribute('data-preco');
    const descricao = this.getAttribute('data-descricao');
    openModal(imgs, nome, preco, '1x', descricao, 1);
  });
});

document.querySelectorAll('.menu-toggle').forEach(toggle => {
  toggle.addEventListener('click', function(e) {
    e.stopPropagation();
    const li = this.parentElement;
    const parentUl = li.parentElement;

    // Fecha todos os outros abertos no mesmo nível
    Array.from(parentUl.children).forEach(sibling => {
      if (sibling !== li) sibling.classList.remove('open');
    });

    // Alterna o submenu do item clicado
    li.classList.toggle('open');
  });
});
