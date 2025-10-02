"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useI18n } from "@/context/I18nContext";

export default function LanguageSwitcher() {
  const { t, locale } = useI18n();
  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (value: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${value}`);
    router.replace(newPath);
  };

  return (
    <Select value={locale} onValueChange={onSelectChange}>
      <SelectTrigger className="w-auto border-0 gap-2">
        <Globe className="h-5 w-5" />
        <SelectValue placeholder={t('LanguageSwitcher.label')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">{t('LanguageSwitcher.en')}</SelectItem>
        <SelectItem value="es">{t('LanguageSwitcher.es')}</SelectItem>
        <SelectItem value="pt">{t('LanguageSwitcher.pt')}</SelectItem>
      </SelectContent>
    </Select>
  );
}
