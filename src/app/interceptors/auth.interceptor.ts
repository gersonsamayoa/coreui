import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const session=JSON.parse(localStorage.getItem('session') || '{}');
  const token = localStorage.getItem('token');
  console.log('AuthInterceptor', { token, session });
  console.log('AuthInterceptor', { token, session });
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }
  return next(req);
};