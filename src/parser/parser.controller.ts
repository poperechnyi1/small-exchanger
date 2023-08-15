import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request } from 'express';

@Controller('parser')
export class ParserController {
  @Post('import')
  async importDumpFromRawText(@Req() request: Request, @Res() res) {
    const rawBody = await this.getRawBody(request);
    console.log(9, rawBody);
    const convertedJSON = this.parseIndentedTextToJSON(rawBody);
    res.send(convertedJSON);
  }

  private getRawBody(request: Request): Promise<string> {
    return new Promise((resolve, reject) => {
      let rawBody = '';
      request.on('data', (chunk) => {
        rawBody += chunk.toString();
      });

      request.on('end', () => {
        resolve(rawBody);
      });

      request.on('error', (error) => {
        reject(error);
      });
    });
  }

  private parseIndentedTextToJSON(text) {
    const lines = text.split('\n');
    const result = {};
    const stack = [];

    for (const line of lines) {
      const indentation = line.search(/\S/);
      const content = line.trim();

      while (stack.length > indentation) {
        stack.pop();
      }

      if (content.includes('=')) {
        const [key, value] = content.split('=').map((item) => item.trim());
        stack[stack.length - 1][key] = value;
      } else {
        const newObj = {};
        if (stack.length === 0) {
          result[content] = newObj;
        } else {
          stack[stack.length - 1][content] = newObj;
        }
        stack.push(newObj);
      }
    }

    return result;
  }
}
