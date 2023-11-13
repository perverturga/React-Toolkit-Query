import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {faker} from "@faker-js/faker"

// BURDA TAG YÖNETİMİ FARKLI

const pause = (duration) =>{
    return new Promise((resolve)=> {
        setTimeout(resolve,duration)
    });
}

const albumsApi = createApi({
    reducerPath: "albums",
    baseQuery: fetchBaseQuery({   
        baseUrl: "http://localhost:3000",
        fetchFn: async (...args)=> {
            await pause(1000);
            return fetch(...args);
        },
    }),
    endpoints(builder){
       return {
        fetchAlbums: builder.query({
            //PROVIDED TAGS
// eklediğimde ve sildiğimde yeniden çekmem gerekicek
// kşinin kaç tane albümü varsa dönücem ve type ve id olarak tag olarak eklemeliyim
// ben resultların içindeki albumleri(içinde id de var) içinde döncem
// her bir eleman album
// remove un type ını idsini giriyorum
//bu bir array oldu usersalbums ü push ile ekliyorum
// tagları return ile döndürüoyum 
            providesTags :(result, error, user) => {
                //         albumler        name
                const tags = result.map((album)=>{
                    return {type:"Album" , id:album.id}
                });
                tags.push({type: "UsersAlbums" ,id: user.id});
                return tags;
            },
            query: (user)=> {
                return {
                    url: "/albums",
                    method: "GET",
                    params: {
// herhangi bi body atmıyorum hangi kişiye ait id? query ye user verdim
                        userId: user.id
                    }
                }
            }
        }),
        addAlbum: builder.mutation({
// üçlü yazım tarzınd ailk datadan gleen cevap , sonra error sonra parametre argüman olarak ne?
// type kişinin albumu ve idsi
// birşey eklediğimde yeniden çekme işlemi yapıcam provideda bu usersalbumu 
            invalidatesTags : (result, error, user)=>{
                return [{type :"UsersAlbums", id:user.id}]
            },
            query: (user)=> {
                return {
                    url: "/albums",
                    method: "POST",
                    body: {
//userid ve title vermem gerek
                        userId : user.id,
                        title: faker.commerce.productName(),
                    },
                }
            }
        }),
        removeAlbum: builder.mutation({
// parametre oalrka album gelcek
// albumun id sini iptal etmmem lazım invalidate
            invalidatesTags :(result, error, album) => {
                return [{type: "Album" , id:album.id}]
            },
            query: (album)=> {
// albumün içinde de id bilgisi var dolayısıyla user a ihityacımız yok direk album diyorum
                return {
                    url: `/albums/${album.id}`,
                    method: "DELETE",
                }
            }
        }),
       } 
    }
});



export const {
    useFetchAlbumsQuery, 
    useAddAlbumMutation, 
    useRemoveAlbumMutation} = albumsApi;
export {albumsApi};
