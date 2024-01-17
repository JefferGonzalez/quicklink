import LinkIcon from '@/icons/Link'

function App() {
  return (
    <div className='flex gap-2 items-center justify-center min-h-screen py-2'>
      <LinkIcon />
      <h1 className='text-7xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-3'>
        Open Source URL Shortener
      </h1>
    </div>
  )
}

export default App
