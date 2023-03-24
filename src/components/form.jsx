import { useEffect, useState } from 'react';
import isSameObject from '../utilities/isSameObject';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetMembersQuery } from '../redux/features/members';
import { useGetProjectsQuery } from '../redux/features/projects';
import { useAddTaskMutation, useEditTaskMutation, useGetTaskQuery } from '../redux/features/tasks';

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
   const taskApi = useGetTaskQuery(taskId, { skip: !taskId });

   function handleSubmit(event) {
      event.preventDefault();
      const data = {
         taskName,
         deadline,
         status: 'pending',
         project: projectsApi.data?.find(item => item.id === Number(project)),
         teamMember: membersApi.data?.find(item => item.id === Number(teamMember)),
      };
      if (mode === 'add') addTask(data).then(() => navigate('/'));
      else {
         if (taskApi.data?.id) {
            data.id = taskApi.data.id;
            data.status = taskApi.data.status;
            if (isSameObject(data, taskApi.data)) {
               navigate('/');
            } else editTask(data).then(() => navigate('/'));
         }
      }
   }

   useEffect(() => {
      if (taskApi.data?.id) {
         setProject(taskApi.data.project.id);
         setTaskName(taskApi.data.taskName);
         setDeadline(taskApi.data.deadline);
         setTeamMember(taskApi.data.teamMember.id);
      }
   }, [taskApi.data]);

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
                  disabled={
                     addApi.isLoading || editApi.isLoading || projectsApi.isLoading || membersApi.isLoading || taskApi.isLoading
                  }
               >
                  Save
               </button>
            </div>
         </form>
      </div>
   );
}
