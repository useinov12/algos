import React, { useState, useEffect } from 'react'

function useDelayUnmount({isMounted, delayTime }) {
    const [hasTransitionedIn, setHasTransitionedIn ] = useState(false)

    useEffect(()=>{
        let timeoutId;
        if(isMounted && hasTransitionedIn ){
            setHasTransitionedIn(true)
        } else if(!isMounted && hasTransitionedIn ){
            timeoutId = setTimeout(()=> setHasTransitionedIn(false), delayTime)
        }
        return clearTimeout(timeoutId)
    }, [delayTime, isMounted, hasTransitionedIn])
    return hasTransitionedIn
}

export default useDelayUnmount
