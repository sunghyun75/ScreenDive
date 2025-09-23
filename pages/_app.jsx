import Layout from '@/layouts/Layout';
import '@/styles/globals.css';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
	const router = useRouter();
	const noLayOutPages = ['/'];

	if (noLayOutPages.includes(router.pathname)) {
		return <Component {...pageProps} />;
	}

	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}
