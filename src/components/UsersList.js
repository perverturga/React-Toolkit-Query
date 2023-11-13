import React from 'react'
import { useFetchUsersQuery, useAddUserMutation } from '../store';
import Skeleton from  "@mui/material/Skeleton"
import Button from "@mui/material/Button";
import UsersListItem from './UsersListItem';
import { CircularProgress } from '@mui/material';


function UsersList() {
    const {data, isError, isFetching} = useFetchUsersQuery();
// result dönüyor bunu eklemeyi sağlayan metot addUser
    const [addUser, results] = useAddUserMutation();

    const  handleUserAdd = () => {
      addUser();
      // fake olarak isim eklemeyi sonradan yapıcaz
    }


    let content;
    if(isFetching) {
      content= (
        <Skeleton variant="rectangular" sx={{width:"100%", height:"600px"}}/>
      )
    } else if(isError) {
      content = <div>Hata Varrr</div>
    }else {
      content= data.map((user)=>{
        return <UsersListItem Skey={user.id} user={user}/>
        // user diye props karşıya gönderiyorum data olarak her bir objem yani user
      })
    }

  return (
    <div>
      <div className='topArrangement'>
        <h1 style={{fontSize:"20px"}}>Kişiler</h1>
{/* Kişi ekledik ama fetch etmemiz gerekiyor 
yani kişi ekledikten sonra db.jsona geliyor ama ekrana yansımıyor
bunu da tag yönetimi ile yapıcaz*/}
        <Button variant="outlined"
        onClick={handleUserAdd}> 
        {results.isLoading 
        ? ( <CircularProgress style={{}}/> ) 
        : ( <span>Kişi Ekle+</span>)
        }
        </Button>
      </div>

      {content}
    </div>
  )
}

export default UsersList;