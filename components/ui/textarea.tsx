import * as React from 'react';

import { cn } from '@/lib/utils';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';

interface TextareaProps extends TextareaAutosizeProps {
  className?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextareaAutosize
        className={cn(
          'flex w-full border-input-border bg-input text-base font-medium text-muted-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 scrollbar-thumb-black scrollbar-thumb-rounded scrollbar-w-2 scrolling-touch h-6',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';

export { Textarea };
