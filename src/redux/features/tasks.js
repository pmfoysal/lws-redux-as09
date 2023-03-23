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
      }),
      editTask: builder.mutation({
         query: ({ id, ...data }) => ({
            url: `/tasks/${id}`,
            method: 'PATCH',
            body: data,
         }),
      }),
      deleteTask: builder.mutation({
         query: id => ({
            url: `/tasks/${id}`,
            method: 'DELETE',
         }),
      }),
   }),
});

export default tasks;
export const { useGetTaskQuery, useGetTasksQuery, useAddTaskMutation, useEditTaskMutation, useDeleteTaskMutation } = tasks;
