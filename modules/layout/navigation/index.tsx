import { routes } from './constants';
import { NavigationLink } from './navigation-link';

export const Navigation = () => {
  return (
    <div className='flex items-center gap-0'>
      {routes.map(route => (
        <NavigationLink key={route.href} route={route} />
      ))}
    </div>
  );
};
