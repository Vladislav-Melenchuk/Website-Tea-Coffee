import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductModal from "./ProductModal";
import { addItem } from "../components/cart";
import "../css/Catalog.css";

const priceFilters = ["до 150", "150–300", "понад 300"];

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Всі");
    const [selectedPrice, setSelectedPrice] = useState("Всі");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [addedHint, setAddedHint] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5214/api/products")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Помилка при завантаженні товарів:", err));
    }, []);

    const categories = useMemo(
        () => Array.from(new Set(products.map(p => p.category))),
        [products]
    );

    const fitByPrice = (p) => {
        if (selectedPrice === "Всі") return true;
        if (selectedPrice === "до 150") return p.price <= 150;
        if (selectedPrice === "150–300") return p.price > 150 && p.price <= 300;
        if (selectedPrice === "понад 300") return p.price > 300;
        return true;
    };

    const filtered = products
        .filter(p => selectedCategory === "Всі" || p.category === selectedCategory)
        .filter(fitByPrice);

    const handleAddToCart = (product) => {
        addItem(product, 1);
        setAddedHint(product.id);
        setTimeout(() => setAddedHint(null), 900);
    };

    return (
        <div className="catalog-wrapper dark">
            <div className="catalog-container">
                {/* ФИЛЬТРЫ */}
                <aside className="filter-panel dark">
                    <h3>Категорія</h3>
                    <ul>
                        {["Всі", ...categories].map(category => (
                            <li
                                key={category}
                                className={category === selectedCategory ? "active" : ""}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>

                    <h3>Ціна</h3>
                    <ul>
                        {["Всі", ...priceFilters].map(price => (
                            <li
                                key={price}
                                className={price === selectedPrice ? "active" : ""}
                                onClick={() => setSelectedPrice(price)}
                            >
                                {price}
                            </li>
                        ))}
                    </ul>
                </aside>


                <div className="products-grid">
                    {filtered.length ? (
                        filtered.map(product => (
                            <motion.div
                                className="product-card dark"
                                key={product.id}
                                whileHover={{ y: -4 }}
                                onClick={() => setSelectedProduct(product)}
                            >
                                <div className="thumb">
                                    <img src={product.imageUrl} alt={product.title} />
                                </div>

                                <h4>{product.title}</h4>
                                <p className="desc">{product.description}</p>

                                <div className="product-footer">
                                    <span className="price">{product.price} грн</span>
                                    <button
                                        className="add-to-cart"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToCart(product);
                                        }}
                                    >
                                        У кошик
                                    </button>
                                </div>

                                <AnimatePresence>
                                    {addedHint === product.id && (
                                        <motion.div
                                            className="added-hint"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                        >
                                            ✓ Додано
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    ) : (
                        <p className="no-products">Товари не знайдено</p>
                    )}
                </div>
            </div>


            <AnimatePresence>
                {selectedProduct && (
                    <ProductModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                        onAddToCart={handleAddToCart}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Catalog;
