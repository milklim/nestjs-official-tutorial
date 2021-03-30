import { IsOptional, IsPositive, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @Max(100)
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
