import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const explicitRender = (state, actions) => {
  ReactDOM.render(
    <React.StrictMode>
      <App {...state} {...actions}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

export default explicitRender;
