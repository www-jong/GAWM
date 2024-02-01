// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const Look = () => {
//     const params = useParams(); // 1
//     const userId = params.id; // 2
  
//     const [user, setUser] = useState({});
  
//     useEffect(() => {
//       fetch(`https://reqres.in/api/users/${userId}`) // 3
//         .then((response) => response.json())
//         .then((result) => setUser(result.data));
//     }, [userId]); // 4
  
//     const { first_name, email, avatar } = user;
  
//     return (
//       <section>
//         <article>
//           <p>
//             <strong>{first_name}</strong>
//           </p>
//           <p>{email}</p>
//           <img alt="avatar" src={avatar} />
//         </article>
//       </section>
//     );
//   };
  
//   export default Look;