document.getElementById('sort').addEventListener('change', function() {
    const sortValue = this.value;
    const productItems = document.querySelectorAll('.ListProduct .item');
    const productArray = Array.from(productItems);
    
    productArray.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.price').innerText.replace('$', ''));
        const priceB = parseFloat(b.querySelector('.price').innerText.replace('$', ''));
        const nameA = a.querySelector('h2').innerText.toLowerCase();
        const nameB = b.querySelector('h2').innerText.toLowerCase();

        switch(sortValue) {
            case 'price-asc':
                return priceA - priceB;
            case 'price-desc':
                return priceB - priceA;
            case 'name-asc':
                return nameA.localeCompare(nameB);
            case 'name-desc':
                return nameB.localeCompare(nameA);
        }
    });

    const container = document.querySelector('.ListProduct');
    productArray.forEach(item => container.appendChild(item));
});
