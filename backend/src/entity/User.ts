import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  BeforeInsert,
} from "typeorm";
import { v4 as uuid4 } from "uuid";

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @BeforeInsert()
  generateUuid() {
    this.id = uuid4().replace(/-/g, "");
  }

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

}
