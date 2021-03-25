import React from 'react';
import Layout from './Layout';
import ColorThemeProvider from './components/context/ColorThemeContext';
import TournamentProvider from './components/context/TournamentContext';
import PathProvider from './components/context/PathContext';
import HeaderLogoProvider from './components/context/HeaderLogoContext';
import LoaderProvider from './components/context/LoaderContext';

const App = () => {  
  if(navigator.onLine !== true){
    alert('No Internet Connection');
  }else{
    return(
      <PathProvider>
        <ColorThemeProvider>
          <HeaderLogoProvider>
            <LoaderProvider>
              <TournamentProvider>
                  <Layout/>
              </TournamentProvider>
            </LoaderProvider>
          </HeaderLogoProvider>
        </ColorThemeProvider>
      </PathProvider>
    );
  };
}

export default App;