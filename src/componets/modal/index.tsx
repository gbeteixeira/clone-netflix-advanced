import React, { useContext } from "react";
import './index.css';
import Button from '../Button/';
import { Add, Play, Down, Like, Dislike } from '../../utils/icons';
import { ModalContext } from "../../context/ModalContext";

function Modal() {
  const { modalData, setIsModal, isModal } = useContext(ModalContext);
  const { title, banner, rating, overview, genre } = modalData;
  return (
    <div className="container__modal" style={{ display: isModal ? 'flex' : 'none' }}>
      <div className="overlay__modal" onClick={() => setIsModal(false)}></div>
      <div className="modal">
        <div className="spotlight">
          <img src={banner} alt='spotlight' className="spotlight__image" />
          <div className="details__modal">
            <div className="title__modal">{title}</div>
            <div className="buttonRow">
              <Button label='Play' filled Icon={Play} />
              <Button Icon={Add} rounded />
              <Button Icon={Like} rounded />
              <Button Icon={Dislike} rounded />
            </div>
            <div className="greenText">{rating * 10}% Match</div>
          </div>
        </div>

        <div className="cross__modal" onClick={() => setIsModal(false)}>
          &#10005;
        </div>
        <div className="bottomContainer">
          <div className="column">{overview}</div>
          <div className="column">
            <div className="genre">Genre: {/*renderGenre(genre)*/} </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal