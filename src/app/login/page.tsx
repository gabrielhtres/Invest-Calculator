"use client";

import { api } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // evita reload

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Erro ao fazer login:", error.message);
      alert("Erro ao fazer login: " + error.message);
      return;
    }

    if (!data.session) {
      console.error("Usuário não autenticado");
      alert("Usuário não autenticado");
      return;
    }

    console.log("Login bem-sucedido:", data);
    router.replace("/"); // redireciona para a página inicial após login
  };

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="email">E-mail</label>
      <input id="email" name="email" type="email" placeholder="Email" />
      <label htmlFor="password">Senha</label>
      <input
        id="password"
        type="password"
        name="password"
        placeholder="Senha"
      />
      <button type="submit">Entrar</button>
    </form>
  );
}
