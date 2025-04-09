import { ConfigService } from '@nestjs/config';
import { BadRequestException, Injectable } from '@nestjs/common';


@Injectable()
export class CaptchaValidatorService {

  constructor(
    private readonly configService: ConfigService
  ){}

  async validateCaptcha(token: string, ipAddress: string) {
    
    let formData = new FormData();
    formData.append("secret", this.configService.getOrThrow('CLOUDFLARE_CAPTCHA_SECRET_KEY'));
    formData.append("response", token);
    formData.append("remoteip", ipAddress);

    const url = this.configService.getOrThrow('CLOUDFLARE_CAPTCHA_URL');

    const result = await fetch(url, {
      method: "POST",
      body: formData
    });
    const data = await result.json();

    if (!data.succes) throw new BadRequestException('CAPTCHA no valido');

    return { success: true };
  }

}
