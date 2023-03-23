import api from '../api';

export default api.injectEndpoints({
   endpoints: builder => ({
      getProjects: builder.query({
         query: () => '/projects',
      }),
   }),
});
