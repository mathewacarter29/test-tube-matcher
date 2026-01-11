import "./App.css";
import Tubes from "./components/Tubes/Tubes";

function App() {
  return (
    <div style={{width: '100%'}}>
      <h1 style={{color: 'black'}}>Put all matching colors in the same tube to win!</h1>
      <div style={{width: '80%', margin: 'auto'}}>
        <Tubes />
      </div>
    </div>
  );
}

export default App;
