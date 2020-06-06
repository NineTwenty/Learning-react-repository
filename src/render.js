import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const explicitRender = (state) => {
  ReactDOM.render(
    <React.StrictMode>
      <App {...state} />
    </React.StrictMode>,
    document.getElementById('root')
  );
};

export default explicitRender;
