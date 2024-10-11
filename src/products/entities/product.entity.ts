import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ProductImage } from './product-image.entity';
import { User } from '../../auth/entities/user.entity';

@Entity({ name: 'products' })
export class Product {

  @ApiProperty({
    example: '1f32bf04-5663-430d-980f-a884a49c1781',
    description: 'Product ID',
    uniqueItems: true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'T-Shirt Teslo',
    description: 'Product Title',
    uniqueItems: true
  })
  @Column('text', {
    unique: true,
  })
  title: string;

  @ApiProperty({
    example: 0,
    description: 'Product price'
  })
  @Column('float', {
    default: 0
  })
  price: number;

  @ApiProperty({
    example: 'Aenean lacinia, nisi non feugiat dapibus, tellus lacus blandit risus, a venenatis ipsum risus vitae sem.',
    description: 'Product description',
    default: null,
  })
  @Column({
    type: 'text',
    nullable: true
  })
  description: string;

  @ApiProperty({
    example: 't_shirt-teslo',
    description: 'Product SLUG - for SEO',
    uniqueItems: true
  })
  @Column('text', {
    unique: true
  })
  slug: string;

  @ApiProperty({
    example: 10,
    description: 'Product stock',
    default: 0
  })
  @Column('int', {
    default: 0
  })
  stock: number;

  @ApiProperty({
    example: ['S', 'M', 'L'],
    description: 'Product sizes',
  })
  @Column('text', {
    array: true
  })
  sizes: string[]
  
  @ApiProperty({
    example: 'women',
    description: 'Product gender',
  })
  @Column('text')
  gender: string;

  @ApiProperty()
  @Column('text', {
    array: true,
    default: []
  })
  tags: string[];

  @ApiProperty()
  @OneToMany(
    () => ProductImage,
    (productImage) => productImage.product,
    { cascade: true, eager: true }
  )
  images?: ProductImage[];

  @ManyToOne(
    () => User,
    ( user ) => user.product,
    { eager: true }
  )
  user: User

  @BeforeInsert()
  checkSlugInsert() {

    if ( !this.slug ) {
      this.slug = this.title;
    }

    this.slug = this.slug
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {

    this.slug = this.slug
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');
  }

}
