import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import { Header } from './components/Header/Header';
import { ProjectView } from './pages/ProjectView/ProjectView';
import { FlagDetailView } from './pages/FlagDetailView/FlagDetailView';
import { FlagDetailViewContext } from './FlagDetailViewContext';
import { SidebarNav } from './components/SidebarNav/SidebarNav';

function App() {
  return (
    <BrowserRouter>
        <div id="react_portal"></div>
        <SidebarNav></SidebarNav>
        <main style={{padding: "0px 30px 0 270px"}}>
          <Routes>
            <Route path="/flags" element={<ProjectView />}/>
            <Route path="/flags/:flagID" element={
              <FlagDetailViewContext>
                <FlagDetailView />
              </FlagDetailViewContext>}/>
            <Route path="*" element={<Navigate to="/flags" replace />}/>
          </Routes>
        </main>
     </BrowserRouter>
  )
}

export default App
