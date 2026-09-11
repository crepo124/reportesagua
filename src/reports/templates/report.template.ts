import { CreateReportDto } from '../dtos/create-report.dto';

const escapeHtml = (value: string): string =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const severityLabel: Record<string, string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
};

const detailRow = (label: string, value: string): string => `
  <tr>
    <td style="padding:10px 16px;border-bottom:1px solid #e0e0e0;font-family:Arial,sans-serif;font-size:13px;color:#666;">${label}</td>
    <td style="padding:10px 16px;border-bottom:1px solid #e0e0e0;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;color:#222;">${value}</td>
  </tr>`;

export const generateReportTemplate = (dto: CreateReportDto): string => {
  const safeAddress = escapeHtml(dto.address);
  const safeDescription = escapeHtml(dto.description);
  const safePhone = escapeHtml(dto.reporterPhone);
  const safeSeverity = severityLabel[dto.severity] ?? escapeHtml(dto.severity);

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>Nuevo reporte de fuga de agua</title>
</head>
<body style="margin:0;padding:0;background-color:#f2f4f8;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;background-color:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e0e0e0;">
          <tr>
            <td style="background-color:#0e5fae;padding:20px 24px;">
              <div style="font-family:Arial,sans-serif;font-size:18px;font-weight:bold;color:#ffffff;">💧 Nuevo reporte de fuga de agua</div>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 24px 8px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${detailRow('Dirección', safeAddress)}
${detailRow('Descripción', safeDescription)}
${detailRow('Severidad', safeSeverity)}
${detailRow('Teléfono de contacto', safePhone)}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px 24px 24px;font-family:Arial,sans-serif;font-size:13px;color:#666;">
              Se solicita atender este reporte a la brevedad posible.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};