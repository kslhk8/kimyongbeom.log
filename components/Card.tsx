type CardProps = {
  title: string;
  description: string;
  date: string;
};

export function Card({ title, description, date }: CardProps) {
  return (
    <article className=" px-1 py-1 transition duration-150 hover:-translate-y-px">
      <div className="space-y-2 px-4 py-4">
        <p className="text-[13px] text-zinc-400">{date}</p>
        <h2 className="text-[18px] font-semibold tracking-tight text-zinc-950">{title}</h2>
        <p
          className="max-w-3xl text-[15px] leading-6 text-zinc-600"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </p>
      </div>
    </article>
  );
}
