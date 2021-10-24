import React from 'react';
import './index.css';

function Header({blackHeader}:any){
  return (
    <header className={blackHeader ? 'header__scroll' : ''}>
      <div className="header__logo">
        <a href="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png" alt="Netflix" />
        </a>
      </div>
      <div className="header__user">
        <a href="/">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Usuário" />
        </a>
      </div>
    </header>
  )
}

export default Header;