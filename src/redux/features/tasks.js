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
                  draft.push(result);
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
                     if (item.id === String(args.id)) {
                        item = { ...item, ...args };
                     }
                  });
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
                  draft = draft.filter(item => item.id !== String(args));
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
