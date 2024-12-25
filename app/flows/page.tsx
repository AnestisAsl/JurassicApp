import DinosaurClassificationFlow from "@/customComponents/flows/dinosaurClassificationFlow";
import GeologicTimeFlow from "@/customComponents/flows/geologicTimeFlow";

export default function Page() {
  return (
    <div className="grid place-items-center">
      <DinosaurClassificationFlow />
      <GeologicTimeFlow />
    </div>
  );
}
