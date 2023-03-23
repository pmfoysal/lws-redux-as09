import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   search: '',
   projects: [],
   members: [],
};

const others = createSlice({
   name: 'others',
   initialState,
   reducers: {
      setSearch: (state, action) => {
         state.search = action.payload;
      },
      setProject: (state, action) => {
         if (state.projects.includes(action.payload)) {
            state.projects = state.projects.filter(item => item !== action.payload);
         } else state.projects.push(action.payload);
      },
      setMember: (state, action) => {
         if (state.members.includes(action.payload)) {
            state.members = state.members.filter(item => item !== action.payload);
         } else state.members.push(action.payload);
      },
   },
});

export default others.reducer;
export const { setSearch, setProject, setMember } = others.actions;
