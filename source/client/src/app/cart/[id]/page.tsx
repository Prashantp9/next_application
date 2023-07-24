export default function Page() {
  return (
    <div className="h-full w-full p-8 overflow-y-scroll">
      <div className="flex py-7">
        <p className="font-bold  text-2xl text-slate-50">Shopping Cart </p>
      </div>
      <div className="grid w-full grid-cols-4 gap-2 grid-rows-[2000px_minmax(100px,_1fr)]">
        <div className="col-span-4 overflow-y-scroll"></div>
        <div className="flex col-span-4"></div>
      </div>
    </div>
  );
}
