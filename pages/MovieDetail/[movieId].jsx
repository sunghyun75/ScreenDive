import MovieDetail from '@/component/MovieDetail/MovieDetail';
import axios from 'axios';
import React from 'react';

export default function MovieId({ movie }) {
	return <MovieDetail movie={movie} />;
}

export async function getServerSideProps(context) {
	const { movieId } = context.params;

	try {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
			{
				headers: {
					Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
				},
			},
		);

		return {
			props: {
				movie: data,
			},
		};
	} catch (error) {
		console.error('TMDB fetch error:', error.message);
		return {
			notFound: true,
		};
	}
}
