import React from 'react';



const Index = ({children,indChild}) => {
    return ( 
        <div>
            {children[indChild]}
        </div>
     );
}
 
export default Index;