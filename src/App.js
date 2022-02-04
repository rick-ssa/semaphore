
import './App.css';
import Light from './components/Light'
function App() {
  return (
    <>
    <Light lightOn={true} color='red' size={50} />
    <Light lightOn={false} color='orange' size={50} />
    <Light lightOn={false} color='green' size={50} />
    </>
  );
}

export default App;
