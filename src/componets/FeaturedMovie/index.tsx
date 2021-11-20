/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './index.css';

export default function FeaturedMovie({item} :any) {

  let yearDate = new Date(item.first_air_date);

  let genres = [];

  for(let i in item.genres){
    genres.push(item.genres[i].name);
  }


  return (
      <section className="featured-movie" style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.backdrop_path})`
      }}>
        <div className="featured__vertical__opacity">
          <div className="featured__horizontal__opacity">
            <div className="featured__name">{item.original_name}</div>
            <div className="featured__info">
              <div className="featured__points">{item.vote_average} pontos</div>
              <div className="featured__years">{yearDate.getFullYear()}</div>
              <div className="featured__seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
            </div>
            <div className="featured__overview">{item.overview}</div>
            <div className="featured__buttons">
            <a className="button__watch" href="#">► Assistir</a>
            <a className="button__my_list" href={`/list/add/${item.id}`}>+ Minha Lista</a>
            </div>
            <div className="featured__genres"><strong>Gêneros</strong> {genres.join(', ')}</div>
          </div>
        </div>
      </section>
  );
}