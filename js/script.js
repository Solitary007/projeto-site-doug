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

// Função para filtrar produtos por categoria
function filtrarProdutos(categoria) {
  document.querySelectorAll('.produto').forEach(function(produto) {
    const categorias = produto.getAttribute('data-categoria').split(',').map(c => c.trim());
    if (categoria === 'Todos' || categorias.includes(categoria)) {
      produto.style.display = '';
    } else {
      produto.style.display = 'none';
    }
  });
}

// Adiciona evento aos itens do menu lateral
document.querySelectorAll('.sidebar [data-filter]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const categoria = this.getAttribute('data-filter');
    filtrarProdutos(categoria);
    // Fechar sidebar se necessário
    toggleSidebar();
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
        ${description ? `<p>${description.replace(/\n/g, '<br>')}</p>` : ''}
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

// Função para filtrar produtos por categoria
function filtrarProdutos(categoria) {
  document.querySelectorAll('.produto').forEach(function(produto) {
    const categorias = produto.getAttribute('data-categoria').split(',').map(c => c.trim());
    if (categoria === 'Todos' || categorias.includes(categoria)) {
      produto.style.display = '';
    } else {
      produto.style.display = 'none';
    }
  });
}

// Função para renderizar produtos dinamicamente
function renderizarProdutos(produtosData) {
  const container = document.querySelector('.produtos');
  if (!container) return;
  container.innerHTML = '';
  produtosData.forEach(produto => {
    const el = document.createElement('div');
    el.className = 'produto';
    el.setAttribute('data-nome', produto.nome);
    el.setAttribute('data-preco', produto.preco);
    el.setAttribute('data-descricao', produto.descricao);
    el.setAttribute('data-categoria', produto.categorias.join(','));
    el.setAttribute('data-imgs', produto.imgs.join(','));
    el.innerHTML = `
      <img src="${produto.imgs[0]}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p class="price">${produto.preco}</p>
      <a target="_blank" class="whatsapp-btn" href="https://wa.me/5545999432624?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20o%20${encodeURIComponent(produto.nome)}">Chamar no Whatsapp</a>
    `;
    container.appendChild(el);
  });
}

// Função para inicializar eventos nos produtos após renderização dinâmica
function inicializarEventosProdutos() {
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
}

// Banner central com fade suave
let slideAtual = 0;
const slides = document.querySelectorAll('.banner-slide');
const dots = document.querySelectorAll('.carousel-dots .dot');
let intervaloBanner = null;

function mostrarSlide(n) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === n);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === n);
  });
  slideAtual = n;
}

function mudarSlide(delta) {
  let novo = slideAtual + delta;
  if (novo < 0) novo = slides.length - 1;
  if (novo >= slides.length) novo = 0;
  mostrarSlide(novo);
  reiniciarIntervalo();
}

function irParaSlide(n) {
  mostrarSlide(n);
  reiniciarIntervalo();
}

function proximoSlideAuto() {
  mudarSlide(1);
}

function reiniciarIntervalo() {
  if (intervaloBanner) clearInterval(intervaloBanner);
  intervaloBanner = setInterval(proximoSlideAuto, 4000);
}

document.addEventListener('DOMContentLoaded', function() {
  // Carrega produtos do JSON e inicializa eventos após renderização
  fetch('data/produtos.json')
    .then(res => res.json())
    .then(produtosData => {
      renderizarProdutos(produtosData);
      inicializarEventosProdutos();
    });

  // Inicializa slides
  if (slides.length > 0) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === 0);
    });
    reiniciarIntervalo();
  }
  // Adiciona eventos nos dots se necessário
  if (dots.length > 0) {
    dots.forEach((dot, i) => {
      dot.onclick = () => irParaSlide(i);
    });
  }
  if (typeof inicializarEventosProdutos === 'function') {
    inicializarEventosProdutos();
  }
});