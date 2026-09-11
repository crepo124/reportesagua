import { Injectable } from '@nestjs/common';
import { ReportsRepository } from './reports.repository';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(private readonly reportsRepository: ReportsRepository) {}

  create(dto: CreateReportDto): Promise<Report> {
    return this.reportsRepository.create({
      address: dto.address,
      description: dto.description,
      severity: dto.severity,
      reporterPhone: dto.reporterPhone,
      isResolved: false,
    });
  }

  findAll(): Promise<Report[]> {
    return this.reportsRepository.findAll();
  }
}