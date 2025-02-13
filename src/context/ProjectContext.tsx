"use client";

import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { Project, ProjectAction } from "@/types";

// TEST DATA - REMOVE IT IN PRODUCTION
const INITIAL_PROJECT: Project = {
  id: uuidv4(),
  name: "",
  tasks: [
    {
      id: uuidv4(),
      name: "Flooring",
      materials: [
        { id: uuidv4(), name: "Hardwood Planks", price: 3200 },
        { id: uuidv4(), name: "Adhesive", price: 150 },
        { id: uuidv4(), name: "Underlayment", price: 250 },
      ],
      labors: [
        { id: uuidv4(), name: "Installation (3 days)", price: 1200 },
        { id: uuidv4(), name: "Finishing & Cleanup", price: 350 },
      ],
      additional: [
        { id: uuidv4(), name: "Permit Fee", price: 100 },
        { id: uuidv4(), name: "Inspection", price: 75 },
      ],
    },
    {
      id: uuidv4(),
      name: "Painting",
      materials: [
        { id: uuidv4(), name: "Interior Paint (5 gallons)", price: 250 },
        { id: uuidv4(), name: "Paint Rollers & Brushes", price: 40 },
        { id: uuidv4(), name: "Painter's Tape", price: 25 },
      ],
      labors: [
        { id: uuidv4(), name: "Wall Prep & Priming (1 day)", price: 500 },
        { id: uuidv4(), name: "Painting (2 days)", price: 750 },
      ],
      additional: [{ id: uuidv4(), name: "Permit Fee", price: 60 }],
    },
    {
      id: uuidv4(),
      name: "Tile Installation",
      materials: [
        { id: uuidv4(), name: "Ceramic Tiles (200 sq ft)", price: 1800 },
        { id: uuidv4(), name: "Tile Adhesive & Grout", price: 300 },
        { id: uuidv4(), name: "Spacers & Tools", price: 100 },
      ],
      labors: [
        { id: uuidv4(), name: "Tile Cutting & Layout (1 day)", price: 400 },
        { id: uuidv4(), name: "Installation & Grouting (2 days)", price: 1000 },
      ],
      additional: [],
    },
  ],
  profitPercentage: 0,
};

// const INITIAL_PROJECT: Project = {
//   id: uuidv4(),
//   name: "",
//   tasks: [],
//   profitPercentage: 0,
// };

// Create Contexts
export const ProjectContext = createContext<Project[] | null>(null);
export const ProjectDispatchContext = createContext<React.Dispatch<TaskAction> | null>(null);

// Create Provider
export function ProjectProvider({ children }: { children: ReactNode }) {
  // Load from sessionStorage
  const getSessionData = () => {
    if (typeof window !== "undefined") {
      const storedTasks = sessionStorage.getItem("project");
      return storedTasks ? JSON.parse(storedTasks) : INITIAL_PROJECT;
    }
    return INITIAL_PROJECT;
  };

  const [project, dispatch] = useReducer(projectReducer, INITIAL_PROJECT, getSessionData);

  useEffect(() => {
    sessionStorage.setItem("project", JSON.stringify(project));
  }, [project]);

  return (
    <ProjectContext.Provider value={project}>
      <ProjectDispatchContext.Provider value={dispatch}>{children}</ProjectDispatchContext.Provider>
    </ProjectContext.Provider>
  );
}

// Custom Hook - Read project
export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}

// Custom Hook - Dispatch project
export function useProjectDispatch() {
  const context = useContext(ProjectDispatchContext);
  if (!context) {
    throw new Error("useProjectDispatch must be used within a ProjectProvider");
  }
  return context;
}

// Reducer function
function projectReducer(project: Project, action: ProjectAction) {
  switch (action.type) {
    case "updated_project_name":
      return { ...project, name: action.payload.projectName };

    case "updated_profit":
      return { ...project, name: action.payload.profitPercentage };

    case "updated_tasks":
      return { ...project, tasks: action.payload.tasks };

    default:
      return project;
  }
}
