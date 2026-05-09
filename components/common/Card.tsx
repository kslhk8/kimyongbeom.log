type CardProps = {
  title: string;
  description: string;
  date: string;
};

export function Card({ title, description, date }: CardProps) {
  return (
    <article className=" px-1 py-1 transition duration-150 hover:-translate-y-px border-b border-default">
      <div className="space-y-2 px-4 py-4">
        <p className="text-[13px] text-subtle">{date}</p>
        <h2 className="text-[18px] font-semibold tracking-tight text-primary">{title}</h2>
        <p className="max-w-3xl text-[15px] leading-6 text-muted line-clamp-2">
          {description}
        </p>
      </div>
    </article>
  );
}
