type SvgIconProps = {
  path: string;
  size?: number;
  color?: string; // ej. '#ff0000' o 'red'
  className?: string;
};

export const SvgIcon = ({ path, size = 24, color = 'currentColor', className = '' }: SvgIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d={path} />
  </svg>
);
