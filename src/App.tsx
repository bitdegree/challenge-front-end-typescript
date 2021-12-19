import React, { Suspense, FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Spinner from './components/Layout/Spinner/Spinner';

const Home = React.lazy(() => import('./components/Pages/Home/Home'));
const Post = React.lazy(() => import('./components/Pages/Post/Post'));
const Edit = React.lazy(() => import('./components/Pages/Edit/Edit'));
const Create = React.lazy(() => import('./components/Pages/Create/Create'));

const App: FC = () => {
  return (
    <>
      <Router>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Post />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
};

export default App;
