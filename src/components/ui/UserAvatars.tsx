interface UserAvatarsProps {
  className?: string;
}

export function UserAvatars({ className = "w-8 h-8" }: UserAvatarsProps) {
  const avatarClasses = `${className} rounded-full border-2 border-white`;
  
  return (
    <div className="flex -space-x-2">
      <div className={`${avatarClasses} bg-gradient-to-r from-blue-400 to-purple-400`}></div>
      <div className={`${avatarClasses} bg-gradient-to-r from-green-400 to-blue-400`}></div>
      <div className={`${avatarClasses} bg-gradient-to-r from-pink-400 to-red-400`}></div>
    </div>
  );
}