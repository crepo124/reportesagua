import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { EmailService } from '../email/email.service';
import { StorageService } from '../storage/storage.service';
import { generateReportTemplate } from './templates/report.template';
import { envs } from '../config/envs';

const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5 MB

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly emailService: EmailService,
    private readonly storageService: StorageService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('photo', {
      limits: { fileSize: MAX_PHOTO_SIZE },
      fileFilter: (_req, file, cb) => {
        cb(null, file.mimetype.startsWith('image/'));
      },
    }),
  )
  async create(
    @Body() dto: CreateReportDto,
    @UploadedFile() photo?: { buffer: Buffer; mimetype: string },
  ) {
    if (!photo) {
      throw new BadRequestException(
        'La foto de la fuga es obligatoria (campo "photo", debe ser una imagen)',
      );
    }

    const photoUrl = await this.storageService.uploadFile(photo, 'reports');
    const report = await this.reportsService.create(dto, photoUrl);
    await this.emailService.sendEmail(
      envs.CREW_EMAIL,
      'Nuevo reporte de fuga de agua',
      generateReportTemplate(dto, photoUrl),
    );
    return report;
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }
}