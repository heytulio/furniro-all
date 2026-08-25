import {
  PaginatedResult,
  Product,
  ProductCreateDTO,
  ProductQueryParams,
  ProductUpdateDTO,
} from "../model/product";

export default interface ProductService {
  create(item: ProductCreateDTO): Promise<Product>;
  getAll(query: ProductQueryParams): Promise<PaginatedResult<Product>>;
  findById(id: string): Promise<Product | null>;
  findBySlug(slug: string): Promise<Product | null>;
  update(id: string, item: ProductUpdateDTO): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
}
