import React from 'react';

import './RoomUsers.css';

const RoomUsers = ({users, joinedUserName})=>{
  return(
    <div className="roomUsers">
      {users.map( (user, i)=><div key={i} className={user.name === joinedUserName ? 'chip actualUser' : 'chip'}> <span >{user.name}</span></div>)}
    </div>
  )
}

export default RoomUsers;