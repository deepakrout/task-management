import { PassportStrategy } from '@nestjs/passport';
import {Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.inteface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository) 
        private userRepository: UserRepository
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret91'
        })
    }

    async validate(payload: JwtPayload): Promise<JwtPayload> {
        const { username } = payload;
        const user = await this.userRepository.findOne({ username })
        console.log(`User`, user.username)
        if( !user ) {
            throw new UnauthorizedException();
        }

        return { username: user.username };
    }

}