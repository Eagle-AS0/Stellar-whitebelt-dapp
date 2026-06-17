import './App.css';
import Header from './components/Header';
import BonusFeatures from './components/BonusFeatures';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="max-w-4xl mx-auto">
        <BonusFeatures />
      </main>
    </div>
  );
}

export default App;
