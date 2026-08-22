import { Routes, Route } from 'react-router-dom';
import Layout from './shared/layout/Layout';
import Login from './pages/Login';
import Home from './pages/Home';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
}