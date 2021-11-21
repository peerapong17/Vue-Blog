import { Blog } from "./Blog";
import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  BeforeInsert,
} from "typeorm";
import { v4 as uuid4 } from "uuid";
import { User } from "./User";

@Entity()
export class Comment extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @BeforeInsert()
  generateUuid() {
    this.id = uuid4().replace(/-/g, "");
  }

  @Column()
  user_id: string;

  @Column()
  username: string;

  @Column()
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
  // @JoinColumn({ name: "user_id" })
  // user: User;

  @ManyToOne(() => Blog, (blog) => blog.comments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "blog_id" })
  blog: Blog;
}
