import Add from '../pages/add';
import Edit from '../pages/edit';
import Home from '../pages/home';
import Layout from '../layouts/layout';
import { Route, Routes } from 'react-router-dom';

export default function App() {
   return (
      <Routes>
         <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/add' element={<Add />} />
            <Route path=':taskId/edit' element={<Edit />} />
         </Route>
      </Routes>
   );
}
