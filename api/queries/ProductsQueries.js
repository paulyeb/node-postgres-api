const getProducts = "SELECT * FROM products";

const getProduct = "SELECT * FROM products WHERE id = $1";

const addProduct = "INSERT into products (name, price) VALUES ($1, $2)";

const deleleProduct = "DELETE from products WHERE id = $1";

const updateProduct = "UPDATE products SET name = $1 WHERE id = $2";

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    deleleProduct,
    updateProduct
}