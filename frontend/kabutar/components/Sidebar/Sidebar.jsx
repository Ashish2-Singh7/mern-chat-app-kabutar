import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'
import SettingButton from './SettingButton'

const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <div className="mt-auto space-y-5">
        <SettingButton />
        <LogoutButton />
      </div>
    </div>
  )
}

export default Sidebar
