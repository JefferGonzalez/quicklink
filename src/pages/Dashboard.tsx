import Layout from '@/components/Layout'
import SlugCard from '@/components/SlugCard'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { AuthContext } from '@/context/AuthContext'
import { deleteSlug, getSlugs } from '@/services/Slugs'
import { Slug } from '@/types'
import { showToastError } from '@/utils/errors'
import { PlusSquareIcon } from 'lucide-react'
import { Fragment, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export default function Dashboard(): JSX.Element {
  const {
    logout,
    auth: { isAuthenticated }
  } = useContext(AuthContext)

  const [slugs, setSlugs] = useState<Slug[]>([])
  const [loading, setLoading] = useState(false)

  const handleDelete = async (id: string) => {
    setLoading(true)
    try {
      const response = await deleteSlug(id)

      if (!response.ok) {
        const statusCode = response.status

        if (statusCode === 401) logout()
        if (statusCode === 404) {
          toast('🙃 Slug not found, please refresh the page')
        }
        setLoading(false)
        return
      }

      window.location.reload()
    } catch (error) {
      setLoading(false)

      showToastError()
    }
  }

  useEffect(() => {
    const loadSlugs = async () => {
      setLoading(true)
      try {
        const response = await getSlugs()

        if (!response.ok) {
          if (response.status === 401) logout()
          setLoading(false)
          return
        }

        const { data }: { data: Slug[] } = await response.json()

        setSlugs(data)

        setTimeout(() => setLoading(false), 500)
      } catch (error) {
        setLoading(false)

        showToastError()
      }
    }

    isAuthenticated && loadSlugs()
  }, [isAuthenticated])

  return (
    <Layout>
      <header className='flex justify-between items-center'>
        <h2 className='text-4xl font-extrabold mt-2'>Dashboard</h2>
        <Link to='/dashboard/create'>
          <Button className='flex gap-2' title='Create a new slug'>
            <span className='sr-only'>Create a new slug</span>
            <PlusSquareIcon />
            Create a new slug
          </Button>
        </Link>
      </header>
      <Separator className='my-4' />

      <section className='grid sm:grid-cols-1 md:grid-cols-2 gap-2'>
        {loading && (
          <Fragment>
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <Skeleton
                  key={index.toString()}
                  className='h-32 bg-neutral-900 border-neutral-950 rounded-lg'
                />
              ))}
          </Fragment>
        )}

        {!loading &&
          slugs
            .sort(({ created_at: a }, { created_at: b }) => {
              return Date.parse(b) - Date.parse(a)
            })
            .map((link) => (
              <SlugCard key={link.id} info={link} handleDelete={handleDelete} />
            ))}
      </section>
    </Layout>
  )
}
