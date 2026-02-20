import { IsNotEmpty, IsOptional, IsString, IsInt, Min } from 'class-validator';

export class KeyValueDto {
  @IsString()
  @IsNotEmpty()
  key!: string;

  @IsString()
  @IsNotEmpty()
  value!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  ttlSeconds?: number;
}
