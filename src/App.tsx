import React from 'react';
import './styles/main.scss';
import { HomePage } from './Components/HomePage';

export const App: React.FC = () => {
  return (
    <div className="app">
      <HomePage />
    </div>
  );
};
