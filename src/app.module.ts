import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/database.configuration';
import { Administrator } from 'entities/administrator.entity';
import { AdministratorService } from './services/administrator/administrator.service';
import { ArticleFeature } from 'output/entities/ArticleFeature';
import { ArticlePrice } from 'output/entities/ArticlePrice';
import { Article } from 'output/entities/Article';
import { CartArticle } from 'output/entities/CartArticle';
import { Cart } from 'output/entities/Cart';
import { Category } from 'output/entities/Category';
import { Feature } from 'output/entities/Feature';
import { Order } from 'output/entities/Order';
import { Photo } from 'output/entities/Photo';
import { User } from 'output/entities/User';
import { AdministratorController } from './controllers/api/administrator.controller';
import { CategoryController } from './controllers/api/category.controller';
import { CategoryService } from './services/category/category.service';
import { ArticleService } from './services/article/article.service';
import { ArticleController } from './controllers/api/article.controller';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfiguration.hostname,
      port: 3306,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      entities: [
        Administrator,
        ArticleFeature,
        ArticlePrice,
        Article,
        CartArticle,
        Cart,
        Category,
        Feature,
        Order,
        Photo,
        User,
      ]
    }),
    TypeOrmModule.forFeature ([
      Administrator,
      Category,
      Article,
      ArticlePrice,
      ArticleFeature,
      Feature
      
    ])
  ],
  controllers: [
    AppController,
    AdministratorController,
    CategoryController,
    ArticleController,
  ],
  providers: [
    AdministratorService,
    CategoryService,
    ArticleService,
  ],
})
export class AppModule {}
