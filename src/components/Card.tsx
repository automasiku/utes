interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => (
  <div className={`bg-white rounded-2xl shadow-lg border border-slate-100 p-6 ${className}`}>
    {children}
  </div>
);
