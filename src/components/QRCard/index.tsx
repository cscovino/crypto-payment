import { useQRCode } from 'next-qrcode';

interface QRCardProps {
  info: string;
  size?: number;
}
export default function QRCard({ info, size = 150 }: QRCardProps) {
  const { Canvas } = useQRCode();
  return (
    <div className="w-[12.375rem] h-[12.375rem] rounded-lg shadow-modal p-6">
      <Canvas
        text={info}
        options={{
          scale: 2,
          errorCorrectionLevel: 'L',
          margin: 0,
          width: size,
          color: {
            dark: '#000',
            light: '#FFF',
          },
        }}
      />
    </div>
  );
}
