import Task from '../components/task';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../components/sidebar';
import { useGetTasksQuery } from '../redux/features/tasks';

export default function Home() {
   const { data: tasks } = useGetTasksQuery();
   const { search, members, projects } = useSelector(store => store.others);

   function tasksSearch(item) {
      if (!search) return true;
      const name = item.taskName.toLowerCase();
      // const member = item.teamMember.name.toLowerCase();
      // const project = item.project.projectName.toLowerCase();
      if (name.includes(search.toLowerCase())) return true;
      // else if (member.includes(search.toLowerCase())) return true;
      // else if (project.includes(search.toLowerCase())) return true;
      return false;
   }

   function tasksMembers(item) {
      if (!members.length) return true;
      return members.includes(item.teamMember.id);
   }

   function tasksProjects(item) {
      return projects.includes(item.project.id);
   }

   return (
      <div className='container relative'>
         <Sidebar />
         <div className='lg:pl-[16rem] 2xl:pl-[23rem]'>
            <main className='relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none'>
               <div className='justify-between mb-10 space-y-2 md:flex md:space-y-0'>
                  <Link to='/add' className='lws-addnew group'>
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-6 h-6 group-hover:text-indigo-500'
                     >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                     </svg>
                     <span className='group-hover:text-indigo-500'>Add New</span>
                  </Link>
               </div>
               <div className='lws-task-list'>
                  {tasks
                     ?.filter(tasksMembers)
                     ?.filter(tasksProjects)
                     ?.filter(tasksSearch)
                     ?.map((item, index) => (
                        <Task key={`task-${index}`} data={item} />
                     ))}
               </div>
            </main>
         </div>
      </div>
   );
}
