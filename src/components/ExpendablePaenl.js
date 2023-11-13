// açılır kapanır panel old için expendablepanel diyorum
// panelde kişinin albümlere listelenek
// albümleri içeren bitane daha componetn
// bir componentin içine diğer componenti geçersem bu props.children dır

import React from 'react'
import { useState } from 'react'
import {GoChevronLeft, GoChevronDown} from "react-icons/go"


// props olarak sadece içindekileri bastırmak istediğim içn props.children yazıyrum
function ExpendablePaenl({header, children}) {

  const [expanded, setExpanded] = useState(false)
  const handleClick= ()=>{
    setExpanded(!expanded);
// true yaparsam hep açık olur ama değiliyle bilikte yaparsam truenysa false ; false sa ture yapr 
// bunu da aşağı children propsunda tanmlıcam
  }

  return (
    <div className='panelDiv'>

      <div className='topArrangement'>
        <div className='topArrangement'>{header}</div>
        <div onClick={handleClick}>
         {expanded ? <GoChevronDown/> :  <GoChevronLeft/>}
        </div>
      </div>

{/* ve işaretiyle expanded doğru olduğundan childrenları gösterecek */}
      {expanded && <div>{children}</div>}
    </div>
  )
}

export default ExpendablePaenl;