import Layout from '@/components/Layout'
import ProfileForm from '@/components/ProfileForm'
import { Separator } from '@/components/ui/separator'
import { AuthContext } from '@/context/AuthContext'
import { LogOutIcon, UserIcon } from 'lucide-react'
import { Fragment, useContext } from 'react'

export default function Profile(): JSX.Element {
  const {
    auth: { user },
    logout
  } = useContext(AuthContext)

  return (
    <Layout>
      {user && (
        <Fragment>
          <header>
            <h2 className='text-2xl md:text-4xl font-extrabold mt-2 mb-1'>
              Settings for {user.name}
            </h2>
            <p className='text-neutral-500'>Manage your user information</p>
          </header>
          <Separator className='my-4 bg-neutral-800' />
          <section className='grid grid-cols-8 gap-4'>
            <aside className='rounded-md shadow-md col-span-2'>
              <ul className='text-lg font-semibold space-y-2'>
                <li className='cursor-pointer flex items-center gap-2 bg-neutral-950 px-5 py-2 rounded-md'>
                  <span className='sr-only'>User information</span>
                  <UserIcon />
                  <span className='hidden sm:inline-block'>
                    User information
                  </span>
                </li>
                <li
                  className='cursor-pointer flex items-center gap-2 px-5 py-2 rounded-md hover:underline'
                  onClick={logout}
                >
                  <span className='sr-only'>Sign out</span>
                  <LogOutIcon />
                  <span className='hidden sm:inline-block'>Sign out</span>
                </li>
              </ul>
            </aside>
            <article className='rounded-md shadow-md col-span-6'>
              <h3 className='text-2xl font-bold'>User information</h3>
              <Separator className='my-4 bg-neutral-800' />

              <ProfileForm user={user} />
            </article>
          </section>
        </Fragment>
      )}
    </Layout>
  )
}
