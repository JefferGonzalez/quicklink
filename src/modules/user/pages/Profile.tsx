import useAuth from '@/hooks/useAuth'
import AccountTab from '@/modules/user/components/AccountTab'
import UserInfoTab from '@/modules/user/components/UserInfoTab'
import { assertAuthenticated } from '@/modules/user/utils/assertAuthenticated'
import { Separator } from '@/shared/ui'
import { cn } from '@/shared/utils/cn'
import { LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react'
import { Fragment, useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const ITEM_CLASSES =
  'text-base text-left w-full flex items-center gap-2 px-3 py-2 cursor-pointer'

export default function Profile() {
  const { user, signOut } = useAuth()
  assertAuthenticated(user)

  const [searchParams, setSearchParams] = useSearchParams()

  const tabs = [
    {
      id: 'user-info',
      title: 'User information',
      icon: UserIcon,
      component: <UserInfoTab />
    },
    {
      id: 'account',
      title: 'Account',
      component: <AccountTab />,
      icon: SettingsIcon
    }
  ]

  const [activeTabId, setActiveTabId] = useState(() => {
    const tabId = searchParams.get('tab')

    const validTab = tabs.find(({ id }) => id === tabId)

    return validTab?.id ?? tabs[0].id
  })

  const activeTabComponent = useMemo(
    () => tabs.find(({ id }) => id === activeTabId)?.component,
    [activeTabId]
  )

  const handleTabClick = useCallback(
    (id: string) => {
      setSearchParams({ tab: id })
      setActiveTabId(id)
    },
    [setSearchParams]
  )

  return (
    <Fragment>
      <header>
        <h2 className='text-2xl md:text-4xl font-extrabold mt-2 mb-1'>
          Settings for {user.name}
        </h2>
        <p className='text-neutral-500'>Manage your user information</p>
      </header>

      <Separator className='my-4' />

      <section className='grid grid-cols-8 gap-4'>
        <aside className='col-span-2'>
          <ul className='text-lg font-semibold space-y-2'>
            {tabs.map((tab) => {
              const isActive = activeTabId === tab.id

              return (
                <li
                  key={tab.id}
                  className={cn(
                    isActive && 'rounded-md border-l-5 border-blue-500'
                  )}
                >
                  <button
                    type='button'
                    onClick={() => handleTabClick(tab.id)}
                    className={cn(
                      ITEM_CLASSES,
                      isActive
                        ? 'bg-neutral-100 border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 rounded-e-md pointer-events-none'
                        : 'hover:underline'
                    )}
                  >
                    <span className='sr-only'>{tab.title}</span>
                    <tab.icon />
                    <span className='hidden sm:inline-block'>{tab.title}</span>
                  </button>
                </li>
              )
            })}

            <Separator className='my-4' />

            <li>
              <button
                className={cn(ITEM_CLASSES, 'hover:underline')}
                onClick={signOut}
                type='button'
              >
                <span className='sr-only'>Sign out</span>
                <LogOutIcon />
                <span className='hidden sm:inline-block'>Sign out</span>
              </button>
            </li>
          </ul>
        </aside>

        <article className='col-span-6'>{activeTabComponent}</article>
      </section>
    </Fragment>
  )
}
