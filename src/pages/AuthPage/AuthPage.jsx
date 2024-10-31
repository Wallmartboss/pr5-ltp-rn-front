/*шаблон сторінки для корекції  */
import { useNavigate, useParams } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import RegisterForm from '../../components/RegisterForm/RegisterForm.jsx';
import './AuthPage.css';

const AuthPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/home');
  };

  return (
    <div className="auth-page">
      {id === 'login' ? (
        <LoginForm onSuccess={handleSuccess} />
      ) : (
        <RegisterForm onSuccess={handleSuccess} />
      )}
    </div>
  );
};

export default AuthPage;
