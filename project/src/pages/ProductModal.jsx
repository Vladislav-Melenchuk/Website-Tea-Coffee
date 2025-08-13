import React from "react";
import { motion } from "framer-motion";
import { addItem } from "../components/cart";
import "../css/ProductModal.css";

const ProductModal = ({ product, onClose, onAddToCart }) => {
    const addAndClose = () => {
        addItem(product, 1);
        onAddToCart?.(product);
        onClose();
    };

    return (
        <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="product-modal"
                initial={{ scale: 0.96, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 10 }}
                transition={{ duration: 0.22 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close" onClick={onClose}>✕</button>

                <div className="modal-body">
                    <div className="modal-img">
                        <img src={product.imageUrl} alt={product.title} />
                    </div>

                    <div className="modal-info">
                        <h2>{product.title}</h2>
                        <p className="desc">{product.description}</p>

                        <div className="modal-footer">
                            <span className="price">{product.price} грн</span>
                            <button className="btn-primary" onClick={addAndClose}>
                                У кошик
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProductModal;
