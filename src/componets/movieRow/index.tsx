import React, { useState } from 'react';
import './index.css';
import genres from '../../config/genre';
import { Add, Play, Down, Like, Dislike } from '../../utils/icons';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Button from '../Button/';

type CardsProps = {
  defaultCard?: boolean;
  title: string,
  items: any
}


export default function ListMovie({ defaultCard = true, title, items }: CardsProps) {

  const style = defaultCard ? 'card' : 'longCard';
  const infoStyle = defaultCard ? 'cardInfo' : 'cardMore';
  //const image = defaultCard ? items. : items.;

  const [scrollX, setScrollX] = useState(-400);

  const handleLeftArrow = () => {
    let width = window.innerWidth;
    let x = scrollX + Math.round(width / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  }

  const handleRightArrow = () => {
    let width = window.innerWidth;
    let x = scrollX - Math.round(width / 2);
    let listWidth = items.results.length * 150;
    if ((width - listWidth) > x) {
      x = (width - listWidth) - 60;
    }

    setScrollX(x);
  }

  return (
    <div className="listContainer">
      <strong className="category">{title}</strong>
      <div className="cardRow" style={{
        marginLeft: scrollX,
        width: items.results.length * 150
      }}>
        <div className="movieRow__left" onClick={handleLeftArrow}>
          <NavigateBeforeIcon style={{ fontSize: 50 }} />
        </div>
        <div className="movieRow__right" onClick={handleRightArrow}>
          <NavigateNextIcon style={{ fontSize: 50 }} />
        </div>
        {items.results.length > 0 && items.results.map((item: any, key: any) => (
          <div key={key} className={style}>
            <img src={`https://image.tmdb.org/t/p/w300/${defaultCard ? item.backdrop_path : item.poster_path}`} alt={item.original_name} className="cardPoster" />
            <div className={infoStyle}>
              <div className="actionRow">
                <div className="actionRow">
                  <Button Icon={Play} rounded filled />
                  <Button Icon={Add} rounded />
                  {defaultCard && (
                    <>
                      <Button Icon={Like} rounded />
                      <Button Icon={Dislike} rounded />
                    </>
                  )}
                </div>
                <Button Icon={Down} rounded />
              </div>
              <div className="textDetails">
                <strong>{item.original_name}</strong>
                <div className="row">
                  <span className="greenText">{`${item.vote_average * 10}% match`}</span>
                  {/* <span className={styles.regularText}>length </span> */}
                </div>
                {item.genre_ids && title === 'Recomendados para Você' ? renderGenre(item.genre_ids, 'tv') : ''}
                {item.genre_ids && title === 'Top 10 filmes' ? renderGenre(item.genre_ids, 'tv') : ''}
                {item.genre_ids && title === 'Originais do Netflix' ? renderGenre(item.genre_ids, 'tv') : ''}
                
                {item.genre_ids && title === 'Em alta' ? renderGenre(item.genre_ids, 'tv') : ''}
                {item.genre_ids && title === 'Ação' ? renderGenre(item.genre_ids, 'tv') : ''}
                {item.genre_ids && title === 'Comédia' ? renderGenre(item.genre_ids, 'tv') : ''}
                {item.genre_ids && title === 'Terror' ? renderGenre(item.genre_ids, 'tv') : ''}
                {item.genre_ids && title === 'Romance' ? renderGenre(item.genre_ids, 'tv') : ''}
                {item.genre_ids && title === 'Documentários' ? renderGenre(item.genre_ids, 'tv') : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderGenre(genre_ids: number[], type: string) {

  try {

    let dados: any = genres[type].filter((item: any) => genre_ids.includes(item.id))

    if (dados.length > 3) {
      dados = dados.slice(0, 3);
    }

    return (
      <>
        <div className="row">
          {dados.map((item: any, index: number) => {
            const isLast = index === dados.length - 1;
            return (
              <div key={index} className="row">
                <span className="regularText">{item.name}</span>
                {!isLast && <div className="dot">&bull;</div>}
              </div>
            );
          })}
        </div>
      </>
    );

  } catch (err) {

  }

}