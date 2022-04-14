import { HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthinterceptorService {

  constructor(private tokenService: TokenService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>{
    request = request.clone({
      headers: request.headers.set('authorization', this.tokenService.Token),
    });

    return next.handle(request);
  }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthinterceptorService,
    multi: true
};
