import axios from 'axios';

export default async function handler(req, res) {
	const { category = popular } = req.query;
	const options = {
		method: 'GET',
		url: `https://api.themoviedb.org/3/movie/${category}`,
		params: { language: 'ko-KR', page: '1' },
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
		},
	};

	try {
		const response = await axios.request(options);
		res.status(200).json(response.data);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}
