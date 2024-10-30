import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Group, Trash2, Edit, Plus } from "lucide-react";
import { ActionButtonsProps } from "@/app/dashboard/types";

export function ActionButtons({
                                onGroupClick,
                                onDeleteClick,
                                onEditClick,
                                onAddClick,
                              }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        className="h-8"
        size="sm"
        variant="outline"
        onClick={onGroupClick}
      >
        <Group className="h-4 w-4 mr-2" />
        Group
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-8" size="sm" variant="ghost">
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onEditClick}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDeleteClick}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onAddClick}>
            <Plus className="h-4 w-4 mr-2" />
            Add
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}