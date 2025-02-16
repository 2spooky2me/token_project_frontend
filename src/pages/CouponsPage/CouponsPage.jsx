import styles from './CouponsPage.module.css';
import React, {useEffect, useState} from 'react';

const CouponsPage = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log('Token from localStorage:', token);

                const response = await fetch('http://localhost:8081/api/customer/all/purchased', {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch coupons');
                }

                const data = await response.json();
                setCoupons(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCoupons().catch(err => console.error("Failed to fetch coupons: ", err));
    }, []);

    const handleCouponClick = (coupon) => {
        setSelectedCoupon(coupon);
        setIsPopupVisible(true);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.couponsPage}>
            <h2 className={styles.title}>My Coupons</h2>
            {coupons.length === 0 ? (
                <p>You have no coupons.</p>
            ) : (
                <ul className={styles.couponList}>
                    {coupons.map(coupon => (
                        <li key={coupon.id} onClick={() => handleCouponClick(coupon)}
                            className={styles.couponItem}>
                            <img src={coupon.image} alt={coupon.title}
                                 className={styles.couponImage}/>
                            <div className={styles.couponContent}>
                                <h3 className={styles.couponTitle}>{coupon.title}</h3>
                                <p className={styles.couponDescription}>{coupon.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {isPopupVisible && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <img src={selectedCoupon.image} alt={selectedCoupon.title}
                             className={styles.couponImage}/>
                        <h3 className={styles.couponTitle}>{selectedCoupon.title}</h3>
                        <p className={styles.couponDescription}>{selectedCoupon.description}</p>
                        <p className={styles.couponPrice}>Coupon Price:
                            ${selectedCoupon.price}</p>
                        <button className={styles.closeButton}
                                onClick={() => setIsPopupVisible(false)}>Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CouponsPage;