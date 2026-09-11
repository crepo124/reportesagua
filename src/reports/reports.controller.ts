import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { EmailService } from '../email/email.service';
import { generateReportTemplate } from './templates/report.template';
import { envs } from '../config/envs';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly emailService: EmailService,
  ) {}

  @Post()
  async create(@Body() dto: CreateReportDto) {
    const report = await this.reportsService.create(dto);
    const template = generateReportTemplate(dto);
    await this.emailService.sendEmail(
      envs.CREW_EMAIL,
      'Nuevo reporte de fuga de agua',
      template,
    );
    return report;
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }
}