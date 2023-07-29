export default function CartCard() {
  return (
    <>
      <div className="h-auto w-full py-5 px-2 bg-gray-900 rounded-md flex relative">
        <div className="h-[7rem] w-[6rem] min-w-[6rem]">
          <img
            className="w-full h-full object-cover rounded-md"
            src="https://images.unsplash.com/photo-1582666251140-ea98398b1afd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
        </div>
        <div className="px-2 flex justify-between gap-11 mx-1 w-full">
          <div className="h-[7rem] flex flex-col justify-between">
            <div className="flex h-full flex-col gap-2">
              <p className="text-sm font-semibold text-slate-200">
                Playstation 4 controller
              </p>
              <p className="text-sm font-bold">$ 40</p>
            </div>
            <div className="text-xs font-semibold text-green-600">In Stock</div>
          </div>
          <div className="w-[6rem] grid grid-cols-3 items-center h-9 mt-1">
            <button className="h-full text-slate-100 w-full bg-slate-800 rounded-tl-md rounded-bl-md">
              +
            </button>
            <p className="h-full w-full text-xs flex whitespace-nowrap justify-center items-center font-bold">
              1
            </p>
            <button className="h-full w-full  text-slate-100 bg-slate-800 rounded-tr-md rounded-br-md">
              -
            </button>
          </div>
        </div>
        <div className=" cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="cancel"
            width="20"
            height={20}
          >
            <path
              fill="#E2E8F0"
              d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
}
