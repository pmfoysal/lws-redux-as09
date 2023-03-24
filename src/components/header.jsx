import { setSearch } from '../redux/features/others';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { pathname } = useLocation();
   const search = useSelector(store => store.others.search);

   function handleSearch(e) {
      dispatch(setSearch(e.target.value));
      if (pathname !== '/') navigate('/');
   }

   return (
      <nav className='container relative py-3'>
         <div className='flex items-center justify-between'>
            <Link to='/'>
               <img src='/assets/icons/logo.svg' />
            </Link>
            <div className='flex-1 max-w-xs search-field group'>
               <i className='fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500'></i>
               <input
                  type='text'
                  placeholder='Search Task'
                  className='search-input'
                  id='lws-searchTask'
                  value={search}
                  onChange={e => handleSearch(e)}
               />
            </div>
         </div>
      </nav>
   );
}
