import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './IntroPage.module.css';
import Image from 'next/image';

export default function IntroPage() {
	const [posters, setPosters] = useState([]);

	useEffect(() => {
		document.body.style.backgroundColor = '#272727';
		return () => {
			document.body.style.backgroundColor = '';
		};
	}, []);

	useEffect(() => {
		const fetchPoster = async () => {
			try {
				const res1 = await axios.get('/api/tmdb?category=popular');
				const data1 = res1.data.results.map(poster => poster.poster_path);

				const res2 = await axios.get('/api/tmdb?category=upcoming');

				const data2 = res2.data.results.map(poster => poster.poster_path);

				const res3 = await axios.get('/api/tmdb?category=now_playing');

				const data3 = res3.data.results.map(poster => poster.poster_path);

				const res4 = await axios.get('/api/tmdb?category=top_rated');

				const data4 = res4.data.results.map(poster => poster.poster_path);

				setPosters([...data1, ...data2, ...data3, ...data4]);
			} catch (error) {
				console.log(error);
			}
		};

		fetchPoster();
	}, []);

	const route = useRouter();
	const handlerMovieList = async () => {
		try {
			route.push('/movieListPage');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				{posters.map(poster => (
					<div key={poster.id}>
						<Image
							src={`https://image.tmdb.org/t/p/w500/${poster}`}
							alt={poster.name}
							width={200}
							height={200}
						></Image>
					</div>
				))}
			</div>
			<h1>ScreenDive</h1>
			<p>
				눈앞에 펼쳐지는 수많은 스크린 <br /> 그 안에 담긴 수천 개의 세계 <br />
				이제, 당신이 탐험할 차례.
			</p>
			<button onClick={handlerMovieList} className={styles.btn}>
				바로 가기
			</button>
		</div>
	);
}
