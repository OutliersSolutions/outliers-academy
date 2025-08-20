'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateAvatarColor, getUserInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  email?: string;
  image?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10', 
  lg: 'h-16 w-16',
  xl: 'h-24 w-24'
};

const textSizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg'
};

export function UserAvatar({ 
  name, 
  email, 
  image, 
  size = 'md', 
  className 
}: UserAvatarProps) {
  const avatarColor = generateAvatarColor(name);
  const initials = getUserInitials(name);
  const avatarSrc = image ? (image.startsWith('data:') ? image : `data:image/png;base64,${image}`) : undefined;

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      <AvatarImage src={avatarSrc} alt={name} />
      <AvatarFallback className={cn(`text-white ${avatarColor}`, textSizeClasses[size])}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}