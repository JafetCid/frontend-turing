"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster(props: ToasterProps) {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "!border !border-border !bg-white !text-navy !font-sans",
          description: "!text-navy/75",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
