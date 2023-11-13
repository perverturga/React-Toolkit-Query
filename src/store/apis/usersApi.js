import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {faker} from "@faker-js/faker"


// Skeleton ekledim fakat bunun hemen gidip gitmesi yerine pause arrowfunctionu kurdum
// bunu promise le yaptım bunu da fetchFn de belirityorum
//böylece endpointlerinde fetch,add,removelarda 1 sn isteği bekletiyor
const pause = (duration) =>{
    return new Promise((resolve)=> {
        setTimeout(resolve,duration)
    });
}

const usersApi = createApi({
    // index.js de path le ulaşırım
    reducerPath: "users",
    // nereye istek atıcam
    baseQuery: fetchBaseQuery({   
        baseUrl: "http://localhost:3000",
        fetchFn: async (...args)=> {
            await pause(1000);
            return fetch(...args);
        },
    }),
    // data çekme ekleme kişileri kaldırmayı endpointte tutuyoruz
    endpoints(builder){
       return {
    // reduxtoolkitquery de 2 şey vardır
    // builder.query datayı çekmek; builder.mutation datayı eklemek,silmek,update ederken
    // burda kişileri çekicem query kullancam ismine fetchuser diye veriyorum..
        fetchUsers: builder.query({
            providesTags: ["User"],
            query: ()=> {
                return {
                    url: "/users",
                    method: "GET",
    // Http requestlerde getrequest bişeyi çekmek için ; put update için; post eklemek, delete silmek için     
                }
            }
        }),
        addUser: builder.mutation({
    // ben her adduser yatığımda db.json a yazıcak ama ekranda yansımıyocka
    // ben invalidateTags diyerek usertagını iptal edip yeniden çekme ihtiyacı doğurtcam
    // bunu kişi ekledikten sonra yapmam gerektiği gbi kişi sildikten sonra da yapmalıy/ım
    // server da 3 eleman varken ekranda 4 tane olcak yanlış bi durum
            invalidatesTags: ()=>{
                return [{type: "User"}]
            },
            query: ()=> {
                return {
                    url: "/users",
                    method: "POST",
    // kişiyi eklcem bunu body nin içinde yani parametre olarak vericem
    // aslında body de name ve id vermem lazım ama bişeyi eklediğimde jsonserver otomatik id veriyor
    // hangisini eklediğimi parametre olarak geçiyorum
                    body: {
                        name : faker.name.fullName(),
                    },
                }
            }
        }),
        removeUser: builder.mutation({
            invalidatesTags: ()=>{
                return [{type: "User"}]
            },
            query: (user)=> {
                return {
                    url: `/users/${user.id}`,
                    method: "DELETE",
    // DELETE YPARKEN ID DE ISTER DOLAYSIYLA QUERY YE USER GEÇİP AŞAĞIDA ID VERİYORUM
                }
            }
        }),
       } 
    }
});


// endpointleri dışarı açıyorum bi apiya dışarı,  bide apinin içindeki endpointleri dışarı açmam lazım
export const {useFetchUsersQuery, useAddUserMutation, useRemoveUserMutation} = usersApi;
export {usersApi};
