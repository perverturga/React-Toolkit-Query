import React from 'react'
import ExpendablePaenl from './ExpendablePaenl';
import AlbumList from './AlbumList';
import {GoTrash} from "react-icons/go"
import { useRemoveUserMutation } from '../store';
import CircularProgress  from '@mui/material/CircularProgress';

function UsersListItem({user}) {

// bu removeuser benim endpointtek ismim kontorl eden fonksiyonum oclak
  const [removeUser, results] = useRemoveUserMutation();

// burda useer bana zaten props olarak verildiğinden direk user yazabilirim
  const handleClick = ()=> { 
   removeUser(user);
  }

  const header = (
    <>
      <button style={{marginRight: "30px", border: "none", cursor:"pointer"}}
      onClick={handleClick}
      >
        {results.isLoading ? <CircularProgress style={{width:"20px", height:"20px"}}/>
        :  <GoTrash/> }
      </button>
      {user.name}
    </>
  )

  return (
    <div>
      <ExpendablePaenl header={header}>
        <AlbumList user={user}/>
{/* şu kişinin albümü dediğim için ; userListItem dan bana props oalrak gelen userı props oalrak geçmem lazım */}
      </ExpendablePaenl>
    </div>
  )
} 

export default UsersListItem;