
import './App.css';
import { Header } from './components/Header';
import { MainComponent } from './components/MainComponent';
import { useStyles } from './styles/styles';
import { Container, Button, AppBar, Typography } from '@material-ui/core';

function App() {
  const classes = useStyles()
  return (
    <div className="App">
      <div className={classes.fulldark}>
        <Header></Header>
        <MainComponent></MainComponent>
      </div>
    </div>
  );
}

export default App;
