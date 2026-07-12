export function DeviceMockup() {
  return (
    <div className="relative mx-auto w-[260px]" aria-hidden>
      <div className="aspect-[9/19] overflow-hidden rounded-[2.2rem] border-[10px] border-encre bg-foret-900 shadow-2xl">
        <div className="flex h-full flex-col p-5 text-ivoire">
          <div className="h-2 w-16 rounded-dali-full bg-ivoire/25" />
          <div className="mt-3 font-serif text-3xl">
            1 248 500<span className="ml-1 text-sm text-ivoire/60">FCFA</span>
          </div>
          <div className="mt-6 space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between rounded-dali-md bg-foret-800 px-3 py-2.5">
                <span className="h-2.5 w-20 rounded-dali-full bg-ivoire/20" />
                <span className="h-2.5 w-10 rounded-dali-full bg-ivoire/30" />
              </div>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between rounded-dali-md bg-or-500/15 px-3 py-3">
            <span className="h-2.5 w-14 rounded-dali-full bg-or-300/50" />
            <span className="font-serif text-lg text-or-300">820</span>
          </div>
        </div>
      </div>
    </div>
  );
}
