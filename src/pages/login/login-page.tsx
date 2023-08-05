import { Helmet } from 'react-helmet-async';
import { Link, Navigate } from 'react-router-dom';
import { FormEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions.ts';
import { AppRoute, AuthorizationStatus } from '../../const.ts';

function LoginPage() {
  const dispatch = useAppDispatch();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const authorizationStatus = useAppSelector(({ authStatus }) => authStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const formSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current && passwordRef.current) {
      dispatch(loginAction({
        login: loginRef.current?.value,
        password: passwordRef.current?.value,
      }));
    }
  };
  if (isAuth) {
    return <Navigate to={ AppRoute.Main }/>;
  }
  return (
    <>
      <Helmet>
        <title>Six cities. Login</title>
      </Helmet>
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form
            className="login__form form"
            method="post"
            onSubmit={ formSubmitHandler }
          >
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input ref={ loginRef } className="login__input form__input" type="email" name="email" placeholder="Email" required/>
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input ref={ passwordRef } className="login__input form__input" type="password" name="password" placeholder="Password"
                required
              />
            </div>
            <button className="login__submit form__submit button" type="submit">
              Sign in
            </button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link to={ AppRoute.Main } className="locations__item-link" style={{ cursor: 'pointer' }}>
              <span>Amsterdam</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default LoginPage;
