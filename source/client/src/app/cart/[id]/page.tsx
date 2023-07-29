import CartCard from "./Cartcard";

export default function Page() {
  return (
    <div className="flex justify-center items-center">
      <div className="h-full w-full p-2 overflow-y-scroll xl:max-w-[95%]">
        <div className="flex py-3">
          <p className="font-bold  text-xl text-slate-100">Shopping Cart </p>
        </div>
        <div className="grid w-full grid-cols-5 gap-2">
          <div className="col-span-5 md:col-span-3 overflow-y-scroll flex flex-col h-[50vh] md:h-[83vh] gap-2 p-2 border-b-[1px] border-slate-300 pb-3">
            {[...Array(5)].map(() => (
              <CartCard />
            ))}
          </div>
          <div className="flex flex-col col-span-5 md:col-span-2">
            <p className="text-xl font-bold text-slate-200">Order summary</p>
            <div className="flex flex-col px-2 gap-4 py-2">
              <p className="w-full text-slate-300 flex border-b-[0.5px] border-slate-500 text-sm justify-between items-end pb-1">
                Subtotal <span>$99.00</span>
              </p>
              <p className="w-full text-slate-300 flex border-b-[0.5px] border-slate-500 text-sm justify-between items-end pb-1">
                Shipping estimate <span>$5.00</span>
              </p>
              <p className="w-full text-slate-300 flex border-b-[0.5px] border-slate-500 text-sm justify-between items-end pb-1">
                Tax estimate <span>$8.32</span>
              </p>
            </div>
            <button className="w-full mt-6 text-base font-bold text-slate-100 bg-blue-600 rounded-md flex justify-center items-center py-4">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// grid-rows-[2000px_minmax(100px,_1fr)
