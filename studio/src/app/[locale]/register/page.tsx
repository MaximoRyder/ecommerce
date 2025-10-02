'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {initiateEmailSignUp, useAuth} from '@/firebase';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useToast} from '@/hooks/use-toast';
import {useI18n} from '@/context/I18nContext';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const {toast} = useToast();
  const { t } = useI18n();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // We don't await this, the state change will be handled by the auth listener
      initiateEmailSignUp(auth, email, password);
      toast({
        title: t('Register.toast.successTitle'),
        description: t('Register.toast.successDescription'),
      });
      router.push('/');
    } catch (error: any) {
      console.error(error);
      toast({
        title: t('Register.toast.errorTitle'),
        description: error.message,
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('Register.title')}</CardTitle>
          <CardDescription>{t('Register.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('Register.emailLabel')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('Register.passwordLabel')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? t('Register.submitting') : t('Register.submitButton')}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {t('Register.hasAccount')}{' '}
            <Link href="/login" className="underline">
              {t('Register.signIn')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
