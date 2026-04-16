interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'danger' | 'warning'; // 어떤 스타일을 쓸지 선택지 추가
  className?: string;
  type?: 'button' | 'submit';
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
        primary: "bg-teal-500 hover:bg-teal-600 text-white text-sm w-16", // 기본
        danger: "bg-red-400 hover:bg-red-500 text-white text-sm w-16", // 삭제 
        warning: "bg-violet-500 hover:bg-violet-600 text-white text-sm w-16", // 수정
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