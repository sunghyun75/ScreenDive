import Link from 'next/link';
import React from 'react';
import styles from '@/layouts/Layout.module.css';

export default function Layout({ children }) {
	return (
		<div className={styles.container}>
			<main>
				<nav>
					<div className={styles.header}>
						<Link href="/movieListPage">홈</Link>
					</div>
				</nav>
				<div>{children}</div>
			</main>
		</div>
	);
}
