import DinosaurClassificationFlow from "@/customComponents/flows/dinosaurClassificationFlow";
import GeologicTimeFlow from "@/customComponents/flows/geologicTimeFlow";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="grid place-items-center justify-items-center h-screen">
      <p className="text-2xl">
        Zoom in and out to read the information displayed on the flow.
        <br />
        Use the arrow buttons to navigate through flows.{" "}
      </p>
      <Carousel className="w-full max-w-screen-2xl">
        <CarouselContent>
          <CarouselItem>
            <Card>
              <CardContent>
                <DinosaurClassificationFlow />
              </CardContent>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card>
              <CardContent>
                <GeologicTimeFlow />
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
