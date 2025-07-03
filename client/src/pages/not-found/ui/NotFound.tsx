import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router';

export default function NotFound(): React.JSX.Element {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div>
      <div>
        <h1>404</h1>
        <p>Oops! Page not found</p>
        <Link to="/">В начало</Link>
      </div>
    </div>
  );
}
