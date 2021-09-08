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
import { Comment } from "./Comment";

@Entity()
export class Blog extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @BeforeInsert()
  generateUuid() {
    this.id = uuid4().replace(/-/g, "");
  }

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  category: string;

  @Column()
  image: string;

  @Column()
  imagePath: string;

  @Column()
  userId: string;

  @Column({
    type: "simple-array",
  })
  like: string[];

  @OneToMany(() => Comment,comment => comment.blog)
  comments: Comment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
