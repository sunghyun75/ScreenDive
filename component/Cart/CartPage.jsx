import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './CartPage.module.css';
import Link from 'next/link';

export default function CartPage() {
	const handlerRemove = async id => {
		const { data } = await axios.delete('/api/cart', {
			data: { id },
		});
		console.log(data);
		alert(data.message);
		setCart(data.cart);
	};
	const [cart, setCart] = useState([]);

	useEffect(() => {
		const fetchCart = async () => {
			const res = await axios.get('/api/cart');
			setCart(res.data);
		};
		fetchCart();
	}, []);

	return (
		<div className={styles.container}>
			{cart.length === 0 ? (
				<p className={styles.empty}>즐겨찾기 영화가 없습니다.</p>
			) : (
				cart.map(movie => (
					<div key={movie.id} className={styles.card}>
						<h2>{movie.title}</h2>
						<Link href={`/MovieDetail/${movie.id}`}>
							<div className={styles.ImageBox}>
								<Image
									src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
									alt={movie.title}
									fill
									className={styles.image}
								/>
							</div>
						</Link>
						<button onClick={() => handlerRemove(movie.id)}>삭제</button>
					</div>
				))
			)}
		</div>
	);
}
