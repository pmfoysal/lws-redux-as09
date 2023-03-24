export default function getDate(date) {
   const temp = new Date(date);

   return {
      day: temp.toLocaleDateString('en-US', { day: '2-digit' }),
      month: temp.toLocaleDateString('en-US', { month: 'long' }),
   };
}
