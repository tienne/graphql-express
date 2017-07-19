import 'reflect-metadata';
import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public username: string;

    @Column()
    public password: string;
    public setPassword = (pw: string) => this.password = pw;

    /**
     * 패스워드 유효성검사
     * @param plainTextPassword
     */
    public validatePassword = async (plainTextPassword : string) => await bcrypt.compare(plainTextPassword, this.password + '');

    public toJson = () => {
        return {
            id: this.id,
            username: this.username
        };
    }
}