import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./MovieList.module.css";

export default function MovieList(movie) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("/api/tmdb")
      .then((res) => res.data)
      .then((data) => setMovies(data.results))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <div key={movie.id}>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} // URL에는 w500만 사용
            alt={movie.title}
            width={300}
            height={300}
          />
          <div>{movie.title}</div>
        </div>
      ))}
    </div>
  );
}
