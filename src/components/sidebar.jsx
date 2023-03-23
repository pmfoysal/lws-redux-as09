import Members from './members';
import Projects from './projects';

export default function Sidebar() {
   return (
      <div class='sidebar'>
         <Projects />
         <Members />
      </div>
   );
}
