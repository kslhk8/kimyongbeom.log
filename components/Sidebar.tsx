const categories = ["All", "JavaScript", "React", "Next.js", "Performance"];

export function Sidebar() {
  return (
    <aside className="w-full lg:w-[220px] lg:shrink-0 lg:self-start">
      <div className="lg:border-r lg:border-zinc-200/80 lg:pr-7">
        <div>
          <p className="text-[14px] font-semibold uppercase tracking-[0.24em] text-zinc-950">
            Categories
          </p>
          <ul className="mt-3 space-y-0.5">
            {categories.map((category, index) => (
              <li key={category}>
                <button
                  type="button"
                  className={`flex w-full items-center rounded-lg px-2.5 py-2 text-left text-[14px] transition ${
                    index === 0
                      ? "bg-[#FBEECC] text-zinc-950 font-semibold"
                      : "text-zinc-850 hover:bg-[#FFF3D6]/60 hover:text-zinc-900"
                  }`}
                >
                  <span>{category}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
