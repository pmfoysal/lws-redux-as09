export default function Projects() {
   return (
      <div>
         <h3 className='text-xl font-bold'>Projects</h3>
         <div className='mt-3 space-y-4'>
            <div className='checkbox-container'>
               <input type='checkbox' className='color-scoreboard' />
               <p className='label'>Scoreboard</p>
            </div>
            <div className='checkbox-container'>
               <input type='checkbox' className='color-flight' />
               <p className='label'>Flight Booking</p>
            </div>
            <div className='checkbox-container'>
               <input type='checkbox' className='color-productCart' />
               <p className='label'>Product Cart</p>
            </div>
            <div className='checkbox-container'>
               <input type='checkbox' className='color-bookstore' />
               <p className='label'>Book Store</p>
            </div>
            <div className='checkbox-container'>
               <input type='checkbox' className='color-blog' />
               <p className='label'>Blog Application</p>
            </div>
            <div className='checkbox-container'>
               <input type='checkbox' className='color-jobFinder' />
               <p className='label'>Job Finder</p>
            </div>
         </div>
      </div>
   );
}
