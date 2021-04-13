import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of a coffee.' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Description of the coffee.' })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({ description: 'The brand of a coffee.' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ example: ['Vanilla', 'Coke'] })
  @IsString({ each: true })
  readonly flavors: string[];
}
