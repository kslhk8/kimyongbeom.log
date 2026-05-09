const categories = ["All", "JavaScript", "React", "Next.js", "Performance"];

export function Sidebar() {
  return (
    <aside className="w-full lg:w-[220px] lg:shrink-0 lg:self-start">
      <div className="lg:border-r border-default lg:pr-7">
        <div>
          <p className="text-[14px] font-semibold uppercase tracking-[0.24em] text-primary">
            Categories
          </p>
          <ul className="mt-3 space-y-0.5">
            {categories.map((category, index) => (
              <li key={category}>
                <button
                  type="button"
                  className={`flex w-full items-center rounded-lg px-2.5 py-2 text-left text-[14px] transition ${
                    index === 0
                      ? "bg-active text-primary font-semibold"
                      : "text-secondary hover:bg-hover/60 hover:text-secondary"
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
