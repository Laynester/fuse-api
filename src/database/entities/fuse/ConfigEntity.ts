import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity('fuse_config')
/*
 * Author: Laynester
 * © - 2021
 */
export class ConfigEntity extends BaseEntity
{
    @PrimaryColumn({ name: 'key', unique: true })
    public key: string;

    @Column({ name: 'value', nullable: true })
    public value: string;
}