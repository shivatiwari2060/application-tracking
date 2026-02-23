"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { createJobApplication } from "@/lib/actions/job-applications";

interface CreateJobApplicationDialogProps {
  columnId: string;
  boardId: string;
}

const INITIAL_FORM_DATA = {
  company: "",
  position: "",
  location: "",
  notes: "",
  salary: "",
  jobUrl: "",
  tags: "",
  description: "",
};

export default function CreateJobApplicationDialog({
  columnId,
  boardId,
}: CreateJobApplicationDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(columnId);

    try {
      const result = await createJobApplication({
        ...formData,
        columnId,
        boardId,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
      });

      if (!result.error) {
        setFormData(INITIAL_FORM_DATA);
        setOpen(false);
      } else {
        console.error("failed to create a job.", result.error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          variant="outline"
          className="hover:text-primary w-full mb-4 justify-start text-muted-foreground"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Job
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Job Application</DialogTitle>
          <DialogDescription>Track a new job application.</DialogDescription>
        </DialogHeader>
        <form action="" className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <input
                  type="text"
                  id="company"
                  className="w-full p-3 border"
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  value={formData.company}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <input
                  type="text"
                  id="position"
                  className="w-full p-3 border"
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  value={formData.position}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <input
                  type="text"
                  id="location"
                  className="w-full p-3 border"
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  value={formData.location}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary</Label>
                <input
                  type="number"
                  id="salary"
                  className="w-full p-3 border"
                  placeholder="e.g:$100k-$150k"
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                  value={formData.salary}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobUrl">Job URL</Label>
              <input
                type="url"
                id="jobUrl"
                className="w-full p-3 border"
                placeholder="https://..."
                onChange={(e) =>
                  setFormData({ ...formData, jobUrl: e.target.value })
                }
                value={formData.jobUrl}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags"> Tags (comma-separated)</Label>
              <input
                id="tags"
                className="w-full p-3 border"
                placeholder="React, Tailwind,Hign Pay"
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                value={formData.tags}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description"> Descriptions</Label>
              <Textarea
                id="description"
                rows={3}
                className="w-full p-3 border"
                placeholder="Breif description of the role.."
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                value={formData.description}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes"> Notes</Label>
              <Textarea
                id="notes"
                className="w-full p-3 border"
                rows={4}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                value={formData.notes}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Add Application</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
