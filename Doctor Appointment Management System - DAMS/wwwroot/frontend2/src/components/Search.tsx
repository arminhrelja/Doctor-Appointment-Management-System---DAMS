function Search() {
  return (
      <div>
          <input type="text" className='bg-gray-100 mr-6 w-100 h-12 rounded-2xl mt-5 px-2 text-lg font-serif' />

          <a className="group relative inline-block text-lg font-medium text-white focus:ring-3 focus:outline-hidden" href="#">
              <span className="absolute inset-0 border border-blue-700 rounded-2xl"></span>
              <span className="block border bg-blue-700 rounded-2xl px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                Search
              </span>
          </a>
      </div>
  )
}

export default Search
