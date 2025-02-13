import clsx from "clsx";
import { DollarSign, Pickaxe, Plus, Trash2 } from "lucide-react";
import { useCallback } from "react";

import { useTasksDispatch } from "@/context/TasksContext";
import { Labor } from "@/types";

function AddLabor({ taskId, hasLabor }: { taskId: number; hasLabor: boolean }) {
  const dispatch = useTasksDispatch();

  // Add labor
  const handleAddLabor = () => {
    dispatch({
      type: "added_labor",
      payload: {
        taskId: taskId,
      },
    });
  };

  return (
    <div
      className={clsx("flex justify-center gap-4", {
        "mt-4": hasLabor,
        "mt-0": !hasLabor,
      })}
    >
      {hasLabor ? (
        <button
          className="rounded-full border-2 border-green-500 bg-green-500 p-2 text-xl text-white hover:bg-green-400"
          onClick={handleAddLabor}
        >
          <Plus />
        </button>
      ) : (
        <button
          className="flex items-center gap-2 rounded-full border-2 border-green-500 bg-green-500 px-4 py-2 text-xl text-white hover:bg-green-400"
          onClick={handleAddLabor}
        >
          <Plus />
          Labor
        </button>
      )}
    </div>
  );
}

function LaborComponent({ taskId, labor }: { taskId: number; labor: Labor }) {
  const dispatch = useTasksDispatch();

  // Update labor
  const handleUpdateLabor = useCallback(
    (updates: { duration?: string; price?: number }) => {
      dispatch({
        type: "updated_labor",
        payload: {
          taskId: taskId,
          laborId: labor.id,
          laborDuration: updates.duration ?? labor.duration,
          laborPrice: updates.price ?? labor.price,
        },
      });
    },
    [dispatch, labor, taskId]
  );

  // Remove labor
  const handleRemoveLabor = useCallback(() => {
    dispatch({
      type: "removed_labor",
      payload: {
        taskId: taskId,
        laborId: labor.id,
      },
    });
  }, [dispatch, labor.id, taskId]);

  return (
    <div className="flex w-full items-center gap-4">
      {/* Labor Duration Input */}
      <div className="flex flex-1 items-center gap-2">
        <Pickaxe />
        <input
          className="w-full rounded-lg border p-2"
          type="text"
          placeholder="Duration"
          value={labor.duration ?? ""}
          onChange={(e) => handleUpdateLabor({ duration: e.target.value })}
        />
      </div>

      {/* Labor Price Input */}
      <div className="flex flex-1 items-center gap-1">
        <DollarSign />
        <input
          className="w-full rounded-lg border p-2"
          type="number"
          min="0"
          placeholder="Price"
          value={labor.price ?? 0}
          onChange={(e) => handleUpdateLabor({ price: e.target.value })}
        />
      </div>

      {/* Delete Button */}
      <button
        className="flex-shrink-0 rounded-full p-2 hover:bg-slate-200"
        onClick={handleRemoveLabor}
      >
        <Trash2 />
      </button>
    </div>
  );
}

function LaborList({ taskId, labors }: { taskId: number; labors: Labor[] }) {
  return (
    <div className="flex w-full items-center gap-4">
      <ul className="flex w-full flex-col gap-4">
        {labors.map((labor) => (
          <li key={labor.id}>
            <LaborComponent taskId={taskId} labor={labor} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Labors({ taskId, labors }: { taskId: number; labors: Labor[] }) {
  const hasLabor = labors.length > 0;

  return (
    <div>
      {hasLabor && <h2 className="mb-4 text-center text-xl font-bold">Labors</h2>}
      <LaborList taskId={taskId} labors={labors} />
      <AddLabor taskId={taskId} hasLabor={hasLabor} />
    </div>
  );
}
