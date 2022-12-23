import React from 'react';
import loadingIMG from '../images/loading.svg';
import style from './Loading.module.css';

class Loading extends React.Component {
  render() {
    return (
      <div className={ style.loading }>
        <img src={ loadingIMG } alt="loading" className={ style.img } />
        <h1>Carregando...</h1>
      </div>
    );
  }
}

export default Loading;
