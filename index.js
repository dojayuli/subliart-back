const express = require('express');
const bodyParser = require("body-parser")
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

 app.use(express.json());

let products = [
    {
        id: 1,
        name: "Taza BMW",
        price: 8000,
        image: "/images/product-1.jpg",
        stock: 6,
    },
    {
        id: 2,
        name: "Remera Nasa",
        price: 13000,
        image: "/images/product-2.jpg",
        stock: 6,
    },
    {
        id: 3,
        name: "Taza Github",
        price: 8000,
        image: "/images/product-3.jpg",
        stock: 6,
    },
    {
        id: 4,
        name: "Taza Wacky R",
        price: 8000,
        image: "/images/product-4.jpg",
        stock: 6,
    },
    {
        id: 5,
        name: "Remera Honda",
        price: 13000,
        image: "/images/product-5.jpg",
        stock: 6,
    },
    {
        id: 6,
        name: "Taza Toyota",
        price: 8000,
        image: "/images/product-6.jpg",
        stock: 6,
    },
];

app.get('/api/products', (req, res) => {
  res.send(products);
});

app.post('/api/pay', (req, res) => {
    const ids = req.body;
    const productsCopy = products.map((p) => ({ ...p }));
    try {
        ids.forEach(id => {
            const product = productsCopy.find(p => p.id === id);
            if (product && product.stock > 0) {
                product.stock--;
            } else {
                throw new Error("sin stock");
            }
        });
        products = productsCopy;
        res.send(products);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.use("/", express.static('public'));

app.listen(port, () => {
    console.log(`Example app listening on port at http://localhost:${port}`);
});