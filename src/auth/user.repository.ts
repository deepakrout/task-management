import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
/**
 * User repository 
 * Date: 04/23/2020
 */
@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        const {username, password } = authCredentialDto

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt()
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save()
        }
        catch(error) {
            if (error.code === "23505") {
                throw new ConflictException('Username already exists')
            }
            else {
                throw new InternalServerErrorException(error)
            }
            // console.log("Error occured while creating user", error);
        }
        

    }

    async validateUserPAssword(authCredentialDto: AuthCredentialDto) : Promise<string> {
        const {username, password} = authCredentialDto;
        const user = await this.findOne({ username });

        if (user && await user.validatePassword(password)) {
            return user.username;
        }
        else {
            return null;
        }

    }

    async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}