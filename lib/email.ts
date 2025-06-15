// lib/email.ts
import { Resend } from 'resend';
import { render } from '@react-email/render';
import VerificationEmail from '@/emails/VerificationEmail';
import PasswordResetEmail from '@/emails/PasswordResetEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `${process.env.NEXTAUTH_URL}/auth/verify/${token}`;

  const html = await render(VerificationEmail({ email, confirmLink }));

  await resend.emails.send({
    from: 'no-reply@yourdomain.com',
    to: email,
    subject: 'Verify your email',
    html,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const confirmLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

  const html = await render(PasswordResetEmail({ email, confirmLink }));

  await resend.emails.send({
    from: 'no-reply@yourdomain.com',
    to: email,
    subject: 'Reset your password',
    html,
  });
}