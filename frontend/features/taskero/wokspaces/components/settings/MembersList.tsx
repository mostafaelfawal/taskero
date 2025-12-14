import MemberItem from "./MemberItem";
import { TeamMemberType } from "../../types/TeamMemberType";

export default function MembersList({
  data,
  isLoading,
  isError,
  popoverOpen,
  togglePopover,
  popoverRef,
  isLast,
  handleDelete,
  handleUpdate,
}: {
  data: TeamMemberType[];
  isLoading: boolean;
  isError: boolean;
  popoverOpen: number | null;
  togglePopover: (i: number) => void;
  popoverRef: any;
  isLast: (i: number) => boolean;
  handleDelete: (id: string) => void;
  handleUpdate: (memberId: string, newRole: string) => void;
}) {
  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg divide-y divide-gray-300 dark:divide-gray-700">
      {isError && <p className="p-2 text-red-500">Failed to load members.</p>}
      {isLoading ? (
        <p className="p-2 animate-pulse">loading members...</p>
      ) : (
        data.map((member, idx) => (
          <MemberItem
            key={member._id}
            member={member}
            idx={idx}
            popoverOpen={popoverOpen}
            togglePopover={togglePopover}
            popoverRef={popoverRef}
            isLast={isLast}
            handleDelete={handleDelete}
            handleUpdate={(memberId: string, newRole: string) =>
              handleUpdate(memberId, newRole)
            }
          />
        ))
      )}
    </div>
  );
}
