import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ReturnsDataProvider } from './context/ReturnsDataContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ReturnsList from './pages/ReturnsList';
import ReturnDetail from './pages/ReturnDetail';
import AffordancesPage from './pages/AffordancesPage';
import TasksPage from './pages/TasksPage';
import AIReviewQueue from './pages/AIReviewQueue';
import MessagesPage from './pages/MessagesPage';
import SettingsPage from './pages/SettingsPage';
import ReportsPage from './pages/ReportsPage';
import Placeholder from './pages/Placeholder';

export default function App() {
  return (
    <AppProvider>
      <ReturnsDataProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/"              element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard"     element={<Dashboard />} />
              <Route path="/returns"       element={<ReturnsList />} />
              <Route path="/returns/:id"   element={<ReturnDetail />} />
              <Route path="/affordances"   element={<AffordancesPage />} />
              <Route path="/tasks"         element={<TasksPage />} />
              <Route path="/ai-review"     element={<AIReviewQueue />} />
              <Route path="/messages"      element={<MessagesPage />} />
              <Route path="/reports"       element={<ReportsPage />} />
              <Route path="/settings"      element={<SettingsPage />} />
              <Route path="/clients"       element={<Placeholder title="Clients" />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ReturnsDataProvider>
    </AppProvider>
  );
}
