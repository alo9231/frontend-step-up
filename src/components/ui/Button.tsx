interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'danger'; // 어떤 스타일을 쓸지 선택지 추가
  className?: string;
}

export const Button = ({ 
        children, 
        onClick, 
        variant = 'primary', // 기본값은 primary
        className = '' 
    }: ButtonProps) => {
        
    // 공통 스타일
    const baseStyles = "px-4 py-2 rounded font-medium transition-colors shadow-sm";

    // 종류별 스타일
    const variants = {
        primary: "bg-teal-500 hover:bg-teal-600 text-white",
        danger: "bg-red-400 hover:bg-red-500 text-white text-xs px-2 py-1", // 삭제 버튼용
    };

    return(
        <button 
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            >
            {children}
        </button>
    )

};