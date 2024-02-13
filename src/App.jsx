import GlobalStyle from './GlobalStyle';
import ThemeProvider from './components/ThemeProvider';
import Router from './shared/Router';
import './App.css';

function App() {
  return (
    <>
      <ThemeProvider>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
