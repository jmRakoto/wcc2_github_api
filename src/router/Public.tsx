import React, { FC, Suspense } from 'react';
import { RouteProps, Outlet } from 'react-router-dom';

export interface Props extends RouteProps {
  redirectPath?: string;
}

const PublicRoute: FC<Props> = (props: Props) => {

  return (
    <div>
      <Suspense fallback={<div>Loading</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default PublicRoute;
