import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export const BorderWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return <div className={cn('bg-card border rounded-sm', className)}>{children}</div>;
};
