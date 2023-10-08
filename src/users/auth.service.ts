import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async register(name: string, email: string, password: string) {
        // check apakah ada user yang menggunakan email yang sama
        const users = await this.usersService.find(email);
        if (users.length) {
            throw new BadRequestException('Email sudah terdaftar');
        }


        // hash password
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 64)) as Buffer;
        const hashedPassword = salt + '.' + hash.toString('hex');

        // create user
        const user = await this.usersService.create(name, email, hashedPassword);

        return user;
    }

    async login(email: string, password: string) {
        const [user] = await this.usersService.find(email);
        if (!user) {
            throw new NotFoundException('Email tidak terdaftar');
        }

        const [salt, storedHash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 64)) as Buffer;
        if(storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Password salah');
        }

        return user;
    }
}