import api from '../api';

const projects = api.injectEndpoints({
   endpoints: builder => ({
      getProjects: builder.query({
         query: () => '/projects',
      }),
   }),
});

export default projects;
export const { useGetProjectsQuery } = projects;
