// Component Variant Type Definitions for TypeScript
export const ComponentVariants = {
  Button: {
    variant: ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'magic', 'magic-dark', 'magic-rainbow'],
    size: ['sm', 'md', 'lg', 'xl']
  },
  Card: {
    variant: ['default', 'elevated', 'outlined', 'interactive', 'magic', 'magic-dark', 'magic-glow'],
    padding: ['none', 'sm', 'md', 'lg']
  },
  Badge: {
    variant: ['primary', 'secondary', 'outline', 'destructive', 'success', 'warning', 'magic'],
    size: ['sm', 'md', 'lg']
  },
  Alert: {
    variant: ['default', 'destructive', 'success', 'warning', 'magic'],
    size: ['sm', 'md', 'lg']
  },
  Input: {
    variant: ['default', 'filled', 'outlined', 'magic'],
    size: ['sm', 'md', 'lg']
  },
  Modal: {
    variant: ['default', 'centered', 'fullscreen'],
    size: ['sm', 'md', 'lg', 'xl']
  },
  DatePicker: {
    variant: ['default', 'outlined', 'filled', 'magic'],
    size: ['sm', 'md', 'lg']
  },
  ColorPicker: {
    variant: ['default', 'compact', 'advanced'],
    size: ['sm', 'md', 'lg']
  },
  Checkbox: {
    variant: ['default', 'filled', 'outlined'],
    size: ['sm', 'md', 'lg']
  },
  Tabs: {
    variant: ['default', 'pills', 'underline'],
    size: ['sm', 'md', 'lg']
  },
  Slider: {
    variant: ['default', 'filled', 'gradient'],
    size: ['sm', 'md', 'lg']
  },
  Switch: {
    variant: ['default', 'ios', 'android'],
    size: ['sm', 'md', 'lg']
  }
};

// TypeScript interface definitions as string for export
export const ComponentVariantTypes = `export interface ButtonVariants {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'magic' | 'magic-dark' | 'magic-rainbow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface CardVariants {
  variant?: 'default' | 'elevated' | 'outlined' | 'magic';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface BadgeVariants {
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning' | 'magic';
  size?: 'sm' | 'md' | 'lg';
}

export interface AlertVariants {
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'magic';
  size?: 'sm' | 'md' | 'lg';
}

export interface InputVariants {
  variant?: 'default' | 'filled' | 'outlined' | 'magic';
  size?: 'sm' | 'md' | 'lg';
}

export interface ModalVariants {
  variant?: 'default' | 'centered' | 'fullscreen';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface DatePickerVariants {
  variant?: 'default' | 'outlined' | 'filled' | 'magic';
  size?: 'sm' | 'md' | 'lg';
}

export interface ColorPickerVariants {
  variant?: 'default' | 'compact' | 'advanced';
  size?: 'sm' | 'md' | 'lg';
}

export interface CheckboxVariants {
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
}

export interface TabsVariants {
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
}

export interface SliderVariants {
  variant?: 'default' | 'filled' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
}

export interface SwitchVariants {
  variant?: 'default' | 'ios' | 'android';
  size?: 'sm' | 'md' | 'lg';
}`;

// Magic CSS Animations - Add these to your global CSS or Tailwind config
export const magicAnimations = `
/* Magic Gradient Animations */
@keyframes gradient-x {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes gradient-y {
  0%, 100% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
}

@keyframes gradient-xy {
  0%, 100% {
    background-position: 0% 0%;
  }
  25% {
    background-position: 100% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  75% {
    background-position: 0% 100%;
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Tailwind Custom Animation Classes */
.animate-gradient-x {
  animation: gradient-x 3s ease infinite;
}

.animate-gradient-y {
  animation: gradient-y 3s ease infinite;
}

.animate-gradient-xy {
  animation: gradient-xy 4s ease infinite;
}

.animate-shimmer {
  animation: shimmer 2s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}
`;

export const componentTemplates = {
  Button: {
    name: 'Button',
    description: 'Interactive button components with various styles and states',
    category: 'Interactive',
    variants: [
      {
        name: 'Button',
        description: 'Versatile button component with multiple variants and sizes',
        template: `import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';

// Button-specific TypeScript interface
export interface ButtonVariants {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'magic' | 'magic-dark' | 'magic-rainbow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center {{BORDER_RADIUS}} {{FONT_FAMILY}} font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        
        primary: "bg-white {{SECONDARY_BORDER}} border {{SECONDARY_TEXT}} {{SHADOW}} hover:bg-gray-50 {{SECONDARY_FOCUS}}",
        secondary: "bg-white {{SECONDARY_BORDER}} border {{SECONDARY_TEXT}} {{SHADOW}} hover:bg-gray-50 {{SECONDARY_FOCUS}}",
        outline: "bg-transparent {{PRIMARY_BORDER}} border-2 {{PRIMARY_TEXT}} {{PRIMARY_HOVER}} hover:text-white {{PRIMARY_FOCUS}}",
        ghost: "bg-transparent {{PRIMARY_TEXT}} hover:bg-gray-100 {{PRIMARY_FOCUS}}",
        destructive: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
        magic: "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-lg hover:shadow-xl focus:ring-purple-500 animate-gradient-x bg-[length:400%_400%] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        "magic-dark": "bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 text-white shadow-lg hover:shadow-xl focus:ring-indigo-500 animate-pulse relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-cyan-400/30 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000",
        "magic-rainbow": "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg hover:shadow-2xl focus:ring-pink-500 animate-gradient-xy bg-[length:400%_400%] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-45deg before:from-transparent before:via-white/25 before:to-transparent before:translate-x-[-100%] before:translate-y-[-100%] hover:before:translate-x-[100%] hover:before:translate-y-[100%] before:transition-transform before:duration-1000"
      },
      size: {
        sm: "{{SPACING.x}} {{SPACING.y}} text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
        xl: "px-8 py-4 text-xl"
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = "primary", 
  size = "md", 
  className,
  ...props 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;`,
        props: [
          { name: 'children', type: 'ReactNode', description: 'Button content' },
          { name: 'onClick', type: 'function', description: 'Click handler' },
          { name: 'disabled', type: 'boolean', description: 'Disabled state' },
          { name: 'variant', type: 'string', description: 'Button variant (primary, secondary, outline, ghost, destructive, magic, magic-dark, magic-rainbow)' },
          { name: 'size', type: 'string', description: 'Button size (sm, md, lg, xl)' },
          { name: 'className', type: 'string', description: 'Additional CSS classes' }
        ]
      }
    ]
  },

  Card: {
    name: 'Card',
    description: 'Container components for displaying content',
    category: 'Layout',
    variants: [
      {
        name: 'Card',
        description: 'Versatile card component with multiple variants',
        template: `import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';

// Card-specific TypeScript interface
export interface CardVariants {
  variant?: 'default' | 'elevated' | 'outlined' | 'interactive' | 'magic' | 'magic-dark' | 'magic-glow';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const cardVariants = cva(
  // Base styles
  "bg-white {{BORDER_RADIUS}} border border-gray-200",
  {
    variants: {
      variant: {
        default: "{{SHADOW}} p-6",
        elevated: "shadow-lg p-6",
        outlined: "border-2 p-6",
        interactive: "{{SHADOW}} p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105",
        magic: "shadow-lg p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border border-purple-200 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-purple-200/50 before:to-transparent before:translate-x-[-100%] before:animate-shimmer before:duration-2000",
        "magic-dark": "shadow-xl p-6 bg-gradient-to-br from-gray-900 via-purple-900/50 to-indigo-900 border border-purple-500/30 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-cyan-400/20 before:to-transparent before:translate-x-[-100%] before:animate-shimmer before:duration-3000",
        "magic-glow": "shadow-2xl p-6 bg-gradient-to-br from-white via-blue-50 to-purple-50 border-2 border-transparent bg-clip-padding relative overflow-hidden animate-pulse-slow before:absolute before:inset-0 before:bg-gradient-to-45deg before:from-blue-400/20 before:via-purple-400/20 before:to-pink-400/20 before:animate-spin-slow"
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8"
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "md"
    }
  }
);

const Card = ({ 
  children, 
  variant = "default", 
  padding,
  title,
  headerAction,
  onClick,
  className,
  ...props 
}) => {
  const hasHeader = title || headerAction;
  
  return (
    <div
      onClick={onClick}
      className={clsx(
        cardVariants({ 
          variant, 
          padding: hasHeader ? "none" : padding 
        }), 
        className
      )}
      {...props}
    >
      {hasHeader && (
        <div className="{{PRIMARY_COLOR}} px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white {{FONT_FAMILY}}">{title}</h3>
            {headerAction && <div>{headerAction}</div>}
          </div>
        </div>
      )}
      <div className={hasHeader ? "p-6" : ""}>
        {children}
      </div>
    </div>
  );
};

export default Card;`,
        props: [
          { name: 'children', type: 'ReactNode', description: 'Card content' },
          { name: 'variant', type: 'string', description: 'Card variant (default, elevated, outlined, interactive, magic, magic-dark, magic-glow)' },
          { name: 'padding', type: 'string', description: 'Card padding (none, sm, md, lg)' },
          { name: 'title', type: 'string', description: 'Optional header title' },
          { name: 'headerAction', type: 'ReactNode', description: 'Optional header action element' },
          { name: 'onClick', type: 'function', description: 'Click handler for interactive cards' },
          { name: 'className', type: 'string', description: 'Additional CSS classes' }
        ]
      }
    ]
  },

  Input: {
    name: 'Input',
    description: 'Form input components',
    category: 'Forms',
    variants: [
      {
        name: 'Input',
        description: 'Versatile input component with multiple variants',
        template: `import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';

// Input-specific TypeScript interface
export interface InputVariants {
  variant?: 'default' | 'error' | 'success' | 'magic' | 'magic-glow';
  size?: 'sm' | 'md' | 'lg';
}

const inputVariants = cva(
  // Base styles
  "w-full {{SPACING.x}} {{SPACING.y}} {{BORDER_RADIUS}} {{FONT_FAMILY}} focus:outline-none focus:ring-2 focus:border-transparent transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "border border-gray-300 focus:ring-blue-500",
        error: "border border-red-500 focus:ring-red-500",
        success: "border border-green-500 focus:ring-green-500",
        magic: "border-2 border-purple-300 focus:ring-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 focus:from-purple-100 focus:to-pink-100 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-purple-200/30 before:to-transparent before:translate-x-[-100%] focus:before:animate-shimmer before:duration-1500",
        "magic-glow": "border-2 border-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[2px] focus:ring-purple-500 relative before:absolute before:inset-[2px] before:bg-white before:rounded-[inherit] focus:before:bg-gradient-to-r focus:before:from-indigo-50 focus:before:to-purple-50"
      },
      size: {
        sm: "px-2 py-1 text-sm",
        md: "{{SPACING.x}} {{SPACING.y}} text-base",
        lg: "px-4 py-3 text-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

const Input = ({ 
  label, 
  error, 
  placeholder, 
  value, 
  onChange, 
  required = false, 
  type = "text",
  variant,
  size = "md",
  rows,
  className,
  ...props 
}) => {
  const isTextarea = type === "textarea";
  const inputVariant = error ? "error" : variant || "default";
  
  const InputComponent = isTextarea ? "textarea" : "input";
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 {{FONT_FAMILY}}">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <InputComponent
        type={isTextarea ? undefined : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={isTextarea ? rows || 4 : undefined}
        className={clsx(
          inputVariants({ variant: inputVariant, size }), 
          isTextarea && "resize-vertical",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 {{FONT_FAMILY}}">{error}</p>
      )}
    </div>
  );
};

export default Input;`,
        props: [
          { name: 'label', type: 'string', description: 'Input label' },
          { name: 'error', type: 'string', description: 'Error message' },
          { name: 'placeholder', type: 'string', description: 'Placeholder text' },
          { name: 'value', type: 'string', description: 'Input value' },
          { name: 'onChange', type: 'function', description: 'Change handler' },
          { name: 'required', type: 'boolean', description: 'Required field indicator' },
          { name: 'type', type: 'string', description: 'Input type (text, email, password, textarea, etc.)' },
          { name: 'variant', type: 'string', description: 'Input variant (default, error, success, magic, magic-glow)' },
          { name: 'size', type: 'string', description: 'Input size (sm, md, lg)' },
          { name: 'rows', type: 'number', description: 'Number of rows for textarea' },
          { name: 'className', type: 'string', description: 'Additional CSS classes' }
        ]
      }
    ]
  },

  Badge: {
    name: 'Badge',
    description: 'Small status indicators and labels',
    category: 'Display',
    variants: [
      {
        name: 'Badge',
        description: 'Versatile badge component with multiple variants and sizes',
        template: `import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';

const badgeVariants = cva(
  // Base styles
  "inline-flex items-center {{BORDER_RADIUS}} {{FONT_FAMILY}} font-medium",
  {
    variants: {
      variant: {
        primary: "{{PRIMARY_COLOR}} text-white",
        secondary: "{{SECONDARY_COLOR}} text-white",
        accent: "{{ACCENT_COLOR}} text-white",
        success: "bg-green-500 text-white",
        warning: "bg-yellow-500 text-white",
        error: "bg-red-500 text-white",
        outline: "border {{PRIMARY_BORDER}} {{PRIMARY_TEXT}} bg-transparent",
        soft: "{{PRIMARY_COLOR}}/10 {{PRIMARY_TEXT}}",
        magic: "bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white animate-gradient-x bg-[length:200%_200%] shadow-lg",
        "magic-sparkle": "bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white animate-pulse shadow-md relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:translate-x-[-100%] before:animate-shimmer before:duration-1500",
        "magic-cosmic": "bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-800 text-white animate-gradient-xy bg-[length:400%_400%] shadow-lg relative before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] before:animate-ping before:duration-2000"
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "{{SPACING.x}} {{SPACING.y}} text-sm",
        lg: "px-4 py-2 text-base"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

const Badge = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  className,
  ...props 
}) => {
  return (
    <span 
      className={clsx(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;`,
        props: [
          { name: 'children', type: 'ReactNode', description: 'Badge content' },
          { name: 'variant', type: 'string', description: 'Badge variant (primary, secondary, accent, success, warning, error, outline, soft, magic, magic-sparkle, magic-cosmic)' },
          { name: 'size', type: 'string', description: 'Badge size (sm, md, lg)' },
          { name: 'className', type: 'string', description: 'Additional CSS classes' }
        ]
      }
    ]
  },

  Alert: {
    name: 'Alert',
    description: 'Notification and alert components',
    category: 'Feedback',
    variants: [
      {
        name: 'Alert',
        description: 'Versatile alert component with multiple variants',
        template: `import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';

const alertVariants = cva(
  // Base styles
  "{{BORDER_RADIUS}} border p-4",
  {
    variants: {
      variant: {
        info: "bg-blue-50 border-blue-200 text-blue-800",
        success: "bg-green-50 border-green-200 text-green-800",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
        error: "bg-red-50 border-red-200 text-red-800",
        default: "bg-gray-50 border-gray-200 text-gray-800",
        magic: "bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 border-purple-300 text-purple-900 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-purple-200/50 before:to-transparent before:translate-x-[-100%] before:animate-shimmer before:duration-2000",
        "magic-alert": "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 border-purple-400 text-white shadow-lg animate-pulse-slow relative before:absolute before:inset-0 before:bg-gradient-to-45deg before:from-cyan-400/20 before:via-purple-400/20 before:to-pink-400/20 before:animate-spin-slow"
      }
    },
    defaultVariants: {
      variant: "info"
    }
  }
);

const Alert = ({ 
  title, 
  children, 
  variant = "info", 
  onClose, 
  className,
  ...props 
}) => {
  return (
    <div 
      className={clsx(alertVariants({ variant }), className)}
      {...props}
    >
      <div className="flex items-start">
        <div className="flex-1">
          {title && (
            <h4 className="font-medium {{FONT_FAMILY}} mb-1">{title}</h4>
          )}
          <div className="{{FONT_FAMILY}}">{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-current hover:opacity-75 focus:outline-none"
          >
            <span className="sr-only">Close</span>
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;`,
        props: [
          { name: 'title', type: 'string', description: 'Optional alert title' },
          { name: 'children', type: 'ReactNode', description: 'Alert content' },
          { name: 'variant', type: 'string', description: 'Alert variant (info, success, warning, error, default, magic, magic-alert)' },
          { name: 'onClose', type: 'function', description: 'Close handler function' },
          { name: 'className', type: 'string', description: 'Additional CSS classes' }
        ]
      }
    ]
  },

  Modal: {
    name: 'Modal',
    description: 'Overlay dialog components',
    category: 'Overlay',
    variants: [
      {
        name: 'Basic',
        description: 'Standard modal dialog',
        template: `const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />
        
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white {{SHADOW}} {{BORDER_RADIUS}}">
          {title && (
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 {{FONT_FAMILY}}">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                ×
              </button>
            </div>
          )}
          
          <div className="{{FONT_FAMILY}}">
            {children}
          </div>
          
          {footer && (
            <div className="mt-6 flex justify-end space-x-3">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;`
      }
    ]
  },

  DatePicker: {
    name: 'DatePicker',
    description: 'Date selection input components',
    category: 'Forms',
    variants: [
      {
        name: 'DatePicker',
        description: 'Date picker input with calendar functionality',
        template: `import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { useState } from 'react';

const datePickerVariants = cva(
  // Base styles
  "w-full {{SPACING.x}} {{SPACING.y}} {{BORDER_RADIUS}} {{FONT_FAMILY}} focus:outline-none focus:ring-2 focus:border-transparent transition-colors duration-200 cursor-pointer",
  {
    variants: {
      variant: {
        default: "border border-gray-300 focus:ring-blue-500 bg-white",
        error: "border border-red-500 focus:ring-red-500 bg-white",
        success: "border border-green-500 focus:ring-green-500 bg-white"
      },
      size: {
        sm: "px-2 py-1 text-sm",
        md: "{{SPACING.x}} {{SPACING.y}} text-base",
        lg: "px-4 py-3 text-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

const DatePicker = ({ 
  label, 
  error, 
  value, 
  onChange, 
  required = false, 
  variant,
  size = "md",
  placeholder = "Select date",
  className,
  ...props 
}) => {
  const inputVariant = error ? "error" : variant || "default";
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 {{FONT_FAMILY}}">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type="date"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(datePickerVariants({ variant: inputVariant, size }), className)}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 {{FONT_FAMILY}}">{error}</p>
      )}
    </div>
  );
};

export default DatePicker;`,
        props: [
          { name: 'label', type: 'string', description: 'Date picker label' },
          { name: 'error', type: 'string', description: 'Error message' },
          { name: 'value', type: 'string', description: 'Selected date value (YYYY-MM-DD)' },
          { name: 'onChange', type: 'function', description: 'Change handler' },
          { name: 'required', type: 'boolean', description: 'Required field indicator' },
          { name: 'variant', type: 'string', description: 'Date picker variant (default, error, success)' },
          { name: 'size', type: 'string', description: 'Date picker size (sm, md, lg)' },
          { name: 'placeholder', type: 'string', description: 'Placeholder text' },
          { name: 'className', type: 'string', description: 'Additional CSS classes' }
        ]
      }
    ]
  },

  ColorPicker: {
    name: 'ColorPicker',
    description: 'Color selection input components',
    category: 'Forms',
    variants: [
      {
        name: 'ColorPicker',
        description: 'Color picker input with preview',
        template: `import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';

const colorPickerVariants = cva(
  // Base styles
  "{{BORDER_RADIUS}} {{FONT_FAMILY}} focus:outline-none focus:ring-2 focus:border-transparent transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "border border-gray-300 focus:ring-blue-500",
        error: "border border-red-500 focus:ring-red-500",
        success: "border border-green-500 focus:ring-green-500"
      },
      size: {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

const ColorPicker = ({ 
  label, 
  error, 
  value = "#000000", 
  onChange, 
  required = false, 
  variant,
  size = "md",
  showHex = true,
  className,
  ...props 
}) => {
  const inputVariant = error ? "error" : variant || "default";
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 {{FONT_FAMILY}}">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="flex items-center space-x-3">
        <input
          type="color"
          value={value}
          onChange={onChange}
          className={clsx(colorPickerVariants({ variant: inputVariant, size }), "cursor-pointer", className)}
          {...props}
        />
        {showHex && (
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="px-3 py-2 border border-gray-300 {{BORDER_RADIUS}} {{FONT_FAMILY}} text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="#000000"
          />
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600 {{FONT_FAMILY}}">{error}</p>
      )}
    </div>
  );
};

export default ColorPicker;`,
        props: [
          { name: 'label', type: 'string', description: 'Color picker label' },
          { name: 'error', type: 'string', description: 'Error message' },
          { name: 'value', type: 'string', description: 'Selected color value (hex)' },
          { name: 'onChange', type: 'function', description: 'Change handler' },
          { name: 'required', type: 'boolean', description: 'Required field indicator' },
          { name: 'variant', type: 'string', description: 'Color picker variant (default, error, success)' },
          { name: 'size', type: 'string', description: 'Color picker size (sm, md, lg)' },
          { name: 'showHex', type: 'boolean', description: 'Show hex input field' },
          { name: 'className', type: 'string', description: 'Additional CSS classes' }
        ]
      }
    ]
  },

  Checkbox: {
    name: 'Checkbox',
    description: 'Checkbox input components',
    category: 'Forms',
    variants: [
      {
        name: 'Checkbox',
        description: 'Checkbox input with label and variants',
        template: `import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';

const checkboxVariants = cva(
  // Base styles
  "{{BORDER_RADIUS}} border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "{{PRIMARY_COLOR}} border-gray-300 text-white focus:ring-blue-500",
        success: "bg-green-500 border-green-500 text-white focus:ring-green-500",
        warning: "bg-yellow-500 border-yellow-500 text-white focus:ring-yellow-500",
        error: "bg-red-500 border-red-500 text-white focus:ring-red-500"
      },
      size: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

const Checkbox = ({ 
  label, 
  checked = false, 
  onChange, 
  variant = "default",
  size = "md",
  disabled = false,
  className,
  ...props 
}) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={clsx(
          checkboxVariants({ variant, size }), 
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      />
      {label && (
        <label className={clsx(
          "{{FONT_FAMILY}} text-gray-700 cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed",
          size === "sm" && "text-sm",
          size === "md" && "text-base",
          size === "lg" && "text-lg"
        )}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;`,
        props: [
          { name: 'label', type: 'string', description: 'Checkbox label' },
          { name: 'checked', type: 'boolean', description: 'Checked state' },
          { name: 'onChange', type: 'function', description: 'Change handler' },
          { name: 'variant', type: 'string', description: 'Checkbox variant (default, success, warning, error)' },
          { name: 'size', type: 'string', description: 'Checkbox size (sm, md, lg)' },
          { name: 'disabled', type: 'boolean', description: 'Disabled state' },
          { name: 'className', type: 'string', description: 'Additional CSS classes' }
        ]
      }
    ]
  },

  Tabs: {
    name: 'Tabs',
    description: 'Tab navigation components',
    category: 'Navigation',
    variants: [
      {
        name: 'Tabs',
        description: 'Tab container with multiple variants',
        template: `import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { useState } from 'react';

const tabsVariants = cva(
  // Base styles
  "flex border-b",
  {
    variants: {
      variant: {
        default: "border-gray-200",
        pills: "border-none bg-gray-100 {{BORDER_RADIUS}} p-1",
        underline: "border-gray-200"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

const tabVariants = cva(
  // Base tab styles
  "px-4 py-2 {{FONT_FAMILY}} font-medium transition-colors duration-200 cursor-pointer focus:outline-none",
  {
    variants: {
      variant: {
        default: "border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300",
        pills: "{{BORDER_RADIUS}} hover:bg-gray-200",
        underline: "border-b-2 border-transparent hover:border-gray-300"
      },
      active: {
        true: "",
        false: "text-gray-500"
      }
    },
    compoundVariants: [
      {
        variant: "default",
        active: true,
        class: "{{PRIMARY_COLOR}} {{PRIMARY_TEXT}} {{PRIMARY_BORDER}}"
      },
      {
        variant: "pills",
        active: true,
        class: "{{PRIMARY_COLOR}} text-white"
      },
      {
        variant: "underline",
        active: true,
        class: "{{PRIMARY_TEXT}} {{PRIMARY_BORDER}}"
      }
    ],
    defaultVariants: {
      variant: "default",
      active: false
    }
  }
);

const Tabs = ({ 
  tabs = [], 
  defaultTab = 0, 
  variant = "default",
  className,
  ...props 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <div className="w-full">
      <div className={clsx(tabsVariants({ variant }), className)} {...props}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={tabVariants({ 
              variant, 
              active: activeTab === index 
            })}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};

export default Tabs;`,
        props: [
          { name: 'tabs', type: 'array', description: 'Array of tab objects with label and content' },
          { name: 'defaultTab', type: 'number', description: 'Default active tab index' },
          { name: 'variant', type: 'string', description: 'Tabs variant (default, pills, underline)' },
          { name: 'className', type: 'string', description: 'Additional CSS classes' }
        ]
      }
    ]
  },

  Slider: {
    name: 'Slider',
    description: 'Range slider input components',
    category: 'Forms',
    variants: [
      {
        name: 'Slider',
        description: 'Range slider with customizable appearance',
        template: `import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';

const sliderVariants = cva(
  // Base styles
  "w-full h-2 {{BORDER_RADIUS}} appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-gray-200 focus:ring-blue-500",
        success: "bg-gray-200 focus:ring-green-500",
        warning: "bg-gray-200 focus:ring-yellow-500",
        error: "bg-gray-200 focus:ring-red-500"
      },
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

const Slider = ({ 
  label, 
  value = 50, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1,
  variant = "default",
  size = "md",
  showValue = true,
  className,
  ...props 
}) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700 {{FONT_FAMILY}}">
            {label}
          </label>
          {showValue && (
            <span className="text-sm text-gray-500 {{FONT_FAMILY}}">{value}</span>
          )}
        </div>
      )}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          className={clsx(sliderVariants({ variant, size }), className)}
          style={{
            background: \`linear-gradient(to right, {{PRIMARY_COLOR}} 0%, {{PRIMARY_COLOR}} \${percentage}%, #e5e7eb \${percentage}%, #e5e7eb 100%)\`
          }}
          {...props}
        />
      </div>
    </div>
  );
};

export default Slider;`,
        props: [
          { name: 'label', type: 'string', description: 'Slider label' },
          { name: 'value', type: 'number', description: 'Current slider value' },
          { name: 'onChange', type: 'function', description: 'Change handler' },
          { name: 'min', type: 'number', description: 'Minimum value' },
          { name: 'max', type: 'number', description: 'Maximum value' },
          { name: 'step', type: 'number', description: 'Step increment' },
          { name: 'variant', type: 'string', description: 'Slider variant (default, success, warning, error)' },
          { name: 'size', type: 'string', description: 'Slider size (sm, md, lg)' },
          { name: 'showValue', type: 'boolean', description: 'Show current value' },
          { name: 'className', type: 'string', description: 'Additional CSS classes' }
        ]
      }
    ]
  },

  Switch: {
    name: 'Switch',
    description: 'Toggle switch components',
    category: 'Forms',
    variants: [
      {
        name: 'Switch',
        description: 'Toggle switch with multiple variants',
        template: `import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';

const switchVariants = cva(
  // Base styles
  "relative inline-flex items-center {{BORDER_RADIUS}} transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer",
  {
    variants: {
      variant: {
        default: "focus:ring-blue-500",
        success: "focus:ring-green-500",
        warning: "focus:ring-yellow-500",
        error: "focus:ring-red-500"
      },
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-14"
      },
      checked: {
        true: "",
        false: "bg-gray-200"
      }
    },
    compoundVariants: [
      {
        variant: "default",
        checked: true,
        class: "{{PRIMARY_COLOR}}"
      },
      {
        variant: "success",
        checked: true,
        class: "bg-green-500"
      },
      {
        variant: "warning",
        checked: true,
        class: "bg-yellow-500"
      },
      {
        variant: "error",
        checked: true,
        class: "bg-red-500"
      }
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      checked: false
    }
  }
);

const thumbVariants = cva(
  // Base thumb styles
  "inline-block bg-white {{BORDER_RADIUS}} shadow transform transition-transform duration-200",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6"
      },
      checked: {
        true: "",
        false: "translate-x-0"
      }
    },
    compoundVariants: [
      {
        size: "sm",
        checked: true,
        class: "translate-x-4"
      },
      {
        size: "md",
        checked: true,
        class: "translate-x-5"
      },
      {
        size: "lg",
        checked: true,
        class: "translate-x-7"
      }
    ],
    defaultVariants: {
      size: "md",
      checked: false
    }
  }
);

const Switch = ({ 
  label, 
  checked = false, 
  onChange, 
  variant = "default",
  size = "md",
  disabled = false,
  className,
  ...props 
}) => {
  return (
    <div className="flex items-center space-x-3">
      <button
        type="button"
        onClick={() => !disabled && onChange && onChange(!checked)}
        disabled={disabled}
        className={clsx(
          switchVariants({ variant, size, checked }), 
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        <span className={thumbVariants({ size, checked })} />
      </button>
      {label && (
        <label className={clsx(
          "{{FONT_FAMILY}} text-gray-700",
          disabled && "opacity-50",
          size === "sm" && "text-sm",
          size === "md" && "text-base",
          size === "lg" && "text-lg"
        )}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Switch;`,
        props: [
          { name: 'label', type: 'string', description: 'Switch label' },
          { name: 'checked', type: 'boolean', description: 'Checked state' },
          { name: 'onChange', type: 'function', description: 'Change handler' },
          { name: 'variant', type: 'string', description: 'Switch variant (default, success, warning, error)' },
          { name: 'size', type: 'string', description: 'Switch size (sm, md, lg)' },
          { name: 'disabled', type: 'boolean', description: 'Disabled state' },
          { name: 'className', type: 'string', description: 'Additional CSS classes' }
        ]
      }
    ]
  }
};
