"use client";

import { updateImageUser } from "@/services/user";
import { User } from "@/interface/user";

import { CustomAvatar } from "../../avatar/CustomAvatar";
import { Pencil } from "lucide-react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/zustand/store/useUserStore";

interface Props {
  user: User | null;
}
export const UserInfo = ({ user }: Props) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.click();
  };

  const { setImageUrl } = useUserStore();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    await updateImageUser(user?.id ?? "", data.url);
    setImageUrl(data.url);
    router.refresh();
  };
  return (
    <div className="w-full flex flex-col p-10 gap-5">
      <div className="w-full flex flex-col items-center gap-5 bg">
        <div className="relative w-fit">
          <CustomAvatar
            avatarUrl={
              user?.image ?? "https://www.gravatar.com/avatar/?d=mp&s=200"
            }
            className="w-40 h-40"
          />
          <button
            onClick={handleClick}
            className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 p-1 rounded-full shadow-md hover:scale-105 transition "
          >
            <Pencil className="cursor-pointer" size={22} />
          </button>
        </div>
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
        <span className="text-3xl font-mono">{user?.name}</span>
        <div className="w-full max-w-2xl p-4 border rounded-md bg-white/10">
          <div className="text-xs font-mono wrap-break-word flex flex-col gap-4">
            <span>Nombre: {user?.name}</span>
            <span>Correo: {user?.email}</span>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        <div className=" w-full max-w-2xl flex flex-col items-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/profile/edit")}
            size={"xs"}
            className="cursor-pointer"
          >
            Editar Perfil
          </Button>
        </div>
      </div>
    </div>
  );
};
