import Image from 'next/image';
import React, { useEffect } from 'react';
import styles from '@/component/MovieDetail/MoiveDetail.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function MovieDetail({ movie }) {
	const route = useRouter();
	const handlerAddCart = async () => {
		try {
			const response = await axios.post('/api/cart', movie);
			console.log(response.data);
			alert(`${movie.title}이 즐겨찾기에 담겼습니다.`);
			route.push('/cart');
		} catch (error) {
			console.error(error);
			alert('즐겨찾기 저장에 실패했습니다.');
		}
	};
	return (
		// Image 반응형 하는 법
		// Image를 감싸는 div에 styles를 만들고 css에 position: relative;, width, height 속성값 주기
		// 그리고 Image에 className 또 만들고 속성값으로 크기 조절. 그 후 @media로 조정
		<div className={styles.container}>
			<div>
				<h1>{movie.title}</h1>
				<div className={styles.imageBox}>
					<Image
						src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
						alt={movie.title}
						fill
						className={styles.image}
					/>
				</div>
				<p>개봉일: {movie.release_date}</p>
				<p>{movie.overview}</p>
				<p>{movie.videos}</p>
				<button onClick={handlerAddCart}>즐겨찾기</button>
			</div>
		</div>
	);
}
