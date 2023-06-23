import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailDto } from 'src/modules/users/dto/send-mail.dto';
import * as Mailgen from 'mailgen';

const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Motor Sports Web Service',
    link: 'http://localhost:5173',
  },
});

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendEmail({ to, subject, text }: SendEmailDto) {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        html: text,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Erro ao enviar o e-mail, tente novamente!',
      );
    }
  }

  resetPasswordTemplate(email: string, name: string, resetToken: string) {
    const emailSending = {
      body: {
        name: name,
        intro:
          'Você recebeu este e-mail porque foi recebida uma solicitação de redefinição de senha para sua conta.',
        action: {
          instructions: 'Clique no botão abaixo para redefinir sua senha:',
          button: {
            color: '#4529E6',
            text: 'Redefinir sua senha',
            link: `http://localhost:3000/users/resetPassword/${resetToken}`,
          },
        },
        outro:
          'Se você não solicitou uma redefinição de senha, não é necessária nenhuma ação adicional de sua parte.',
      },
    };

    const emailBody = mailGenerator.generate(emailSending);

    const emailTemplate = {
      to: email,
      subject: 'Redefinir senha Motor Sport',
      text: emailBody,
    };

    return emailTemplate;
  }
}
