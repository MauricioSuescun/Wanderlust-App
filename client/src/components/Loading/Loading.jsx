import React from 'react';



export default function Loading ({setLoading}){
 return(
     <div>
         <div>
            <img src='../Images/loading.gif' alt='Cargando...'/>
         </div>
         <div>
             {
                 setTimeout(() =>{
                     setLoading(false)
                 }, 2000)
             }
         </div>
     </div>
 )
}