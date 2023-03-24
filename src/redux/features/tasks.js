import api from '../api';

const tasks = api.injectEndpoints({
   endpoints: builder => ({
      getTasks: builder.query({
         query: () => '/tasks',
      }),
      getTask: builder.query({
         query: id => `/tasks/${id}`,
      }),
      addTask: builder.mutation({
         query: data => ({
            url: '/tasks',
            method: 'POST',
            body: data,
         }),
         onQueryStarted: async (args, { queryFulfilled, dispatch }) => {
            const result = await queryFulfilled;
            dispatch(
               tasks.util.updateQueryData('getTasks', undefined, draft => {
                  draft.push(result.data);
               })
            );
         },
      }),
      editTask: builder.mutation({
         query: ({ id, ...data }) => ({
            url: `/tasks/${id}`,
            method: 'PATCH',
            body: data,
         }),
         onQueryStarted: async (args, { queryFulfilled, dispatch }) => {
            await queryFulfilled;
            dispatch(
               tasks.util.updateQueryData('getTasks', undefined, draft => {
                  draft.forEach(item => {
                     if (item.id === args.id) {
                        Object.assign(item, args);
                     }
                  });
               })
            );
            dispatch(
               tasks.util.updateQueryData('getTask', String(args.id), draft => {
                  Object.assign(draft, args);
               })
            );
         },
      }),
      deleteTask: builder.mutation({
         query: id => ({
            url: `/tasks/${id}`,
            method: 'DELETE',
         }),
         onQueryStarted: async (args, { queryFulfilled, dispatch }) => {
            const result = dispatch(
               tasks.util.updateQueryData('getTasks', undefined, draft => {
                  const index = draft.findIndex(item => item.id === args);
                  draft.splice(index, 1);
               })
            );
            try {
               await queryFulfilled;
            } catch (err) {
               result.undo();
            }
         },
      }),
   }),
});

export default tasks;
export const { useGetTaskQuery, useGetTasksQuery, useAddTaskMutation, useEditTaskMutation, useDeleteTaskMutation } = tasks;
