import React, { useState } from 'react';
import Navbar from './components/Navigation/Navbar';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Overview from './pages/Overview';
import Social from './pages/Social';
import Profile from './pages/Profile';
import AreaPage from './pages/AreaPage';
import { Area } from './types/area';

type Page = 'Home' | 'Schedule' | 'Overview' | 'Social' | 'Profile' | 'Area';

interface AppState {
  currentPage: Page;
  selectedArea: Area | null;
}

function App() {
  const [state, setState] = useState<AppState>({
    currentPage: 'Home',
    selectedArea: null,
  });

  const handlePageChange = (page: Page) => {
    setState({ currentPage: page, selectedArea: null });
  };

  const handleAreaClick = (area: Area) => {
    setState({ currentPage: 'Area', selectedArea: area });
  };

  const handleBackToOverview = () => {
    setState({ currentPage: 'Overview', selectedArea: null });
  };

  const renderPage = () => {
    switch (state.currentPage) {
      case 'Home':
        return <Home />;
      case 'Schedule':
        return <Schedule />;
      case 'Overview':
        return <Overview onAreaClick={handleAreaClick} />;
      case 'Social':
        return <Social />;
      case 'Profile':
        return <Profile />;
      case 'Area':
        return state.selectedArea ? (
          <AreaPage area={state.selectedArea} onBack={handleBackToOverview} />
        ) : (
          <Overview onAreaClick={handleAreaClick} />
        );
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navbar 
        activePage={state.currentPage === 'Area' ? 'Overview' : state.currentPage} 
        onPageChange={handlePageChange} 
      />
      <main className="pt-16">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;