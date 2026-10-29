"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/auth-context";

type Props = Pick<React.ComponentProps<typeof Button>, "variant" | "size" | "className"> & { courseId: number };

export function EnrollButton({ courseId, variant = "default", size = "sm", className }: Props) {
  const { enroll, enrolledIds } = useAuth();
  const [pending, setPending] = useState(false);

  if (enrolledIds.has(courseId)) {
    return (
      <Button variant="secondary" size={size} className={className} disabled>
        <Check />
        Inscrito
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      disabled={pending}
      onClick={async () => {
        setPending(true);
        try {
          await enroll(courseId);
        } finally {
          setPending(false);
        }
      }}
    >
      {pending && <Loader2 className="animate-spin" />}
      Inscribirme
    </Button>
  );
}
