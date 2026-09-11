import { IsIn, IsString, MinLength } from 'class-validator';

export class CreateReportDto {
  @IsString()
  @MinLength(1)
  address!: string;

  @IsString()
  @MinLength(1)
  description!: string;

  @IsIn(['low', 'medium', 'high'])
  severity!: 'low' | 'medium' | 'high';

  @IsString()
  @MinLength(1)
  reporterPhone!: string;
}