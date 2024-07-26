let productList = [];
let carrito = [];
let total = 0;

function add(productId, price) {
    const product = productList.find(p => p.id === productId);
    if (product && product.stock > 0) {
        product.stock--;
        carrito.push({ id: productId, price: price });
        total += price;
        console.log(`Product ID: ${productId}, Price: ${price}`);
        document.getElementById("checkout").innerHTML = `Pagar $${total}`;
        displayProducts();
    } else {
        console.error('Producto sin stock');
    }
}

async function pay() {
    try {
        const response = await fetch("/api/pay", {
            method: "POST",
            body: JSON.stringify(carrito.map(item => item.id)),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error('Error en el pago');
        }

        const updatedProductList = await response.json();
        productList = updatedProductList;
        window.alert('Pago realizado con éxito');
        carrito = [];
        total = 0;
        document.getElementById("checkout").innerHTML = `Pagar $${total}`;
        displayProducts();
    } catch (error) {
        window.alert('Error en el pago: ' + error.message);
    }
}

function displayProducts() {
    let productsHTML = '';
    productList.forEach(p => {
        let buttonHTML = `<button class="button-add" onclick="add(${p.id}, ${p.price})">Agregar</button>`;

        if(p.stock <=0) {
            buttonHTML = `<button disabled class="button-add disabled" onclick="add(${p.id}, ${p.price})">Sin Stock</button>`; 
        }

        productsHTML += `
            <div class="product-container">
                <h3>${p.name}</h3>
                <img src="${p.image}" />
                <h1>$${p.price}</h1>
                ${buttonHTML}
            </div>
        `;
    });
    document.getElementById('page-content').innerHTML = productsHTML;
}


async function fetchProducts() {
    try {
        const response = await fetch("/api/products");
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        productList = await response.json();
        displayProducts();
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

window.onload = async() => {
    await fetchProducts();
}
