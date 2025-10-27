let cart = [];

export default function handler(req, res) {
	if (req.method === 'POST') {
		const movie = req.body;
		if (!cart.find(m => m.id === movie.id)) {
			cart.push(movie);
		}
		res.status(200).json({ message: '즐겨찾기 추가 완료', cart });
	} else if (req.method === 'DELETE') {
		const { id } = req.body;
		cart = cart.filter(m => m.id !== id);
		res.status(200).json({ message: '즐겨찾기 삭제 완료', cart });
	} else if (req.method === 'GET') {
		res.status(200).json(cart);
	} else {
		res.setHeader('Allow', ['GET', 'POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
