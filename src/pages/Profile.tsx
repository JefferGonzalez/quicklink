import AccountTab from '@/components/AccountTab'
import UserInfoTab from '@/components/UserInfoTab'
import { Separator } from '@/components/ui/separator'
import useAuth from '@/hooks/useAuth'
import { assertAuthenticated } from '@/lib/auth/assertAuthenticated'
import { LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react'
import { Fragment, useState } from 'react'

const ITEM_CLASSES =
  'cursor-pointer flex items-center gap-2 px-5 py-2 rounded-md'

export default function Profile(): JSX.Element {
  const { user, logout } = useAuth()
  assertAuthenticated(user)

  const TABS = [
    {
      title: 'User information',
      icon: UserIcon,
      component: <UserInfoTab />
    },
    {
      title: 'Account',
      component: <AccountTab />,
      icon: SettingsIcon
    }
  ]

  const [activeTab, setActiveTab] = useState(TABS[0].title)

  return (
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
            {TABS.map((tab) => (
              <li
                key={tab.title}
                className={`${ITEM_CLASSES} ${
                  activeTab === tab.title ? 'bg-neutral-900' : 'hover:underline'
                }`}
                onClick={() => setActiveTab(tab.title)}
              >
                <span className='sr-only'>{tab.title}</span>
                <tab.icon />
                <span className='hidden sm:inline-block'>{tab.title}</span>
              </li>
            ))}

            <Separator className='my-4 bg-neutral-800' />

            <li className={`${ITEM_CLASSES} hover:underline`} onClick={logout}>
              <span className='sr-only'>Sign out</span>
              <LogOutIcon />
              <span className='hidden sm:inline-block'>Sign out</span>
            </li>
          </ul>
        </aside>

        <article className='rounded-md shadow-md col-span-6'>
          {TABS.find(({ title }) => title === activeTab)?.component}
        </article>
      </section>
    </Fragment>
  )
}
