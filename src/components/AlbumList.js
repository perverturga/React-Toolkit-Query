import React from 'react'
import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import { Button, Skeleton } from '@mui/material';
import { CircularProgress } from '@mui/material';
import AlbumsListItem from './AlbumsListItem';

function AlbumList({user}) {
// bana props olarak gelen userı buraya yazıyorum 

const {data, isError, isFetching} = useFetchAlbumsQuery(user);
//parametre olarak user ı aldığı için userı veriyorum
// (providestagsın içindeki 3 lü yazımın sonundaki parametre)

const [addAlbum, results] = useAddAlbumMutation();

const  handleAlbumAdd = () => {
  addAlbum(user);
}


let content;
if(isFetching) {
  content= (
    <Skeleton variant="rectangular" sx={{width:"100%", height:"200px"}}/>

  )
} else if(isError) {
  content = <div>Hata Varrr</div>
}else {
  content= data.map((album)=>{
    return <AlbumsListItem key={album.id} album={album}/>
  })
}

  return (
    <>
      <div>
        <div className='topArrangement'>
          <h3>{user.name} Albümü</h3>
          <Button variant="outlined"
          onClick={handleAlbumAdd}> 
          {results.isLoading 
          ? ( <CircularProgress/> ) 
          : ( <span>Albüm Ekle+</span>)
          }
          </Button>
        </div>
      </div>

      <div>{content}</div> 

    </>
  )
}

export default AlbumList;