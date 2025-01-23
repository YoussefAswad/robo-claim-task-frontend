import { Card, CardContent, Skeleton } from "@mui/material";

export function FileCardSkeleton() {
  return (
    <Card>
      <CardContent>
        <div className="flex gap-2 items-center">
          <Skeleton variant="circular" width={35} height={35} />
          <Skeleton variant="text" width={300} height={35} />
        </div>
        <Skeleton variant="text" width={200} />

        <Skeleton variant="text" width={"100%"} height={40} />
        <div className="flex justify-between">
          <Skeleton variant="text" width={200} />
          <Skeleton variant="text" width={200} />
        </div>
      </CardContent>
    </Card>
  );
}
