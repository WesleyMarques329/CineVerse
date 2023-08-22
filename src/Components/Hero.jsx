import { useState, useEffect } from 'react';
import config from '../config';
import styles from './Hero.module.css'
import { AiFillStar } from "react-icons/ai";

const Hero = () => {
    const [featuredMovie, setFeaturedMovie] = useState(null)
    const [trailerKey, setTrailerKey] = useState(null);

    useEffect(() => {

        const apiUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${config.apiKey}&language=pt-BR`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setFeaturedMovie(data.results[0]);
                
                const movieId = data.results[0].id;
                fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${config.apiKey}&language=pt-BR`)
                    .then(response => response.json())
                    .then(videoData => {
                        if (videoData.results.length > 0) {
                            setTrailerKey(videoData.results[0].key);
                        }
                    })
                    .catch(error => {
                        console.log("Erro ao obter informações do vídeo", error);
                    }) ;
            })
            .catch(error => {
                console.log("Erro ao fazer a requisição á API", error);
            });
    }, []);
    
  return (
    <div className={styles.Container}>
        {featuredMovie && (
            <div className={styles.divImage}>
                <iframe
                    className={styles.customIframe}
                    width="530"
                    height="300"
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title={`Trailer de ${featuredMovie.title}`}
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
                <img
                    src={`https://image.tmdb.org/t/p/w1280${featuredMovie.backdrop_path}`}
                    alt={`Capa de ${featuredMovie.title}`}                   
                />
                        <div className={styles.movieDesc}>
                            {featuredMovie && <h1>{featuredMovie.title}</h1>}

                            <AiFillStar className={styles.votingStars}/>
                            <div className={styles.divContainer}>
                                {featuredMovie && <p>{featuredMovie.vote_count} votos</p>}
                                {featuredMovie && (
                                    <p>{Math.round(featuredMovie.vote_average * 10) / 10}</p>
                                )}
                            </div>
                            {featuredMovie && <p className={styles.movieInfo}>{featuredMovie.overview}</p>}
                            <button>Ver Mais</button>
                        </div>
            </div>
        )}
    </div>
  )
}

export default Hero