import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('accounts')
/*
 * Author: Laynester
 * © - 2021
 */
export class AccountEntity extends BaseEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: "email", select: false })
    public email: string;

    @Column({ name: 'password', select: false })
    public password: string;

    @Column({ name: 'birthdate', select: false })
    public birthdate: string;

    @Column({ name: 'last_login' })
    public lastLogin: number;
}