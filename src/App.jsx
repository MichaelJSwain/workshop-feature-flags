import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import { Header } from './components/Header/Header';
import { ProjectView } from './pages/ProjectView/ProjectView';
import { FlagDetailView } from './pages/FlagDetailView/FlagDetailView';
import { FlagDetailViewContext } from './FlagDetailViewContext';

function App() {
  return (
    <>
      <div id="react_portal"></div>
      <Header />
      
      <BrowserRouter>
          <Routes>
            <Route path="/flags" element={<ProjectView />}/>
            <Route path="/flags/:flagID" element={
              <FlagDetailViewContext>
                <FlagDetailView />
              </FlagDetailViewContext>}/>
            <Route path="*" element={<Navigate to="/flags" replace />}/>
          </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
