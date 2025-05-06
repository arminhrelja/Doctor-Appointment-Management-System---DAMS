import Search from './Search'

function CategorySearch() {
  return (
      <div className='mt-35 mb-10 items-center flex flex-col gap-2'>
        <h2 className='font-bold text-4xl tracking-wide'>Search 
            <span className='text-blue-700'>Doctors</span>
        </h2>
        <h2 className='text-gray-400 text-xl'>Search Your Doctor and Book Appointment in one click</h2>
        <Search />
      </div>
  )
}

export default CategorySearch
