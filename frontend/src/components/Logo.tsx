interface LogoProps {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const sizeMap = {
    sm: 120,
    md: 160,
    lg: 200,
  }

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/logo.png"
        alt="CareerConnect"
        className="object-contain"
        style={{
          height: sizeMap[size],
          width: 'auto',
          maxWidth: '100%',
        }}
      />
    </div>
  )
}
