interface CareerConnectLogoProps {
  className?: string
  size?: number
  showText?: boolean
  variant?: 'full' | 'icon'
}

export default function CareerConnectLogo({ 
  className = '', 
  size = 64,
}: CareerConnectLogoProps) {
  // Use the logo.png from public folder
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src="/logo.png"
        alt="CareerConnect"
        width={size}
        height={size}
        className="object-contain"
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  )
}
