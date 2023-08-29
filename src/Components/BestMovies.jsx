import { useState, useEffect } from 'react';
import config from '../config';
import styles from './BestMovies.module.css';
import { AiFillStar } from "react-icons/ai";

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BestMovies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const apiKey = config.apiKey;

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setPopularMovies(data.results);
      })
      .catch((error) => {
        console.log('Erro ao buscar filmes populares:', error);
      });
  }, [apiKey]);

  const handleMouseEnter = (movieId) => {
    const hiddenDiv = document.getElementById(`hidden-${movieId}`);
    if (hiddenDiv) {
      hiddenDiv.classList.remove(styles.initialHidden);
    }
  };

  const handleMouseLeave = (movieId) => {
    const hiddenDiv = document.getElementById(`hidden-${movieId}`);
    if (hiddenDiv) {
      hiddenDiv.classList.add(styles.initialHidden);
    }
  };

  return (
    <section className={styles.moviesList}>
        <h2 className={styles.titleSection}>Filmes populares</h2>
      <Swiper
        slidesPerView={7}
        spaceBetween={180}
        pagination={{ clickable: true }}
      >
        {popularMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              key={movie.id}
              className={styles.cardMovie}
              onMouseEnter={() => handleMouseEnter(movie.id)}
              onMouseLeave={() => handleMouseLeave(movie.id)}
            >
              <div className={styles.posterMovie}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
              <div
                className={`${styles.movieInfo} ${styles.hidden} ${styles.initialHidden}`}
                id={`hidden-${movie.id}`}
              >
                <div className={styles.hidden}>
                  <p className={styles.movieTitle}>{movie.title}</p>
                  <p>{movie.vote_count} votos</p>
                  <div className={styles.rating}>
                    <AiFillStar className={styles.votingStars}/>
                    <p>{movie.vote_average}</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default BestMovies;
