import './App.css'
import { Header } from './components/Header';

const experiments = [
  {
    id: Math.random() * 10000,
    name: "exp-1",
    type: "a/b",
    status: "paused"
  },
  {
    id: Math.random() * 10000,
    name: "exp-2",
    type: "a/b",
    status: "paused"
  },
  {
    id: Math.random() * 10000,
    name: "exp-3",
    type: "a/b",
    status: "paused"
  }
];

function App() {
  return (
    <>
      <Header />
    </>
  )
}

export default App
