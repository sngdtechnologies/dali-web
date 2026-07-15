import Image from 'next/image';

export function PhoneFrame({ src, width = 236 }: { src: string; width?: number }) {
  return (
    <div className="relative rounded-[40px] bg-encre p-2.5 shadow-2xl ring-1 ring-black/10" style={{ width }}>
      <div className="overflow-hidden rounded-[32px] bg-foret-900">
        <div className="relative aspect-[9/19]">
          <Image src={src} alt="" fill sizes={`${width}px`} className="object-cover object-top" />
        </div>
      </div>
    </div>
  );
}
