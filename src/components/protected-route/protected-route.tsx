import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Убедитесь, что используете правильный импорт для useSelector
import { Preloader } from '../ui/preloader';
import { getUserState } from '../../services/slices/userSlice';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const location = useLocation();

  const { userData, isAuthChecked, isAuthenticated } =
    useSelector(getUserState);

  // Если пользователь не аутентифицирован и не разрешен доступ к неаутентифицированным
  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  // Если пользователь аутентифицирован и пытается получить доступ к незащищенному маршруту
  if (onlyUnAuth && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  // Если состояние аутентификации еще не проверено
  if (!isAuthChecked) {
    return <Preloader />;
  }

  // Если все проверки пройдены, отобразите дочерние компоненты
  return children;
};
