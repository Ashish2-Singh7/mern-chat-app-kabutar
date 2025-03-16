import React from 'react'
import { AnimatePresence } from 'motion/react';
import * as motion from "motion/react-client";

import Sidebar from '../../components/Sidebar/Sidebar'
import MessageContainer from '../../components/message/MessageContainer'
import Settings from '../../components/Sidebar/Settings';

import { useSettingsContext } from '../../context/SettingContext';


const Home = () => {
  const { showSettings } = useSettingsContext();
  return (
    <div className='flex sm:h-[450px] md:h-[600px] rounded-lg overflow-hidden bg-white/5 bg-clip-padding backdrop-filter backdrop-blur-lg'>
      <AnimatePresence initial={false}>
        {showSettings ? <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "-100%" }}
        ><Settings /></motion.div> : <Sidebar />}
      </AnimatePresence>
      <MessageContainer />
    </div>
  )
}

export default Home
