import SlugList from '@/modules/slug/components/SlugList'
import { Button, Separator } from '@/shared/ui'
import { PlusSquareIcon } from 'lucide-react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <Fragment>
      <header className='flex justify-between items-center'>
        <h2 className='text-2xl md:text-4xl font-extrabold mt-2'>Dashboard</h2>
        <Link to='/dashboard/create'>
          <Button className='flex gap-2' title='Create a new slug'>
            <span className='sr-only'>Create a new slug</span>
            <PlusSquareIcon />
            <span className='hidden sm:inline-block'>Create a new slug</span>
          </Button>
        </Link>
      </header>
      
      <Separator className='my-4' />

      <SlugList />
    </Fragment>
  )
}
