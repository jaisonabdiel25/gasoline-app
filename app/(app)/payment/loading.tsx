import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "@/modules/components/skeleton/CardSkeleton";

const loading = () => {
  return (
    <div className="w-full flex flex-col items-center p-8 gap-8">
      <div className="w-full flex justify-end gap-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-32" />
      </div>
      <div className="w-full flex justify-center flex-wrap gap-10">
        <CardSkeleton className="w-42 2xl:w-52 h-24 2xl:h-32" />
        <CardSkeleton className="w-42 2xl:w-52 h-24 2xl:h-32" />
        <CardSkeleton className="w-42 2xl:w-52 h-24 2xl:h-32" />
        <CardSkeleton className="w-42 2xl:w-52 h-24 2xl:h-32" />
      </div>
      <div className="flex w-full max-w-2xl flex-col gap-2 mt-8">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="flex gap-4" key={index}>
            <Skeleton className="h-6 w-96" />
            <Skeleton className="h-6 w-96" />
            <Skeleton className="h-6 w-96" />
            <Skeleton className="h-6 w-8" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default loading;
