"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiError, errorMessage } from "@/lib/api";
import { useAuth, type AuthMode } from "./auth-context";
import { loginSchema, registerSchema, type LoginValues, type RegisterValues } from "./schemas";

const DEMO_ACCOUNTS = [
  { label: "Probar como administrador", email: "admin@demo.com", password: "Admin123!" },
  { label: "Probar como usuario", email: "user@demo.com", password: "User123!" },
];

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-sm font-medium text-destructive">
      {message}
    </p>
  );
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema), defaultValues: { email: "", password: "" } });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await login(values);
      onSuccess();
    } catch (error) {
      const message =
        error instanceof ApiError && error.status === 401
          ? "El correo o la contraseña no coinciden."
          : errorMessage(error);
      setError("root", { message });
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="login-email">Correo</Label>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby="login-email-error"
          {...register("email")}
        />
        <FieldError id="login-email-error" message={errors.email?.message} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="login-password">Contraseña</Label>
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          aria-invalid={!!errors.password}
          aria-describedby="login-password-error"
          {...register("password")}
        />
        <FieldError id="login-password-error" message={errors.password?.message} />
      </div>
      <FieldError id="login-root-error" message={errors.root?.message} />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="animate-spin" />}
        Iniciar sesión
      </Button>
      <div className="grid gap-2 border-t border-border pt-4">
        <p className="text-sm text-muted-foreground">Cuentas de ejemplo para evaluar la plataforma:</p>
        <div className="flex flex-wrap gap-2">
          {DEMO_ACCOUNTS.map((account) => (
            <Button
              key={account.email}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setValue("email", account.email, { shouldValidate: true });
                setValue("password", account.password, { shouldValidate: true });
              }}
            >
              {account.label}
            </Button>
          ))}
        </div>
      </div>
    </form>
  );
}

function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const { register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await registerUser(values);
      onSuccess();
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        setError("email", { message: "Este correo ya tiene una cuenta. Inicia sesión." });
      } else if (error instanceof ApiError && error.status === 400 && error.details?.length) {
        for (const detail of error.details) {
          if (detail.field === "name" || detail.field === "email" || detail.field === "password") {
            setError(detail.field, { message: detail.message });
          }
        }
      } else {
        setError("root", { message: errorMessage(error) });
      }
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="register-name">Nombre</Label>
        <Input
          id="register-name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby="register-name-error"
          {...register("name")}
        />
        <FieldError id="register-name-error" message={errors.name?.message} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-email">Correo</Label>
        <Input
          id="register-email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby="register-email-error"
          {...register("email")}
        />
        <FieldError id="register-email-error" message={errors.email?.message} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-password">Contraseña</Label>
        <Input
          id="register-password"
          type="password"
          autoComplete="new-password"
          aria-invalid={!!errors.password}
          aria-describedby="register-password-hint register-password-error"
          {...register("password")}
        />
        <p id="register-password-hint" className="text-sm text-muted-foreground">
          Mínimo 8 caracteres.
        </p>
        <FieldError id="register-password-error" message={errors.password?.message} />
      </div>
      <FieldError id="register-root-error" message={errors.root?.message} />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="animate-spin" />}
        Crear cuenta
      </Button>
    </form>
  );
}

export function AuthDialog() {
  const { authDialog, setAuthOpen, setAuthMode } = useAuth();
  const close = () => setAuthOpen(false);

  return (
    <Dialog open={authDialog.open} onOpenChange={setAuthOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{authDialog.mode === "login" ? "Inicia sesión" : "Crea tu cuenta"}</DialogTitle>
          <DialogDescription>Inscríbete a los cursos y consulta los que ya elegiste.</DialogDescription>
        </DialogHeader>
        <Tabs value={authDialog.mode} onValueChange={(mode) => setAuthMode(mode as AuthMode)}>
          <TabsList>
            <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
            <TabsTrigger value="register">Crear cuenta</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm onSuccess={close} />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm onSuccess={close} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
