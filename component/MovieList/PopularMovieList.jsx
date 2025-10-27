import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import styles from './MovieList.module.css';
import Link from 'next/link';
import MovieHeader from './MovieHeader';
import UpcomingMovieList from './UpcomingMovieList';
import TopratedMovieList from './TopratedMovieList';
import NowPlayingMovieList from './NowPlayingMovieList';

export default function MovieList() {
	const throttle = (func, ms) => {
		let throttled = false;
		return (...args) => {
			if (!throttled) {
				throttled = true;
				setTimeout(() => {
					func(...args);
					throttled = false;
				}, ms);
			}
		};
	};

	const scrollRef = useRef(null);
	const [isDrag, setIsDrag] = useState(false);
	const [startX, setStartX] = useState(null);
	const [movies, setMovies] = useState([]);

	const onDragStart = e => {
		e.preventDefault();
		setIsDrag(true);
		setStartX(e.pageX + scrollRef.current.scrollLeft);
	};

	const onDragEnd = () => {
		isDrag && setIsDrag(false);
	};

	const onDragMove = e => {
		if (isDrag && scrollRef.current) {
			scrollRef.current.scrollLeft = startX - e.pageX;
			console.log(onDragMove);
		}
	};

	const delay = 10;
	const onThrottleDragMove = throttle(onDragMove, delay);

	useEffect(() => {
		axios
			.get('/api/tmdb?category=popular')
			.then(res => res.data)
			.then(data => setMovies(data.results))
			.catch(err => console.log(err));
	}, []);

	return (
		<div className={styles.header}>
			<MovieHeader />
			<NowPlayingMovieList></NowPlayingMovieList>
			<h3>최신 화제작</h3>
			<div
				className={styles.container}
				ref={scrollRef}
				onMouseDown={onDragStart}
				onMouseMove={onThrottleDragMove}
				onMouseUp={onDragEnd}
				onMouseLeave={onDragEnd}
			>
				{movies.map(movie => (
					<div key={movie.id} className={styles.card}>
						<Link href={`/MovieDetail/${movie.id}`}>
							<Image
								src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
								alt={movie.title}
								width={200}
								height={200}
								className={styles.img}
							/>
						</Link>
						<div>{movie.title}</div>
						<p>개봉 : {movie.release_date}</p>
					</div>
				))}
			</div>
			<UpcomingMovieList></UpcomingMovieList>
			<TopratedMovieList></TopratedMovieList>
		</div>
	);
}
