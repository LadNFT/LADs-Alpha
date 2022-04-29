import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout/Layout';
import { Endless, Farming, Home, Staking } from './Pages';
import { ENDLESS_PATH, FARMING_PATH, HOME_PATH, STAKING_PATH } from './utiles/routes';
import {BlockchainContextProvider} from './context/BlockchainContext';

function App() {
  return (
    <BlockchainContextProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path={HOME_PATH} element={<Home />} />
            <Route path={STAKING_PATH} element={<Staking />} />
            <Route path={FARMING_PATH} element={<Farming />} />
            <Route path={ENDLESS_PATH} element={<Endless />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </BlockchainContextProvider>
  );
}

export default App;
