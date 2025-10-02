'use client';

import {useState} from 'react';
import {useAuth} from '@/firebase';
import {sendPasswordResetEmail} from 'firebase/auth';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useToast} from '@/hooks/use-toast';
import {useI18n} from '@/context/I18nContext';
import Link from 'next/link';
import {Mail} from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const auth = useAuth();
  const {toast} = useToast();
  const { t } = useI18n();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
    } catch (error: any) {
      console.error(error);
      toast({
        title: t('ForgotPassword.toast.errorTitle'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (emailSent) {
    return (
      <div className="flex justify-center items-center py-20">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <Mail className="mx-auto h-16 w-16 text-primary" />
            <CardTitle className="mt-4">{t('ForgotPassword.emailSent.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{t('ForgotPassword.emailSent.description', {email})}</p>
            <Button asChild className="mt-6">
              <Link href="/login">{t('ForgotPassword.emailSent.backToLogin')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('ForgotPassword.title')}</CardTitle>
          <CardDescription>{t('ForgotPassword.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('ForgotPassword.emailLabel')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? t('ForgotPassword.submitting') : t('ForgotPassword.submitButton')}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Link href="/login" className="underline">
              {t('ForgotPassword.backToLogin')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
