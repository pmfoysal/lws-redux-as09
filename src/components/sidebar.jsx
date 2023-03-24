import Members from './members';
import Projects from './projects';

export default function Sidebar() {
   return (
      <div className='sidebar'>
         <Projects />
         <Members />
      </div>
   );
}
