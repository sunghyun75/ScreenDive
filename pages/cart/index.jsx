import CartHeader from '@/component/Cart/CartHeader';
import CartPage from '@/component/Cart/CartPage';
import axios from 'axios';
import React from 'react';

export default function Cart({ carts }) {
	return (
		<div>
			<CartHeader />
			<CartPage carts={carts} />
		</div>
	);
}

export async function getServerSideProps(context) {
	// 현재 요청 호스트 정보
	const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
	const host = context.req.headers.host; // localhost:3000 또는 실제 도메인
	const baseUrl = `${protocol}://${host}`;

	const { data } = await axios.get(`${baseUrl}/api/cart`);

	return {
		props: { carts: data }, // page에서 props로 사용 가능
	};
}
