import {
    Entity,
    Column,
    BaseEntity,
    CreateDateColumn,
    PrimaryColumn,
    BeforeInsert,
  } from "typeorm";
  import { v4 as uuid4 } from "uuid";
  
  @Entity()
  export class Token extends BaseEntity {
    @PrimaryColumn()
    id: string;
  
    @BeforeInsert()
    generateUuid() {
      this.id = uuid4().replace(/-/g, "");
    }
  
    @Column()
    userId: string;
  
    @Column()
    token: string;
  
    @CreateDateColumn()
    public created_at: Date;
  
  }
  