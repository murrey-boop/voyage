// emails/VerificationEmail.tsx
import { Html, Head, Preview, Body, Container, Text, Link } from '@react-email/components';

export default function VerificationEmail({
  email,
  confirmLink,
}: {
  email: string;
  confirmLink: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Reset Password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={heading}>Hi there,</Text>
          <Text style={paragraph}>
            reset your  password ({email}) by clicking the link below:
          </Text>
          <Link href={confirmLink} style={button}>
            Reset Password
          </Link>
          <Text style={paragraph}>
            If you didn&#39;t request a change of password, please ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Arial, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px',
  maxWidth: '600px',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.5',
  marginBottom: '20px',
};

const button = {
  backgroundColor: '#2563eb',
  borderRadius: '4px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: 'bold',
  padding: '12px 24px',
  textDecoration: 'none',
  marginBottom: '20px',
};