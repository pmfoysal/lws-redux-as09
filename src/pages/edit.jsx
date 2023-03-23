import Form from '../components/form';

export default function Edit() {
   return (
      <div class='container relative'>
         <main class='relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none'>
            <h1 class='mt-4 mb-8 text-3xl font-bold text-center text-gray-800'>Edit a Task</h1>
            <Form mode='edit' />
         </main>
      </div>
   );
}
