"use client";
import { useState } from "react";
import { Board, Column } from "../models/models.types";

export function useBoard(initialBoard?: Board | null) {
  const [board, setBoard] = useState<Board | null>(initialBoard || null);
  const [columns, setColumns] = useState<Column[]>(initialBoard?.column || []);
  const [error, setError] = useState<string | null>(null);
  async function moveJobs(
    jobApplicationId: string,
    newColumnId: string,
    newOrder: number
  ) {}

  return { board, columns, error,moveJobs };
}
