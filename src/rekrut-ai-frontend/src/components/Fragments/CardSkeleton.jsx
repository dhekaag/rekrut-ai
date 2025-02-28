import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const CardSkeleton = ({ size = "medium" }) => {
  const getHeight = () => {
    switch (size) {
      case "small":
        return "h-64";
      case "large":
        return "h-96";
      default:
        return "h-80";
    }
  };

  return (
    <Card className={`w-full ${getHeight()} overflow-hidden`}>
      <Skeleton className="w-full h-3/4" />
      <CardContent className="p-4">
        <Skeleton className="h-4 w-2/3 mb-2" />
        <Skeleton className="h-3 w-1/2" />
      </CardContent>
    </Card>
  );
};
