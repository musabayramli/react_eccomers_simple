import React, { useState } from 'react';
import '../css/Product.css';
import { useNavigate } from 'react-router-dom';

function Product({ product }) {
    const { id, price, image, title, description } = product;
    const [showScroll, setShowScroll] = useState(false);

    const navigate = useNavigate();

    const toggleTitle = () => {
        setShowScroll(prev => !prev);
    };

    return (
        <div className='card'>
            <img className='image' src={image} alt="" />

            <div style={{ textAlign: 'center'}}>
                <div className={`title ${showScroll ? 'scrollable-title' : ''}`}>
                    <p style={{ margin: 0 }}>{title}</p>
                </div>

                {title.length > 50 && (
                    <span
                        onClick={toggleTitle}
                        style={{
                            color: 'blue',
                            cursor: 'pointer',
                            fontSize: '14px',
                            display: 'inline-block',
                            marginBottom: '5px'
                        }}
                    >
                        {showScroll ? 'Daha az' : 'Daha çox'}
                    </span>
                )}

                <h3>{price}$</h3>
            </div>

            <div className='flex-row'>
                <button onClick={() => navigate("/product-details/" + id)} className='detail-button'>Detail</button>
            </div>
        </div>
    );
}

export default Product;
