import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundScreen: FC = () => {
  const navigate = useNavigate();

  const back = () => navigate('/', { replace: true });

  return (
    <div>
      404 page
      <button onClick={back}>Back to Home</button>
    </div>
  );
};

export default NotFoundScreen;
