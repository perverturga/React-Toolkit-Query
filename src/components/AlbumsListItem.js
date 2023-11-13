import React from 'react'
import ExpendablePaenl from './ExpendablePaenl';
import PhotoList from './PhotoList';
import {GoTrash} from "react-icons/go"
import { useRemoveAlbumMutation, useRemoveUserMutation } from '../store';
import CircularProgress  from '@mui/material/CircularProgress';

function AlbumsListItem({album}) {
    const [removeAlbum, results] = useRemoveAlbumMutation();

    const handleClick = ()=> { 
     removeAlbum(album);
    }

  const header = (
    <>
      <button style={{marginRight: "30px", border: "none", cursor:"pointer"}}
      onClick={handleClick}
      >
        {results.isLoading ? <CircularProgress style={{width:"20px", height:"20px"}}/>
        :  <GoTrash/> }
      </button>
      {album.title}
    </>
  )


  return (
    <div>
      <ExpendablePaenl header={header}>
        <PhotoList album={album}/>
      </ExpendablePaenl>
    </div>
  )
}

export default AlbumsListItem;