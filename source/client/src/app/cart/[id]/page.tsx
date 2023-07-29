import CartCard from "./Cartcard";

export default function Page() {
  return (
    <div className="h-full w-full p-2 overflow-y-scroll">
      <div className="flex py-7">
        <p className="font-bold  text-xl text-slate-100">Shopping Cart </p>
      </div>
      <div className="grid w-full grid-cols-4 gap-2">
        <div className="col-span-4 overflow-y-scroll flex flex-col h-[50vh] gap-2 p-2 border-b-[1px] border-slate-300 pb-3">
          {[...Array(5)].map(() => (
            <CartCard />
          ))}
        </div>
        <div className="flex col-span-4"></div>
      </div>
    </div>
  );
}
// grid-rows-[2000px_minmax(100px,_1fr)
