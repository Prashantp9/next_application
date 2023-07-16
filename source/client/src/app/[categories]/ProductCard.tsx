interface Props {
  elm: any;
  idx: number;
}
export default function ProductCard({ elm, idx }: Props) {
  return (
    <>
      <div className="flex flex-col p-2 bg-stone-900 rounded-md cursor-pointer w-72 max-h-80">
        <div className="w-full h-52 mb-3">
          <img
            className="object-cover h-full w-full rounded-md"
            src={elm?.image}
            alt=""
          />
        </div>
        <p className="text-gray-200 text-sm font-semibold">
          {elm?.title?.slice(0, 15) + "..."}
        </p>
        <div className="h-16">
          <p className="text-secondary-700 text-xs">
            {elm?.description?.slice(0, 100)}
          </p>
        </div>
        <div className="flex justify-between w-full h-10 align-center">
          <p className="text-gray-200 text-base font-semibold align-center">
            {"$" + elm?.price}
          </p>
          <div className="flex gap-2">
            <button className="text-xs font-semibold">
              <svg
                className="w-7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 3H4.5L6.5 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM6.07142 14H18L21 5H4.78571M11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19C7 17.8954 7.89543 17 9 17C10.1046 17 11 17.8954 11 19Z"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button className="text-xs font-semibold"></button>
          </div>
        </div>
      </div>
    </>
  );
}
