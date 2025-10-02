'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {useUser, useAuth} from '@/firebase';
import {signOut} from 'firebase/auth';
import {useRouter} from 'next/navigation';
import { useI18n } from '@/context/I18nContext';

export default function UserMenu() {
  const {user} = useUser();
  const auth = useAuth();
  const { t } = useI18n();
  const router = useRouter();

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  const getInitials = (email: string | null) => {
    if (!email) return 'U';
    return email[0].toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.photoURL || ''} alt={user.email || 'User'} />
            <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{t('UserMenu.signedInAs')}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>{t('UserMenu.logout')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
