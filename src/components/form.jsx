import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetMembersQuery } from '../redux/features/members';
import { useGetProjectsQuery } from '../redux/features/projects';
import { useAddTaskMutation, useEditTaskMutation } from '../redux/features/tasks';

export default function Form({ mode }) {
   const navigate = useNavigate();
   const { taskId } = useParams();
   const [project, setProject] = useState('');
   const [taskName, setTaskName] = useState('');
   const [deadline, setDeadline] = useState('');
   const [teamMember, setTeamMember] = useState('');

   const membersApi = useGetMembersQuery();
   const projectsApi = useGetProjectsQuery();
   const [addTask, addApi] = useAddTaskMutation();
   const [editTask, editApi] = useEditTaskMutation();

   function handleSubmit(event) {
      event.preventDefault();
      const data = {
         taskName,
         deadline,
         project: projectsApi.data?.find(item => String(item.id) === project),
         teamMember: membersApi.data?.find(item => String(item.id) === teamMember),
      };
      if (mode === 'add') addTask(data).then(() => navigate('/'));
      else {
         data.id = Number(taskId);
         editTask(data);
      }
   }

   return (
      <div className='justify-center mb-10 space-y-2 md:flex md:space-y-0'>
         <form className='space-y-6' onSubmit={handleSubmit}>
            <div className='fieldContainer'>
               <label htmlFor='lws-taskName'>Task Name</label>
               <input
                  type='text'
                  name='taskName'
                  id='lws-taskName'
                  required
                  placeholder='Implement RTK Query'
                  value={taskName}
                  onChange={e => setTaskName(e.target.value)}
               />
            </div>
            <div className='fieldContainer'>
               <label>Assign To</label>
               <select
                  name='teamMember'
                  id='lws-teamMember'
                  required
                  value={teamMember}
                  onChange={e => setTeamMember(e.target.value)}
               >
                  <option value='' hidden>
                     Select Member
                  </option>
                  {membersApi.data?.map((item, index) => (
                     <option key={`member-${index}`} value={item.id}>
                        {item.name}
                     </option>
                  ))}
               </select>
            </div>
            <div className='fieldContainer'>
               <label htmlFor='lws-projectName'>Project Name</label>
               <select
                  id='lws-projectName'
                  name='projectName'
                  required
                  value={project}
                  onChange={e => setProject(e.target.value)}
               >
                  <option value='' hidden>
                     Select Project
                  </option>
                  {projectsApi.data?.map((item, index) => (
                     <option key={`project-${index}`} value={item.id}>
                        {item.projectName}
                     </option>
                  ))}
               </select>
            </div>
            <div className='fieldContainer'>
               <label htmlFor='lws-deadline'>Deadline</label>
               <input
                  type='date'
                  name='deadline'
                  id='lws-deadline'
                  required
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
               />
            </div>
            <div className='text-right'>
               <button
                  type='submit'
                  className='lws-submit'
                  disabled={addApi.isLoading || editApi.isLoading || projectsApi.isLoading || membersApi.isLoading}
               >
                  Save
               </button>
            </div>
         </form>
      </div>
   );
}
