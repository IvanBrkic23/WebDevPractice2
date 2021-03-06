import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";
import { Feature } from "./Feature";
@Index("FK_category_category", ["parentCategoryId"], {})
@Index("uq_category_image_path", ["imagePath"], { unique: true })
@Index("uq_category_name", ["name"], { unique: true })
@Entity("category", { schema: "aplikacija" })
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "category_id", unsigned: true })
  categoryId: number;
  @Column("varchar", {
    name: "name",
    unique: true,
    length: 32,
    default: () => "'0'",
  })
  name: string;
  @Column("varchar", {
    name: "image_path",
    unique: true,
    length: 128,
    default: () => "'0'",
  })
  imagePath: string;
  @Column("int", {
    name: "parent__category_id",
    nullable: true,
    unsigned: true,
  })
  parentCategoryId: number | null;
  @OneToMany(() => Article, (article) => article.category)
  articles: Article[];
  @ManyToOne(() => Category, (category) => category.categories, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "parent__category_id", referencedColumnName: "categoryId" },
  ])
  parentCategory: Category;
  @OneToMany(() => Category, (category) => category.parentCategory)
  categories: Category[];
  @OneToMany(() => Feature, (feature) => feature.category)
  features: Feature[];
}
