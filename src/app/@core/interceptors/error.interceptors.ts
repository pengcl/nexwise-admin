import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';

import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AuthService} from '../../pages/auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authSvc: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(tap(
      res => this.handleResponse(res, req, next),
      err => this.handleResponse(err, req, next)
    ));
  }

  private handleResponse(res: any, req, next): void {
    if (res.status === 401) {
      this.authSvc.requestAuth();
    }
    if (res.status === 0) {
      /*this.dialogSvc.show({
        content: '无法链接服务器',
        cancel: '',
        confirm: '我知道了',
      }).subscribe();*/
    } else {
      if (res.body) {
      }
    }
  }
}
