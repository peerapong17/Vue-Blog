import { Comment } from './Comment';
import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import { v4 as uuid4 } from "uuid";
import { Blog } from "./Blog";

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

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  password: string;

  @Column({
    nullable: true,
  })
  googleId: string;

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];

  // @OneToMany(() => Comment, (comment) => comment.user)
  // comments: Comment[];

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
