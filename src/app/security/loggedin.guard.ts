import {CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import {Injectable} from '@angular/core'
import { LoginService } from './login/login.service';

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate{
    
    constructor (private loginService: LoginService){}

    canLoad(route:Route) : boolean{
        const loggedIn = this.loginService.isLoggedIn()
        if (!loggedIn){
            this.loginService.handleLogin(`/${route.path}`)
        }
        return loggedIn
    }

    checkAuthentication(path:string):boolean{
        const loggedIn = this.loginService.isLoggedIn()
        if(!loggedIn){
            this.loginService.handleLogin(`/${path}`)
        }
        return loggedIn
    }

    canActivate(ActivatedRoute : ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean{
        return this.checkAuthentication(ActivatedRoute.routeConfig.path)
    }
}