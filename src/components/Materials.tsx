import clsx from "clsx";
import { DollarSign, Package, Plus, Trash2 } from "lucide-react";
import { useCallback } from "react";

import { useTasksDispatch } from "@/context/TasksContext";
import { Material } from "@/types";

function AddMaterial({ taskId, hasMaterial }: { taskId: number; hasMaterial: boolean }) {
  const dispatch = useTasksDispatch();

  // Add material
  const handleAddMaterial = () => {
    dispatch({
      type: "added_material",
      payload: {
        taskId: taskId,
      },
    });
  };

  return (
    <div
      className={clsx("flex justify-center gap-4", {
        "mt-4": hasMaterial,
        "mt-0": !hasMaterial,
      })}
    >
      {hasMaterial ? (
        <button
          className="rounded-full border-2 border-yellow-500 bg-yellow-500 p-2 text-xl text-white hover:bg-yellow-400"
          onClick={handleAddMaterial}
        >
          <Plus />
        </button>
      ) : (
        <button
          className="flex items-center gap-2 rounded-full border-2 border-yellow-500 bg-yellow-500 px-4 py-2 text-xl text-white hover:bg-yellow-400"
          onClick={handleAddMaterial}
        >
          <Plus />
          Material
        </button>
      )}
    </div>
  );
}

function MaterialComponent({ taskId, material }: { taskId: number; material: Material }) {
  const dispatch = useTasksDispatch();

  // Update material
  const handleUpdateMaterial = useCallback(
    (updates: { name?: string; price?: number }) => {
      dispatch({
        type: "updated_material",
        payload: {
          taskId: taskId,
          materialId: material.id,
          materialName: updates.name ?? material.name,
          materialPrice: updates.price ?? material.price,
        },
      });
    },
    [dispatch, material, taskId]
  );

  // Remove material
  const handleRemoveMaterial = useCallback(
    (materialId: number) => {
      dispatch({
        type: "removed_material",
        payload: {
          taskId: taskId,
          materialId: materialId,
        },
      });
    },
    [dispatch, taskId]
  );

  return (
    <div className="flex w-full items-center gap-4">
      {/* Material Name Input */}
      <div className="flex flex-1 items-center gap-2">
        <Package />
        <input
          className="w-full rounded-lg border p-2"
          type="text"
          placeholder="Name"
          value={material.name}
          onChange={(e) => handleUpdateMaterial({ name: e.target.value })}
        />
      </div>

      {/* Material Price Input */}
      <div className="flex flex-1 items-center gap-1">
        <DollarSign />
        <input
          className="w-full rounded-lg border p-2"
          type="number"
          min="0"
          placeholder="Price"
          value={material.price}
          onChange={(e) => handleUpdateMaterial({ price: e.target.value })}
        />
      </div>

      {/* Delete Button */}
      <button
        className="flex-shrink-0 rounded-full p-2 hover:bg-slate-200"
        onClick={() => handleRemoveMaterial(material.id)}
      >
        <Trash2 />
      </button>
    </div>
  );
}

function MaterialList({ taskId, materials }: { taskId: number; materials: Material[] }) {
  console.log(`${taskId}`);

  return (
    <div className="flex w-full items-center gap-4">
      <ul className="flex w-full flex-col gap-4">
        {materials.map((material) => (
          <li key={material.id}>
            <MaterialComponent taskId={taskId} material={material} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Materials({
  taskId,
  materials,
}: {
  taskId: number;
  materials: Material[];
}) {
  const hasMaterial = materials.length > 0;

  return (
    <div>
      {hasMaterial && <h2 className="mb-4 text-center text-xl font-bold">Materials</h2>}
      <MaterialList taskId={taskId} materials={materials} />
      <AddMaterial taskId={taskId} hasMaterial={hasMaterial} />
    </div>
  );
}
