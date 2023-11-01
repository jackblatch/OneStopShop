import Image from "next/image";

export const Logo = () => {
  return (
    <p className="scroll-m-20 text-2xl md:text-3xl font-semibold tracking-tight transition-colors first:mt-0">
      <Image
        src="/logo_.png"
        alt="logo"
        width={200}
        height={100}
        className="object-contain"
      />
    </p>
  );
};
