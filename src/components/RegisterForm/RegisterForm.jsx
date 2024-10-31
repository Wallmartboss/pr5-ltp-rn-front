/*шаблон сторінки для корекції  */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './RegisterForm.css';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { register as registerUser } from '../../redux/auth/operations.js';

const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(32, 'Name can be up to 32 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password can be up to 64 characters')
    .required('Password is required'),
});

const RegisterForm = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async data => {
    setIsLoading(true);
    try {
      await registerUser(data);
      toast.success('Registration successful! Logging in...');
      onSuccess();
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
    console.log(data);
  };

  return (
    <div className="container">
      <form className="registerForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="formTitle">
          <Link to="/auth/register" className="register">
            Registration
          </Link>
          <Link to="/auth/login" className="login">
            Log In
          </Link>
        </div>
        <input {...register('name')} placeholder="Enter your name" />
        {errors.name && <p>{errors.name.message}</p>}

        <input {...register('email')} placeholder="Enter your email" />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          {...register('password')}
          type="password"
          placeholder="Create a password"
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button className="registerButton" type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register Now'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
