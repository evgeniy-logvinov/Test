interface StatusBadgeProps {
  status: string;
  variant?: "default" | "small";
}

export function StatusBadge({ status, variant = "default" }: StatusBadgeProps) {
  const getStatusStyle = (status: string) => {
    const upperStatus = status.toUpperCase();
    
    const styles: Record<string, string> = {
      PENDING: "bg-gray-100 text-gray-700 border-gray-300",
      HOLD: "bg-yellow-100 text-yellow-800 border-yellow-300",
      APPROVED: "bg-blue-100 text-blue-800 border-blue-300",
      COMPLETED: "bg-green-100 text-green-800 border-green-300",
      REJECTED: "bg-red-100 text-red-800 border-red-300",
      FAILED: "bg-red-100 text-red-800 border-red-300",
      ACTIVE: "bg-green-100 text-green-800 border-green-300",
      PAUSED: "bg-yellow-100 text-yellow-800 border-yellow-300",
      BANNED: "bg-red-100 text-red-800 border-red-300",
      PROCESSING: "bg-blue-100 text-blue-800 border-blue-300",
    };
    
    return styles[upperStatus] || "bg-gray-100 text-gray-700 border-gray-300";
  };
  
  const sizeClasses = variant === "small" 
    ? "px-2 py-0.5 text-[11px]" 
    : "px-3 py-1 text-[12px]";
  
  return (
    <span
      className={`inline-flex items-center font-semibold rounded border ${sizeClasses} ${getStatusStyle(
        status
      )}`}
    >
      {status.toUpperCase()}
    </span>
  );
}
