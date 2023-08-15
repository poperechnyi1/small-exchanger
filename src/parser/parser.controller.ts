import { Controller, Post } from '@nestjs/common';

@Controller('parser')
export class ParserController {
  @Post()
  importDumpFrpmJSON(): string {
    return 'import';
  }
}
