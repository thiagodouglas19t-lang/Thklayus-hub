import BuyCourseButton from "./BuyCourseButton";
import LockedCoursePreview from "./LockedCoursePreview";

type LockedCourseActionsProps = {
  title: string;
  price: string;
};

export default function LockedCourseActions({ title, price }: LockedCourseActionsProps) {
  return (
    <div className="mt-4 space-y-3">
      <LockedCoursePreview title={title} price={price} />
      <BuyCourseButton courseTitle={title} price={price} />
    </div>
  );
}
