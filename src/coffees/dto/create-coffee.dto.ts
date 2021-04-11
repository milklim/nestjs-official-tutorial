import { ArrayUnique, IsArray, IsOptional, IsString } from "class-validator";

export class CreateCoffeeDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsString()
  readonly brand: string;

  @IsArray()
  @ArrayUnique()
  readonly flavors: string[];
}
