import { ArrayUnique, IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateCoffeeDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly brand?: string;

  @IsArray()
  @ArrayUnique()
  @IsOptional()
  readonly flavors?: string[];
}
