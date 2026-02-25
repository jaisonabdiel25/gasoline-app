import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex w-full max-w-2xl 2xl:max-w-6xl flex-col gap-2 mt-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="flex gap-4" key={index}>
            <Skeleton className="h-6 w-96" />
            <Skeleton className="h-6 w-96" />
            <Skeleton className="h-6 w-96" />
            <Skeleton className="h-6 w-12" />
          </div>
        ))}
              <div className="w-full flex justify-end mt-6">
         <Skeleton className="h-6 w-60" />
      </div>
      </div>

    </div>
  );
};

export default loading;
