/**
 * SCA Sports logo.
 * Uses the PNG image from public/SCA Logo BG.png.
 */
export default function Logo({ size = 36, className = '' }) {
  return (
    <img
      src="/SCA Logo BG.png"
      alt="SCA Sports Logo"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  )
}
