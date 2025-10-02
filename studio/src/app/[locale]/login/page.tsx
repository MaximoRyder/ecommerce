'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {initiateEmailSignIn, useAuth} from '@/firebase';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useToast} from '@/hooks/use-toast';
import {useI18n} from '@/context/I18nContext';
import Link from 'next/link';

export default function LoginPage() {
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
      initiateEmailSignIn(auth, email, password);
      toast({
        title: t('Login.toast.successTitle'),
        description: t('Login.toast.successDescription'),
      });
      router.push('/');
    } catch (error: any) {
      console.error(error);
      toast({
        title: t('Login.toast.errorTitle'),
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
          <CardTitle>{t('Login.title')}</CardTitle>
          <CardDescription>{t('Login.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('Login.emailLabel')}</Label>
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t('Login.passwordLabel')}</Label>
                <Link href="/forgot-password" className="text-sm underline">
                  {t('Login.forgotPassword')}
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? t('Login.submitting') : t('Login.submitButton')}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {t('Login.noAccount')}{' '}
            <Link href="/register" className="underline">
              {t('Login.signUp')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
