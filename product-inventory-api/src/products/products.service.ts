import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ILike } from 'typeorm';


@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Products) private productsRepo: Repository<Products>,) { }
    
    async create(dto: CreateProductDto) {
        const product = await this.productsRepo.save(dto)

        return {
            message: "Product created successfully ! "
            ,data : product,
        }
    }

    async findAll() {
        const products = await this.productsRepo.find({
            order: { createdAt: 'DESC' } // newest first ,
            
        })

        return {
            message: "All products fetched ",
            count: products.length,
            data : products,
        }
    }

    async findOne(id: number) {
        const product = await this.productsRepo.findOne({ where: { id } })
        
        if (!product) {
            throw new NotFoundException(`Product Not Found with id ${id}`)
        }
        
        return {
            message: "Product Found ",
        
            data : product,
        }
    
    }
    //Using partial DTO so that we can optionally update needed things only 
    async update(id: number, dto: PartialUpdateProductDto) {
        await this.findOne(id)

        await this.productsRepo.update(id, dto)
        
        const updatedProduct = await this.findOne(id) 
        
        return {
            message: 'Product partially updated Patch successfully ',
            data : updatedProduct.data,
        }
        
    }

// Using UpdateProductDto so that everything needs to be updated and there is no optional 
    async replace(id: number, dto: UpdateProductDto) {
        await this.findOne(id)

        await this.productsRepo.update(id, dto)
        
        const replacedProduct = await this.findOne(id)

        return {
            message: "Product is completely replaced with new one ",
            data : replacedProduct.data
        }
    } 


    async remove(id: number) {
        await this.findOne(id)

        await this.productsRepo.delete(id)
        return {
            message: "Product deleted successfully ",id
        }
    }

    async findByCategory(category: string) {
   

      const products = await this.productsRepo.find({ where: { category } });

      return { message: `Products grabbed for category: ${category}`, count: products.length, data: products };
        
    
    }

    async search(keyword: string) {
    // ILike = Case-Insensitive Search. 
    const products = await this.productsRepo.find({
      where: { name: ILike(`%${keyword}%`) },
    });
    return { message: `Search results for: ${keyword}`, count: products.length, data: products };
    }

    async toggleActive(id: number) {
        const productData = await this.findOne(id);
        
        const product = productData.data;
        
    // Flip the boolean
    product.isActive = !product.isActive;
    
    // repo.save() is smart enough to UPDATE if the object already has an ID!
    const updatedProduct = await this.productsRepo.save(product);
    
    return { message: 'Product active status toggled', data: updatedProduct };
  }

}
