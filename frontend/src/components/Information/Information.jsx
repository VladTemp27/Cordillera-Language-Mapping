import React, { useEffect, useState } from 'react';
import './Information.css';

const Information = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(' ') // TODO: Add the API endpoint
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error('Error fetching information:', error));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="information">
      <div className="information-image">
        <img src={data.image} alt={data.title} />
      </div>

      <div className="information-content">
        <h2>{data.title}</h2>
        <p>{data.description}</p>

        {data.provinces && data.provinces.length > 0 && (
          <div className="province-list">
            {data.provinces.map((province, index) => (
              <div key={index} className="province-card">
                <h3>{province.name}</h3>
                <p><strong>Short History:</strong> {province.history}</p>
                <p>
                  <strong>Ethnic Groups:</strong>{' '}
                  {province.ethnicGroups.length > 0
                    ? province.ethnicGroups.join(', ')
                    : 'No data available'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Information;