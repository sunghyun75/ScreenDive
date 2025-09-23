import Image from 'next/image';
import React from 'react';
import styles from '@/component/MovieDetail/MoiveDetail.module.css';

export default function MovieDetail({ movie }) {
	return (
		<div className={styles.container}>
			<div>
				<h1>{movie.title}</h1>
				<Image
					src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
					alt={movie.title}
					width={592}
					height={333}
					style={{ objectFit: 'cover' }}
				/>
				<p>개봉일: {movie.release_date}</p>
				<p>{movie.overview}</p>
				<p>{movie.videos}</p>
			</div>
		</div>
	);
}
