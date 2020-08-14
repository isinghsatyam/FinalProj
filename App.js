import React from 'react';
import AppRouter from './src/navigation/nav';
import Store from './src/store/Store'
import { Provider } from 'mobx-react';

const App = () => {
  return (
    <Provider {...Store}>
      <AppRouter/>
    </Provider>
  );
};

export default App;
