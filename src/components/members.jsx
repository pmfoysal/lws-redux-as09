import { setMember } from '../redux/features/others';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMembersQuery } from '../redux/features/members';

export default function Members() {
   const dispatch = useDispatch();
   const { data: members } = useGetMembersQuery();
   const selected = useSelector(store => store.others.members);

   return (
      <div className='mt-8'>
         <h3 className='text-xl font-bold'>Team Members</h3>
         <div className='mt-3 space-y-4'>
            {members?.map((item, index) => (
               <div key={`member-${index}`} className='checkbox-container' onClick={() => dispatch(setMember(item.id))}>
                  <img src={item.avatar} className='team-avater' />
                  <p className={`label ${selected.includes(item.id) ? 'active' : ''}`}>{item.name}</p>
               </div>
            ))}
         </div>
      </div>
   );
}
