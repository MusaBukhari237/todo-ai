import React from 'react';
import NavBar from './components/NavBar'
import { itemTemplate } from './misc/globalVariables';
import Todo from './components/Todo';
import Notifications from './misc/Notification';

export default function Home() {

  return (
    <div className='h-full bg-base-100'>
      <NavBar />

      <Todo />

      <div className="toast toast-end" id="notifications" ></div>

    </div>
  )
}
