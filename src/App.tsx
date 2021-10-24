import React, { useEffect, useState } from 'react';
import tmdb from './services/tmdb'
import ListMovie from './componets/movieRow';
import './App.css';
import FeaturedMovie from './componets/FeaturedMovie';
import FeatureCard from './componets/TopMovies';
import Header from './componets/header/';

type IListMovieProps = {
  slug: string,
  title: string,
  items: any[],
  topList?: boolean,
  defaultCard?: boolean
}

function App() {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData]: any = useState(null);
  const [blackHeader, setBlackHeader]: any = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //get lista all
      let list = await tmdb.getHomeList();
      setMovieList(list as never);

      // filme em destaque
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length) - 1);
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');

      setFeaturedData(chosenInfo);
    }

    loadAll();

  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  return (
    <>
      <div className="page">

        <Header blackHeader={blackHeader} />

        {featuredData &&
          <FeaturedMovie item={featuredData} />
        }

        <section className="lists">
          {movieList.map((item: IListMovieProps, index: number) => {
            if (item.topList) {
              if (index < 10) {
                return <FeatureCard key={index} index={index + 1} items={item} title={item.title} />;
              }
            } else {
              return (
                <ListMovie
                  key={index}
                  defaultCard={item.defaultCard}
                  title={item.title}
                  items={item.items}
                />
              );
            }
          })}
        </section>

        <footer>
          Feito com por <span>Gabriel Teixeira</span>  <br />
          Site feito para aprendizado! todos os direitos para <span>Netflix</span><br />
          Informações do site themoviedb.org<br />
        </footer>

        {movieList.length <= 0 &&
          <div className="loading">
            <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando" />
          </div>
        }
      </div>
    </>
  );
}

export default App;
