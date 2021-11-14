import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AccountEntity } from "..";

@Entity('users')
/*
 * Author: Laynester
 * © - 2021
 */
export class UserEntity extends BaseEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'owner_id' })
    public owner_id: number;

    @Column({ name: 'username', unique: true })
    public username: string;

    @Column({ name: 'real_name', nullable: true, select: false })
    public real_name: string;

    @Column({ name: 'password', select: false, default: "", nullable: true })
    public password: string;

    @Column({ name: 'mail', select: false, nullable: true })
    public mail: string;

    @Column({ name: 'mail_verified', select: false, default: 0 })
    public mail_verified: number;

    @Column({ name: 'account_created' })
    public account_created: number;

    @Column({ name: 'account_day_of_birth', default: 0, select: false })
    public account_day_of_birth: number;

    @Column({ name: 'last_login', select: false })
    public last_login: number;

    @Column({ name: 'last_online', default: 0, select: false })
    public last_online: number;

    @Column({ name: 'motto', nullable: true, default: "Im New" })
    public motto: string;

    @Column({ name: 'look', default: 'lg-270-82.hd-180-1.ch-210-66.sh-290-81.hr-100-40' })
    public look: string;

    @Column({ name: 'gender', type: 'enum', enum: ['M', 'F'], default: 'M', select: false })
    public gender: string;

    @Column({ name: 'rank', default: 1, select: false })
    public rank: number;

    @Column({ name: 'credits', default: 0, select: false })
    public credits: number;

    @Column({ name: 'pixels', default: 0, select: false })
    public pixels: number;

    @Column({ name: 'points', default: 0, select: false })
    public points: number;

    @Column({ name: 'online', type: 'enum', enum: ['0', '1', '2'], default: '0', select: false })
    public online: number;

    @Column({ name: 'auth_ticket', default: 0, select: false })
    public auth_ticket: string;

    @Column({ name: 'ip_register', default: '127.0.0.1', select: false })
    public ip_register: string;

    @Column({ name: 'ip_current', default: '127.0.0.1', select: false })
    public ip_current: string;

    @Column({ name: 'machine_id', nullable: true, select: false })
    public machine_id: string;

    @Column({ name: 'home_room', default: 0, select: false })
    public home_room: number;

    @ManyToOne(type => AccountEntity)
    @JoinColumn({ name: "owner_id" })
    public account: AccountEntity;

}