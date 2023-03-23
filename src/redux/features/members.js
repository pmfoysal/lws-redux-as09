import api from '../api';

const members = api.injectEndpoints({
   endpoints: builder => ({
      getMembers: builder.query({
         query: () => '/team',
      }),
   }),
});

export default members;
export const { useGetMembersQuery } = members;
