<script>
    const menuButton = document.querySelector('.menu-button');
    const menuProdutos = document.querySelector('.menu-produtos');

    menuButton.addEventListener('click', () => {
        menuProdutos.classList.toggle('open');
    });
</script>
