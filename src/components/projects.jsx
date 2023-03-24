import { useEffect } from 'react';
import { setProject } from '../redux/features/others';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProjectsQuery } from '../redux/features/projects';

export default function Projects() {
   const dispatch = useDispatch();
   const { data: projects } = useGetProjectsQuery();
   const selected = useSelector(store => store.others.projects);

   useEffect(() => {
      if (projects?.length) {
         projects.forEach(item => {
            if (!selected.includes(item.id)) {
               dispatch(setProject(item.id));
            }
         });
      }
   }, [projects]);

   return (
      <div>
         <h3 className='text-xl font-bold'>Projects</h3>
         <div className='mt-3 space-y-4'>
            {projects?.map((item, index) => (
               <div key={`project-${index}`} className='checkbox-container' onClick={() => dispatch(setProject(item.id))}>
                  <input type='checkbox' className={item.colorClass} checked={selected.includes(item.id)} readOnly />
                  <p className={`label ${selected.includes(item.id) ? '' : ''}`}>{item.projectName}</p>
               </div>
            ))}
         </div>
      </div>
   );
}
