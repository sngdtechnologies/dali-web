import QRCode from 'qrcode';

export async function QrCode({ value, alt, size = 148 }: { value: string; alt: string; size?: number }) {
  const svg = await QRCode.toString(value, {
    type: 'svg',
    margin: 0,
    color: { dark: '#1F3A2E', light: '#FAF6EC' },
  });
  return (
    <div
      role="img"
      aria-label={alt}
      style={{ width: size, height: size }}
      className="[&>svg]:h-full [&>svg]:w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
