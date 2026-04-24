export function SectionHeading({
  number,
  title,
  label,
}: {
  number: string;
  title: string;
  label?: string;
}) {
  return (
    <div className="mb-12 space-y-5">
      <div className="flex items-center gap-4">
        <span className="label text-white/46">{number}</span>
        <span className="h-px flex-1 bg-white/10" />
        <span className="label text-white/46">{label ?? title}</span>
      </div>
      <h2 className="max-w-3xl text-[40px] font-semibold leading-[0.95] tracking-[-0.07em] text-fg md:text-[64px]">
        {title}
      </h2>
    </div>
  );
}
