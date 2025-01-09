export function SkeletonLoader() {
  return (
    <div className="mx-auto max-w-[90%] space-y-7 my-6">
      <div className="mb-6 bg-white px-3.5 py-3 rounded-lg animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-6 w-24 bg-gray-200 rounded"></div>
          <div className="h-6 w-20 bg-gray-200 rounded"></div>
        </div>
        <hr className="mt-3" />
        <div className="mt-4">
          <div className="flex justify-between mb-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-4 w-16 bg-gray-200 rounded"></div>
            ))}
          </div>
          {[...Array(5)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-between items-center mb-4"
            >
              {[...Array(6)].map((_, cellIndex) => (
                <div
                  key={cellIndex}
                  className={`h-4 bg-gray-200 rounded ${
                    cellIndex === 0 ? "w-24" : "w-16"
                  } ${cellIndex === 4 ? "hidden lg:block" : ""} ${
                    cellIndex === 5 ? "hidden md:block" : ""
                  }`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
