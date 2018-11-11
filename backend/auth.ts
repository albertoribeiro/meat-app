import {User,users} from './users'
import{Request,Response} from 'express'
import * as jwt from 'jsonwebtoken'
import {apiConfig} from './api-config'


export const handleAuthentication = (req:Request,resp:Response) =>{
    const user = req.body
    if(isValid(user)){
        const dbUser : User = users[user.email]
        const token = jwt.sign({sub: dbUser.email, iss:'meat-api'},apiConfig.secret)
            resp.json({
              name:dbUser.name,
              email:dbUser.email ,
              accessToken: token 
            })
    }else{
        resp.status(403).json({message:"Dados inválidos"})
    }

    function matches(another:User): boolean{
        return another !== undefined &&
               another.email === this.email &&
               another.password === this.password             
    }

    function isValid(user: User) : boolean {
        if (!user){
            return false
        }else{
            const dbUser = users[user.email]
            return dbUser !== undefined && dbUser.matches(user)
        }
        return false
    }

}