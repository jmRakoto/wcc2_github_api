import React, { FC, Suspense } from 'react';
import { RouteProps, Outlet } from 'react-router-dom';
import { Loader } from '../components/loader';

export interface Props extends RouteProps {
  redirectPath?: string;
}

const PublicRoute: FC<Props> = (props: Props) => {

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default PublicRoute;
