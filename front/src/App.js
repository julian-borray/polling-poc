import logo from './logo.svg';
import './App.css'
import {ServicePolling} from './services/servicePolling'

export const App = () => {
  let socket = null;
  const connectSocket = () => {
    socket = ServicePolling();
    socket.on("data", (data) => {
      console.log(data);
    });
  }
  const disconnectSocket = () => {
    //socket.disconnect();
  }
  return (
    <div className="App">
      <header className="App-header">
        {connectSocket()}
        <button onClick={disconnectSocket()}>desconectar</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
