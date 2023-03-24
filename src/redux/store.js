import api from './api';
import others from './features/others';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
   reducer: {
      others,
      [api.reducerPath]: api.reducer,
   },
   middleware: defaults => [...defaults(), api.middleware],
});
