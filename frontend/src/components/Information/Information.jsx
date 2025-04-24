import React from 'react';
import './Information.css';

const Information = () => {
  return (
    <div className="information">
      <div className="information-image">
        <img src="" alt="Cordillera Administrative Region" />
          <div className="information-content">
            <p>
            The Cordillera Administrative Region, also known as the Cordillera Region and Cordillera, is an administrative region in the Philippines, 
            situated within the island of Luzon. It is the only landlocked region in the archipelago, bordered by the Ilocos Region to the west and southwest, 
            and by the Cagayan Valley Region to the north, east, and southeast. The region comprises six provinces: Abra, Apayao, Benguet, Ifugao, Kalinga 
            and Mountain Province. The regional center is the highly urbanized city of Baguio, which is the largest city in the region. 
            The region was officially created on July 15, 1987, covering most of the Cordillera Mountain Range of Luzon that is home to numerous ethnic groups. 
            Nueva Vizcaya province has a majority Igorot population transplanted by the American colonial government in the Cagayan Valley Region instead during 
            the early 20th century, as does Quirino. According to the 2020 Census of Population and Housing, this region is the least populated region in the 
            Philippines, less than that of the national capital, the City of Manila.
            </p>
          </div>
      </div>
    </div>
  );
};

export default Information;

// import React, { useEffect, useState } from 'react';
// import './Information.css';

// const Information = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetch(' ') //
//       .then(response => response.json())
//       .then(json => setData(json))
//       .catch(error => console.error('Error fetching information:', error));
//   }, []);
//   return (
//     <div className="information">
//       <div className="information-image">
//         <img src={data.image} alt={data.title} />
//         <div className="information-content">
//           <p>{data.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Information;
