import { Flavor } from '../entities/flavor.entity';

export class CreateCoffeeDto {
  readonly name: string;
  readonly brand: string;
  readonly flavors: string[];
}
