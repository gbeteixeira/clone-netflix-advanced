import React, { useState } from 'react';
import './index.css';
import genres from '../../config/genre';
import { Add, Play, Down, Like, Dislike } from '../../utils/icons';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import Button from '../Button/';

interface FeatureCardProps {
  index: number;
  items: any;
  title: string;
}

type IListMovieProps = {
  slug: string,
  title: string,
  items: any[],
  topList?: boolean,
  defaultCard?: boolean
}

export default function FeatureCard({ index, items, title }: FeatureCardProps): React.ReactElement {

  let dados = items.items.results;

  // eslint-disable-next-line no-template-curly-in-string
  const [image, setImage] = useState<any>(true);

  const onHover = () => {
    setImage(false);
  };

  const onMouseOut = () => {
    setImage(true);
  };

  const [scrollX, setScrollX] = useState(0);

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
    let listWidth = (dados.length - 10) * 235;
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
        width: (dados.length - 10) * 235
      }}>
        <div className="movieRow__left" onClick={handleLeftArrow}>
          <NavigateBeforeIcon style={{ fontSize: 50 }} />
        </div>
        <div className="movieRow__right" onClick={handleRightArrow}>
          <NavigateNextIcon style={{ fontSize: 50 }} />
        </div>
        <div className="container">
          {dados.length > 0 && dados.map((item: IListMovieProps | any, key: any) => (
            <>
              {key < 10 &&
                <>
                  <div className="rank">{key + 1}</div>
                  <div className="featureCard">
                    <img src={`https://image.tmdb.org/t/p/w500/${image ? item.poster_path : item.backdrop_path}`} alt={item.original_name} className="poster" onMouseOver={onHover} onMouseOut={onMouseOut} />

                    <div className="info">
                      <div className="actionRow">
                        <div className="actionRow">
                          <Button Icon={Play} rounded filled />
                          <Button Icon={Add} rounded />
                          <Button Icon={Like} rounded />
                          <Button Icon={Dislike} rounded />
                        </div>
                        <Button Icon={Down} rounded />
                      </div>
                      <div className="textDetails">
                        <strong>{`${item.title ? item.title : item.original_name}`}</strong>
                        <div className="row">
                          <span className="greenText">{`${item.vote_average * 10}% match`}</span>
                          {/* <span className={styles.regularText}>length </span> */}
                        </div>
                        {item.genre_ids && item.media_type ? renderGenre(item.genre_ids, item.media_type) : ''}
                      </div>
                    </div>
                  </div>
                </>
              }
            </>
          ))}
        </div>
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