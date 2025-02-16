import React, {useEffect, useState} from 'react';
import styles from './Store.module.css';

const StorePage = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUnpurchasedCoupons = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Authentication token not found. Please log in again.');
                }

                const response = await fetch('http://localhost:8081/api/customer/all/not-purchased', {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        throw new Error('Authentication failed. Please log in again.');
                    }
                    throw new Error('Failed to fetch available coupons');
                }

                const data = await response.json();
                setCoupons(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUnpurchasedCoupons().catch(err => console.error("Failed to fetch available coupons: ", err));
    }, []);


    const handlePurchase = async (couponUuid) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication token not found. Please log in again.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8081/api/customer/purchase/${couponUuid}`, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to purchase coupon. Please try again.');
            }

            setCoupons(coupons => coupons.filter(coupon => coupon.uuid !== couponUuid));
        } catch (err) {
            console.error("Error purchasing coupon:", err);
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.store}>
            <h2 className={styles.title}>Available Coupons</h2>
            {coupons.length === 0 ? (
                <p>No available coupons. Check back later!</p>
            ) : (
                <ul className={styles.couponList}>
                    {coupons.map(coupon => (
                        <li key={coupon.id} className={styles.couponItem}>
                            <img src={coupon.image} alt={coupon.title}
                                 className={styles.couponImage}/>
                            <div className={styles.couponContent}>
                                <h3 className={styles.couponTitle}>{coupon.title}</h3>
                                <p className={styles.couponDescription}>{coupon.description}</p>
                                <p className={styles.couponPrice}>Price:
                                    ${coupon.price.toFixed(2)}</p>

                                <button className={styles.purchaseButton}
                                        onClick={() => handlePurchase(coupon.uuid)}>Purchase
                                </button>
                            </div>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default StorePage;