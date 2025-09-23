import React from 'react';
import styles from '@/component/MovieList/MovieHeader.module.css';

export default function MovieHeader() {
	return (
		<div className={styles.container}>
			<h1>ScreenDive</h1>
			<h3>
				스크린 속 세계로 떠나는 영화 여행. <br />
				ScreenDive와 함께라면 숨겨진 명작부터 최신 화제작까지, <br />매 순간
				영화 속 이야기를 경험할 수 있습니다.
			</h3>
		</div>
	);
}
