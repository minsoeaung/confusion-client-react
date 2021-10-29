import React from 'react';

export const Loading = () => {
    return (
        <div className="col-12">
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"/>
            <p>Loading...</p>
        </div>
    );
}

// import LoadingMask from "react-loadingmask";
// import "react-loadingmask/dist/react-loadingmask.css";



// export const Loading = () => {
//     return (
//         <div>
//             <LoadingMask loading={true} loadingText={"loading..."}>
//               <div style={{ width: 300, height: 300 }}></div>
//             </LoadingMask>
//         </div>
//     );
// }